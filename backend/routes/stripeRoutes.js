import express from "express";
import Stripe from "stripe";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "subscription",

      customer_email: email,

      line_items: [
        {
          price_data: {
            currency: "brl",

            product_data: {
              name: "Plano PRO",
            },

            unit_amount: 1990,

            recurring: {
              interval: "month",
            },
          },

          quantity: 1,
        },
      ],

      success_url:
        "https://google.com",

      cancel_url:
        "https://google.com",
    });

    res.json({
      url: session.url,
    });

  } catch (error) {
    console.log("ERRO STRIPE:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;