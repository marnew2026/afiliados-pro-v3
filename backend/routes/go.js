import express from "express";
import Click from "../models/Click.js";
import Offer from "../models/Offer.js";
import Stripe from "stripe";


const router = express.Router();
let stripe;

function getStripe() {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;

    if (!key) {
      throw new Error("STRIPE_SECRET_KEY não carregada");
    }

    stripe = new Stripe(key);
  }

  return stripe;
}
router.get("/:affiliateCode/:offerId", async (req, res) => {
  try {
    const stripe = getStripe(); // 👈 AQUI

    const { affiliateCode, offerId } = req.params;

    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).json({ error: "Oferta não encontrada" });
    }

    const price = Number(offer.price);

    if (!price || price <= 0) {
      return res.status(400).json({ error: "Preço inválido" });
    }

    await Click.create({
      affiliateId: affiliateCode,
      offerId,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: offer.name || "Produto",
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
      metadata: {
        affiliateId: affiliateCode,
        offerId,
        commission: String(offer.commissionPercent || 0),
      },
    });

    return res.redirect(session.url);

  } catch (err) {
    console.log("❌ ERRO /go:", err.message);
    return res.status(500).json({ error: err.message });
  }
});
export default router;