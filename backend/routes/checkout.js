import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const BASE = process.env.BASE_URL || "https://afiliados-pro-v3-2.onrender.com";

/* =========================
   LINK DE TESTE
========================= */
router.get("/test/:offerId", async (req, res) => {
  try {
    const { offerId } = req.params;
    const affiliateId = req.query.aff;

    return res.json({
      url: `${BASE}/checkout/redirect/${offerId}?aff=${affiliateId || ""}`,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* =========================
   CHECKOUT STRIPE
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
      success_url: `${BASE}/success`,
      cancel_url: `${BASE}/cancel`,
      metadata: {
        offerId,
        affiliateId: affiliateId || "teste",
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

export default router;