import express from "express";
import Stripe from "stripe";
import Sale from "../models/Sale.js";
import User from "../models/User.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* =========================
   WEBHOOK STRIPE
========================= */
router.post("/", async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("❌ Webhook assinatura:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("🔥 PAGAMENTO CONFIRMADO:", session.id);

    try {
      const offerId = session.metadata?.offerId;
      const affiliateId = session.metadata?.affiliateId;
      const commission = Number(session.metadata?.commission || 0);
      const email =
        session.customer_details?.email ||
        session.customer_email ||
        null;

      const sale = await Sale.create({
        productId: offerId,
        productName: session.metadata?.productName || "Produto",
        producerId: session.metadata?.producerId || "produtor123",
        affiliateId,
        buyerEmail: email,
        amount: session.amount_total / 100,
        commission,
        stripeSessionId: session.id,
        status: "approved",
      });

      if (email) {
        await User.findOneAndUpdate(
          { email },
          { isPro: true },
          { new: true }
        );
        console.log("✅ USUÁRIO PRO:", email);
      }

      console.log("✅ SALE SALVA:", sale._id);
    } catch (err) {
      console.log("❌ ERRO SALVANDO VENDA:", err.message);
    }
  }

  return res.json({ received: true });
});

export default router;