import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Stripe from "stripe";
import Sale from "../models/Sale.js";
import User from "../models/User.js";

const router = express.Router();

console.log("💳 STRIPE KEY:", process.env.STRIPE_SECRET_KEY?.slice(0, 12));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

/* =========================
   LINK DE AFILIADO (HOTMART STYLE)
========================= */
router.get("/test/:offerId", async (req, res) => {
  try {
    const { offerId } = req.params;
    const affiliateId = req.query.aff;

    return res.json({
      url: `${process.env.BASE_URL || "http://localhost:3001"}/checkout/redirect/${offerId}?aff=${affiliateId || ""}`,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* =========================
   REDIRECT PARA STRIPE
========================= */
router.get("/redirect/:offerId", async (req, res) => {
  try {
    const { offerId } = req.params;
    const affiliateId = req.query.aff;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Curso IA Bilionária",
            },
            unit_amount: 9700,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3001/success",
      cancel_url: "http://localhost:3001/cancel",
      metadata: {
        offerId,
        affiliateId: affiliateId || "none",
        commission: "48.5",
        producerId: "produtor123",
        productName: "Curso IA Bilionária",
      },
    });

    return res.redirect(session.url);
  } catch (err) {
    console.log("ERRO CHECKOUT:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

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
    console.log("❌ Webhook erro assinatura:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("🔥 PAGAMENTO CONFIRMADO:", session.id);

    try {
      const offerId = session.metadata?.offerId;
      const affiliateId = session.metadata?.affiliateId;
      const commission = Number(session.metadata?.commission || 0);
      const email = session.customer_email;

      console.log("AFFILIATE:", affiliateId);
      console.log("EMAIL:", email);

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

      await User.findOneAndUpdate(
        { email },
        { isPro: true },
        { new: true }
      );

      console.log("✅ USUÁRIO LIBERADO PRO:", email);
      console.log("SALE SALVA:", sale._id);
    } catch (err) {
      console.log("❌ ERRO AO PROCESSAR:", err);
    }
  }

  res.json({ received: true });
});

export default router;