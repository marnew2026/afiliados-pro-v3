import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import Withdraw from "../models/Withdraw.js";
import Wallet from "../models/Wallet.js";
import Ledger from "../models/Ledger.js";

import { redis } from "../config/redis.js";

/**
 * WITHDRAW WORKER - SAAS SAFE
 */
export const withdrawWorker = new Worker(
  "withdraws",
  async (job) => {
    try {
     const { userId, amount, withdrawId } = job.data;

  if (!userId || !amount) {
    console.log("❌ WITHDRAW INVÁLIDO");
    return;
  }

  const withdraw = await Withdraw.findById(withdrawId);

  if (!withdraw) {
    console.log("❌ WITHDRAW NÃO ENCONTRADO");
    return;
  }

  if (withdraw.status === "paid") {
    console.log("⚠️ WITHDRAW JÁ PROCESSADO:", withdrawId);
    return;
  }

  withdraw.status = "paid";
  await withdraw.save();

  await Ledger.updateOne(
    {
      referenceId: withdrawId,
      source: "withdraw",
    },
    {
      $set: {
        status: "confirmed",
      },
    }
  );

  await rebuildWallet(userId);

  console.log("💸 WITHDRAW PROCESSADO:", {
    userId,
    amount,
  });

} catch (error) {
  console.error("❌ ERRO WITHDRAW WORKER:", error);
}

},
{
connection: redis,
concurrency: 5,
}
);