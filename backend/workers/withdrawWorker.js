import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import Withdraw from "../models/Withdraw.js";
import Wallet from "../models/Wallet.js";
import { sendPixToAsaas } from "../services/asaasService.js";

export const withdrawWorker = new Worker(
  "withdraw",
  async (job) => {
    const { withdrawId } = job.data;

    const withdraw = await Withdraw.findById(withdrawId);

    if (!withdraw) return;

    if (withdraw.status !== "processing") return;

    try {
      const response = await sendPixToAsaas({
        value: withdraw.amount,
        pixKey: withdraw.pixKey,
        pixKeyType: "EMAIL",
        externalId: withdraw.externalId,
      });

      withdraw.asaasTransferId = response.id;
      withdraw.status = "sent";
    withdraw.sentAt = new Date();
      await withdraw.save();

      return response;

    } catch (err) {

      withdraw.status = "failed";
      withdraw.errorMessage = err.message;

      await withdraw.save();

      const wallet = await Wallet.findOne({
        userId: withdraw.userId,
      });

      if (wallet) {
        wallet.availableBalance += withdraw.amount;

        wallet.lockedBalance = Math.max(
          0,
          Number(wallet.lockedBalance || 0) - withdraw.amount
        );

        await wallet.save();
      }

      throw err;
    }
  },
  {
    connection: redis,
  }
);