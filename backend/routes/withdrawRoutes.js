import express from "express";
import { safeCreateLedger } from "../src/services/safeCreateLedger.js";
import { rebuildWallet } from "../src/services/rebuildWallet.js";
import User from "../models/User.js";
import Withdraw from "../models/Withdraw.js";

import { lockWallet } from "../src/lib/walletLock.js";
const router = express.Router();
router.post("/create", async (req, res) => {
   console.log("BODY RECEBIDO:", req.body);
  console.log("BODY SAQUE:", req.body);
  try {

 const {
  userId,
  amount: rawAmount,
  pixKey,
  withdrawId,
} = req.body;

const value = Number(rawAmount);

if (!withdrawId) {
    return res.status(400).json({
        error: "withdrawId obrigatório.",
    });
}
if (!userId) {
  return res.status(400).json({
    error: "userId obrigatório.",
  });
}



if (Number.isNaN(value) || value <= 0) {
  return res.status(400).json({
    error: "Valor inválido.",
  });
}

if (!pixKey || !String(pixKey).trim()) {
  return res.status(400).json({
    error: "PIX obrigatório.",
  });
}
const user = await User.findById(userId);

if (!user) {
  return res.status(404).json({
    error: "Usuário não encontrado",
  });
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

   const BLOCKED_STATUS = [
    "pending",
    "processing",
    "sent",
    "created",
    "waiting",
];

const existing = await Withdraw.findOne({
    userId,
    status: { $in: BLOCKED_STATUS },
}).session(session);

if (existing) {
    throw new Error("Já existe um saque em processamento.");
}
console.log("WALLET BEFORE:", {
  availableBalance: wallet.availableBalance,
  lockedBalance: wallet.lockedBalance,
});

console.log("WITHDRAW VALUE:", value);
    if (Number(wallet?.availableBalance || 0) < value) {
    throw new Error("Saldo insuficiente");
}

    const [newWithdraw] = await Withdraw.create(
        [{
            userId,
          amount: value,
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
             amount: value,
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