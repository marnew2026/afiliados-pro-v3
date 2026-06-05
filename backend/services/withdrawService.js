import Wallet from "../models/Wallet.js";
import Withdraw from "../models/Withdraw.js";

import { getBalance } from "./balanceService.js";
import { addDebit } from "./ledgerService.js";
import { checkFraudRules } from "./fraudService.js";

export async function requestWithdraw({
  userEmail,
  amount,
  pixKey,
}) {
  const wallet = await Wallet.findOne({
    userEmail,
  });

  if (!wallet) {
    throw new Error("Wallet não encontrada");
  }

  // 🔒 Limite básico antifraude
  if (amount > 1000) {
    throw new Error(
      "Limite diário excedido"
    );
  }

  // 🔒 Regras antifraude
  checkFraudRules(wallet, amount);

  // 🔒 Bloqueio de saque simultâneo
  if (wallet.withdrawLocked) {
    throw new Error(
      "Já existe saque em processamento"
    );
  }

  // 💰 Saldo real pelo Ledger
  const balance = await getBalance(
    userEmail
  );

  if (balance < amount) {
    throw new Error(
      "Saldo insuficiente"
    );
  }

  try {
    // 🔒 Reserva atômica
    const updatedWallet =
      await Wallet.findOneAndUpdate(
        {
          userEmail,
          availableBalance: {
            $gte: amount,
          },
          withdrawLocked: false,
        },
        {
          $inc: {
            availableBalance: -amount,
            lockedBalance: amount,
          },
          $set: {
            withdrawLocked: true,
            lastWithdrawAt: new Date(),
          },
        },
        { new: true }
      );

    if (!updatedWallet) {
      throw new Error(
        "Saldo insuficiente ou saque em processamento"
      );
    }

    // 🧾 Cria saque para fila PIX
    const withdraw =
      await Withdraw.create({
        userEmail,
        amount,
        pixKey,
        status: "queued",
      });
      console.log(
  "SAQUE CRIADO:",
  withdraw._id.toString(),
  withdraw.amount
);

    // 🧱 Ledger (reserva financeira)
    await addDebit({
      userEmail,
      amount,
      referenceId:
        withdraw._id.toString(),
      source: "withdraw",
      description:
        "Reserva de saque PIX",
    });

    // 🔓 Libera lock
    await Wallet.findOneAndUpdate(
      { userEmail },
      {
        $set: {
          withdrawLocked: false,
        },
      }
    );

    return withdraw;

  } catch (err) {
    // 🚨 Segurança: nunca deixar lock preso
   await Wallet.findOneAndUpdate(
  { userEmail },
  {
    $inc: {
      availableBalance: amount,
      lockedBalance: -amount,
    },
    $set: {
      withdrawLocked: false,
    },
  }
);


    throw err;
  }
}