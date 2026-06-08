import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import Sale from "../models/Sale.js";
import User from "../models/User.js";

export const worker = new Worker(
  "stripe-events",
  async (job) => {
    const event = job.data;

    if (event.type !== "checkout.session.completed") return;

    const session = event.data.object;

    const affiliateId = session.metadata?.affiliateId;
    const offerId = session.metadata?.offerId;
    const commissionPercent = Number(session.metadata?.commission || 0);

    const amount = (session.amount_total || 0) / 100;
    const commission = (amount * commissionPercent) / 100;

    // 🔥 ANTI DUPLICAÇÃO REAL
    const exists = await Sale.findOne({
      stripeSessionId: session.id,
    });

    if (exists) return;

    await Sale.create({
      productId: offerId,
      affiliateId,
      amount,
      commission,
      stripeSessionId: session.id,
      status: "paid",
    });

    if (affiliateId) {
      await User.findOneAndUpdate(
        { affiliateCode: affiliateId },
        { $inc: { pendingBalance: commission } }
      );
    }

    console.log("🔥 SALE PROCESSADA");
  },
  {
    connection: redis,
    concurrency: 5,
  }
);