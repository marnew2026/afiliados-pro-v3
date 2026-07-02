import express from "express";
import { safeCreateLedger } from "../src/services/safeCreateLedger.js";
import { rebuildWallet } from "../src/services/rebuildWallet.js";

import Withdraw from "../models/Withdraw.js";

import { lockWallet } from "../src/lib/walletLock.js";
const router = express.Router();

router.post("/create", async (req, res) => {
    console.log("🔥 ENTROU NA ROTA /withdraw/create");
    console.log("1 - antes do withLock");
  try {

    const { userId, amount, pixKey, withdrawId } = req.body;

if (!pixKey) {
  throw new Error("PIX obrigatório");
}

if (!withdrawId) {
  throw new Error("withdrawId obrigatório");
}

if (Number(amount) <= 0) {
  throw new Error("Valor inválido");
}

const existingWithdraw = await Withdraw.findOne({
  withdrawId,
});

if (existingWithdraw) {
  return res.json({
    success: true,
    withdraw: existingWithdraw,
    duplicated: true,
  });
}
   const result = await lockWallet(userId, async (wallet, session) => {

    const existing = await Withdraw.findOne({
        userId,
        status: {
            $in: ["pending", "processing", "sent"],
        },
    }).session(session);

    if (existing) {
        throw new Error("Já existe um saque em andamento.");
    }

    if (Number(wallet.availableBalance) < Number(amount)) {
        throw new Error("Saldo insuficiente");
    }

    const [newWithdraw] = await Withdraw.create(
        [{
            userId,
            amount,
            pixKey,
            withdrawId,
            referenceId: withdrawId,
            status: "pending",
        }],
        { session }
    );

    const ledger = await safeCreateLedger(
        {
            userId,
            type: "debit",
            amount,
            status: "pending",
            referenceId: withdrawId,
            source: "withdraw",
        },
        session
    );

    await rebuildWallet(userId, session);

    return {
        success: true,
        withdraw: newWithdraw,
        ledger,
    };
});

return res.json(result);


   

   } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      const withdraw = await Withdraw.findOne({
        withdrawId: req.body.withdrawId,
      });

      return res.json({
        success: true,
        withdraw,
        duplicated: true,
      });
    }

    return res.status(400).json({
      error: err.message,
    });
  }
});

export default router;