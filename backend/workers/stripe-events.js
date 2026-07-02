import "../src/config/env.js";

import { Worker } from "bullmq";

import Sale from "../models/Sale.js";
import User from "../models/User.js";
import AuditLog from "../models/AuditLog.js";

import WalletTransaction from "../models/WalletTransaction.js";

import { safeCreateLedger } from "../src/services/safeCreateLedger.js";
import { rebuildWallet } from "../src/services/rebuildWallet.js";

import { redis } from "../config/redis.js";

/**
 * STRIPE EVENTS WORKER - SAAS BLINDADO
 */
export const worker = new Worker(
  "stripe-events",
  async (job) => {
    try {
      const event = job.data.body;

      if (!event || event.type !== "checkout.session.completed") {
        return;
      }

      const session = event.data.object;

      const affiliateId = session.metadata?.affiliateId || null;
      const offerId = session.metadata?.offerId || null;
      const commissionPercent = Number(session.metadata?.commission || 0);
      const userId = session.metadata?.userId || null;

      const amount = (session.amount_total || 0) / 100;
      const commission = (amount * commissionPercent) / 100;

      /**
       * 1. IDEMPOTÊNCIA (NUNCA DUPLICAR SALE)
       */
      const exists = await Sale.findOne({
        stripeSessionId: session.id,
      });

      if (exists) {
        console.log("⚠️ SALE DUPLICADA IGNORADA:", session.id);
        return;
      }

      /**
       * 2. CRIA SALE
       */
      const sale = await Sale.create({
        productId: offerId,
        affiliateId,
        amount,
        commission,
        stripeSessionId: session.id,
        status: "paid",
      });

      /**
       * 3. LOG FINANCEIRO (TRANSACTION LEGACY OPCIONAL)
       */
      if (affiliateId && commission > 0) {
        await WalletTransaction.create({
          userId: affiliateId,
          type: "commission",
          amount: commission,
          status: "pending",
          saleId: sale._id,
        });
      }

      /**
       * 4. LEDGER (FONTE OFICIAL DO DINHEIRO)
       */
      if (affiliateId && commission > 0) {
        await safeCreateLedger({
          userId: affiliateId,
          type: "credit",
          amount: commission,
          status: "confirmed",
          referenceId: sale._id.toString(),
          source: "sale",
        });

        await rebuildWallet(affiliateId);

        console.log(
          "💰 COMISSÃO CREDITADA:",
          affiliateId,
          commission
        );
      }

      /**
       * 5. UPGRADE PRO
       */
      if (userId) {
        const user = await User.findById(userId);

        if (user && !user.isPro) {
          user.isPro = true;
          await user.save();
        }
      }

      /**
       * 6. AUDITORIA
       */
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

      console.log("🔥 SALE PROCESSADA COM SUCESSO:", {
        saleId: sale._id.toString(),
        amount,
        commission,
      });
    } catch (error) {
      console.error("❌ ERRO NO WORKER:", error);
    }
  },
  {
    connection: redis,
    concurrency: 5,
  }
);