import { Worker } from "bullmq";
import Sale from "../models/Sale.js";
import WalletTransaction from "../models/WalletTransaction.js";
import User from "../models/User.js";
import AuditLog from "../models/AuditLog.js";
import Wallet from "../models/Wallet.js";
import { redis } from "../config/redis.js";

export const worker = new Worker(
  "stripe-events",
  async (job) => {
    const event = job.data.body;

    // ignora eventos irrelevantes
    if (event.type !== "checkout.session.completed") {
      return;
    }

    const session = event.data.object;

    const affiliateId =
      session.metadata?.affiliateId || null;

    const offerId =
      session.metadata?.offerId || null;

    const commissionPercent = Number(
      session.metadata?.commission || 0
    );

    const amount =
      (session.amount_total || 0) / 100;

    const commission =
      (amount * commissionPercent) / 100;

    // idempotência
    const exists = await Sale.findOne({
      stripeSessionId: session.id,
    });

    if (exists) {
      console.log(
        "⚠️ DUPLICADO IGNORADO:",
        session.id
      );
      return;
    }

    // cria venda
    const sale = await Sale.create({
      productId: offerId,
      affiliateId,
      amount,
      commission,
      stripeSessionId: session.id,
      status: "paid",
    });

    // cria transação
    if (affiliateId && commission > 0) {
      const walletExists =
        await WalletTransaction.findOne({
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
      }
    }

    // credita carteira
    const affiliateUser =
      await User.findById(affiliateId);

    if (affiliateUser) {
      await Wallet.findOneAndUpdate(
        {
          userId:
            affiliateUser._id.toString(),
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

      console.log(
        "💰 COMISSÃO CREDITADA:",
        affiliateUser.email,
        commission
      );
    }

    // upgrade PRO
    const userId =
      session.metadata?.userId;

    if (userId) {
      await User.findByIdAndUpdate(
        userId,
        {
          isPro: true,
        }
      );
    }

    // auditoria
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