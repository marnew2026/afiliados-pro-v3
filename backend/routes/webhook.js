import express from "express";
import Stripe from "stripe";
import Sale from "../models/Sale.js";
import WalletTransaction from "../models/WalletTransaction.js";
import User from "../models/User.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("❌ WEBHOOK ERROR:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("🔥 WEBHOOK RECEBIDO:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const affiliateId = session.metadata?.affiliateId;
      const offerId = session.metadata?.offerId;

      const amount = session.amount_total / 100;
      const commissionPercent = Number(session.metadata?.commission || 0);

      const commissionValue = (amount * commissionPercent) / 100;

      const email =
        session.customer_details?.email ||
        session.customer_email ||
        null;

      // 🔥 1. SALVAR SALE
      const sale = await Sale.create({
        productId: offerId,
        affiliateId,
        amount,
        commission: commissionValue,
        stripeSessionId: session.id,
        status: "approved",
      });

      console.log("✅ SALE SALVA:", sale._id);

      // 🔥 2. ATUALIZAR WALLET DO AFILIADO
      if (affiliateId) {
        await WalletTransaction.create({
          userId: affiliateId,
          type: "commission",
          amount: commissionValue,
          status: "pending",
          saleId: sale._id,
        });

        await User.findOneAndUpdate(
          { affiliateCode: affiliateId },
          {
            $inc: {
              pendingBalance: commissionValue,
            },
          }
        );

        console.log("💰 COMISSÃO CREDITADA:", commissionValue);
      }

      // 🔥 3. LIBERAR PRO (SE QUISER SAAS)
      if (email) {
        await User.findOneAndUpdate(
          { email },
          { isPro: true }
        );

        console.log("👑 USUÁRIO PRO:", email);
      }
    } catch (err) {
      console.log("❌ ERRO INTERNO WEBHOOK:", err.message);
    }
  }

  res.json({ received: true });
});

export default router;