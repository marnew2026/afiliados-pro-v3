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
 
  let wallet = await Wallet.findOne({
  userEmail,
});

if (!wallet) {
  wallet = await Wallet.create({
    userEmail,
    availableBalance: 0,
    lockedBalance: 0,
    totalEarned: 0,
    withdrawLocked: false,
  });

  console.log(
    "WALLET CRIADA:",
    userEmail
  );
}

  // 🔒 limite antifraude básico
  if (amount > 1000) {
    throw new Error("Limite diário excedido");
  }

  // 🔒 regras antifraude
  checkFraudRules(wallet, amount);

  // 🔒 bloqueio de concorrência
  if (wallet.withdrawLocked) {
    throw new Error("Já existe saque em processamento");
  }

  // 💰 saldo real via ledger
  const balance = await getBalance(userEmail);

console.log("================================");
console.log("USER:", userEmail);
console.log("LEDGER BALANCE:", balance);
console.log("WALLET BALANCE:", wallet.availableBalance);
console.log("LOCKED BALANCE:", wallet.lockedBalance);
console.log("SAQUE SOLICITADO:", amount);
console.log("================================");
console.log("SAQUE SOLICITADO:", amount);
console.log("SALDO LEDGER:", balance);
console.log(
  "SALDO WALLET:",
  wallet.availableBalance
);

if (balance < amount) {
  throw new Error("Saldo insuficiente");
}

  try {
    // 🔒 trava atômica da carteira (CORRIGIDO)
    const updatedWallet = await Wallet.findOneAndUpdate(
      {
        userEmail,
        withdrawLocked: false,
        availableBalance: { $gte: amount },
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
      throw new Error("Saldo insuficiente ou saque em processamento");
    }

    // 🧾 cria saque
    const withdraw = await Withdraw.create({
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

    // 🧱 ledger (reserva financeira)
    await addDebit({
      userEmail,
      amount,
      referenceId: withdraw._id.toString(),
      source: "withdraw",
      description: "Reserva de saque PIX",
    });

    // ❌ IMPORTANTE:
    // NÃO liberar lock aqui mais (isso causava race condition)

    return withdraw;

  } catch (err) {
    // 🚨 rollback seguro

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