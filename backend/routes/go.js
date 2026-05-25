import express from "express";
import Stripe from "stripe";
import Click from "../models/Click.js";
import Offer from "../models/Offer.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* =========================
   HOTMART LINK / GO ROUTE
========================= */
router.get("/go/:affiliateCode/:offerId", async (req, res) => {
  try {
    const { affiliateCode, offerId } = req.params;

    // 1. salva clique
    await Click.create({
      affiliateId: affiliateCode,
      offerId,
    });

    // 2. busca oferta
    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).json({ error: "Oferta não encontrada" });
    }

    // 3. cria checkout Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: offer.name,
            },
            unit_amount: offer.price * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,

      metadata: {
        affiliateId: affiliateCode,
        offerId,
        commission: offer.commissionPercent,
      },
    });

   return res.json({
  url: session.url
});

  } catch (err) {
    console.log("❌ ERRO /go:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

export default router;