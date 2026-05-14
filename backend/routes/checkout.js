import express from "express";
import Stripe from "stripe";
import Click from "../models/Click.js";
import Offer from "../models/Offer.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log("🔥 CHECKOUT V2 LINEITEM FIX");

router.get("/a/:affiliateCode/:offerId", async (req, res) => {
  try {
    const { affiliateCode, offerId } = req.params;

    console.log("🔥 CHECKOUT:", affiliateCode, offerId);

    await Click.create({
      affiliateId: affiliateCode,
      offerId,
    });

    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).json({ error: "Oferta não encontrada" });
    }
    console.log("OFFER:", offer);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

 line_items: [
  {
    price: "price_1TWo7ZCGmSfVpF1Bw1itJ45G",
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

    return res.redirect(session.url);
  } catch (err) {
    console.log("❌ checkout error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

export default router;