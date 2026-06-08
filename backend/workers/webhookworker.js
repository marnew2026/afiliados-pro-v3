import { Worker } from "bullmq";
import Sale from "../models/Sale.js";
import WalletTransaction from "../models/WalletTransaction.js";
import User from "../models/User.js";
import AuditLog from "../models/AuditLog.js";
import { redis } from "../config/redis.js";
import Wallet from "../models/Wallet.js";
// 🔥 WORKER PRINCIPAL
export const worker = new Worker(
  "stripe-events",
  async (job) => {
    const event = job.data.body;

    // 🔒 ignora eventos irrelevantes
    if (event.type !== "checkout.session.completed") return;

    const session = event.data.object;

    const affiliateId = session.metadata?.affiliateId || null;
    const offerId = session.metadata?.offerId || null;
    const commissionPercent = Number(session.metadata?.commission || 0);

    const amount = (session.amount_total || 0) / 100;
    const commission = (amount * commissionPercent) / 100;

    // 🔐 IDEMPOTÊNCIA FORTE
    const exists = await Sale.findOne({
      stripeSessionId: session.id,
    });

    if (exists) {
      console.log("⚠️ DUPLICADO IGNORADO:", session.id);
      return;
    }

    // 💰 CRIA VENDA
    const sale = await Sale.create({
      productId: offerId,
      affiliateId,
      amount,
      commission,
      stripeSessionId: session.id,
      status: paid,
    });

    // 💳 COMISSÃO
    if (affiliateId && commission > 0) {
      const walletExists = await WalletTransaction.findOne({
        saleId: sale._id,
        type: "commission",
      });

      if (!walletExists) {
        await WalletTransaction.create({
          userId: affiliateId,
          type: "commission",
          amount: commission,
          status: "pending",
          saleId: sale._id,
        });

        // 🔒 ATUALIZAÇÃO SEGURA
        await User.findOneAndUpdate(
          { _id: affiliateId },
          {
            $inc: { pendingBalance: commission },
          }
        );
      }
    }
const affiliateUser = await User.findById(
  affiliateId
);

if (affiliateUser?.email) {
  await Wallet.findOneAndUpdate(
    {
      userEmail: affiliateUser.email,
    },
    {
      $inc: {
        availableBalance: commission,
        totalEarned: commission,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
}
    // 👑 PRO UPGRADE
    const email =
      session.customer_details?.email ||
      session.customer_email;

    if (email) {
      await User.findOneAndUpdate(
        { email },
        { $set: { isPro: true } }
      );
    }

    // 🧾 AUDITORIA
    await AuditLog.create({
      action: "SALE_PROCESSED",
      userId: affiliateId,
      amount,
      referenceId: sale._id,
      meta: {
        stripeSessionId: session.id,
        offerId,
        commission,
      },
    });

    console.log("🔥 SALE PROCESSADA:", {
      saleId: sale._id,
      amount,
      commission,
    });
  },
  {
    connection: redis,
    concurrency: 5,
  }
);