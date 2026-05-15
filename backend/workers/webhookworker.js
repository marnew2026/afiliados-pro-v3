import { Worker } from "bullmq";
import Stripe from "stripe";
import Sale from "../models/Sale.js";
import WalletTransaction from "../models/WalletTransaction.js";
import User from "../models/User.js";
import { redis } from "../config/redis.js";
export async function processWebhookEvents() {
  console.log("🔄 Processando eventos de webhook...");

  // aqui você coloca lógica futura:
  // - buscar eventos no banco
  // - processar Stripe events
  // - disparar payouts
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const worker = new Worker(
  "stripe-events",
  async (job) => {
    const event = job.data.body;

    // Stripe signature NÃO precisa aqui (já validou no webhook se quiser)
    if (event.type !== "checkout.session.completed") return;

    const session = event.data.object;

    const affiliateId = session.metadata?.affiliateId;
    const offerId = session.metadata?.offerId;
    const commissionPercent = Number(session.metadata?.commission || 0);

    const amount = (session.amount_total || 0) / 100;
    const commission = (amount * commissionPercent) / 100;

    // 🔥 IDEMPOTÊNCIA (anti duplicação tipo Hotmart)
    const exists = await Sale.findOne({
      stripeSessionId: session.id,
    });

    if (exists) {
      console.log("⚠️ DUPLICADO IGNORADO");
      return;
    }

    // 💰 SALE
    const sale = await Sale.create({
      productId: offerId,
      affiliateId,
      amount,
      commission,
      stripeSessionId: session.id,
      status: "approved",
    });

    // 💳 WALLET
    if (affiliateId) {
      await WalletTransaction.create({
        userId: affiliateId,
        type: "commission",
        amount: commission,
        status: "pending",
        saleId: sale._id,
      });

      await User.findOneAndUpdate(
        { affiliateCode: affiliateId },
        { $inc: { pendingBalance: commission } }
      );
    }

    // 👑 PRO UPGRADE
    const email =
      session.customer_details?.email || session.customer_email;

    if (email) {
      await User.findOneAndUpdate(
        { email },
        { isPro: true }
      );
    }

    console.log("🔥 SALE PROCESSADA HOTMART STYLE");
  },
  {
    connection: redis,
    concurrency: 5, // 🔥 escala
  }
);