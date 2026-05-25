import express from "express";
import Stripe from "stripe";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.get("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "brl",

            product_data: {
              name: "Plano PRO",
            },

            unit_amount: 2900,
          },

          quantity: 1,
        },
      ],

      success_url:
        "https://afiliados-pro-v3-2.onrender.com/success",

      cancel_url:
        "https://afiliados-pro-v3-2.onrender.com/cancel",
    });

    return res.json({
      url: session.url,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;