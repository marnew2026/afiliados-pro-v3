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
      "🔥🔥🔥 GO VERSION LIMPA 2026-06-13"
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

    const price = Number(offer.price);

    if (!price || price <= 0) {
      return res.status(400).json({
        error: "Preço inválido",
      });
    }

    const payload = {
      mode: "payment",

      payment_method_types: [
        "card"
      ],

      line_items: [
        {
          price_data: {
            currency: "brl",

            product_data: {
              name:
                offer.name ||
                "Produto Teste",
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
          String(
            offer.commissionPercent || 0
          ),
      },
    };

    console.log(
      "PAYLOAD STRIPE:"
    );

    console.log(
      JSON.stringify(
        payload,
        null,
        2
      )
    );

    const session =
      await stripe.checkout.sessions.create(
        payload
      );

    console.log(
      "SESSION:",
      session.id
    );

    return res.redirect(
      session.url
    );

  } catch (err) {

    console.log(
      "❌ ERRO /go COMPLETO:"
    );

    console.log(err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;