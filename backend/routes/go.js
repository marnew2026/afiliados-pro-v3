import express from "express";
import Stripe from "stripe";
import Click from "../models/Click.js";
import Offer from "../models/Offer.js";

const router = express.Router();

console.log("🔥 GO ROUTE CARREGADA");

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

router.get("/:affiliateCode/:offerId", async (req, res) => {
  try {

    console.log(
      "🔥🔥🔥 NOVA VERSAO GO 13-06-2026"
    );

    const { affiliateCode, offerId } = req.params;

    await Click.create({
      affiliateId: affiliateCode,
      offerId,
    });

    const offer = await Offer.findById(
      offerId
    );

    if (!offer) {
      return res.status(404).json({
        error: "Oferta não encontrada",
      });
    }

    console.log("OFFER:", offer);
    console.log("NAME:", offer.name);
    console.log("PRICE:", offer.price);
    console.log("🔥🔥🔥 GO VERSAO FINAL 999999");

router.get("/:affiliateCode/:offerId", async (req, res) => {

  return res.json({
    teste: true,
    rota: "nova"
  });

});

    const price = Number(offer.price);

    console.log(
      "PRICE NUMBER:",
      price
    );

    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],

        line_items: [
          {
            price_data: {
              currency: "brl",

              product_data: {
                name: offer.name,
              },

              unit_amount:
                Math.round(price * 100),
            },

            quantity: 1,
          },
        ],

        success_url:
          `${process.env.BASE_URL}/success`,

        cancel_url:
          `${process.env.BASE_URL}/cancel`,

        metadata: {
          affiliateId: affiliateCode,
          offerId,
          commission:
            offer.commissionPercent,
        },
      });

    return res.redirect(
      session.url
    );

  } catch (err) {

    console.log(
      "❌ ERRO /go:",
      err
    );

    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;