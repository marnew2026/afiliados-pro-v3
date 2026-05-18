import express from "express";
import Stripe from "stripe";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.get("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
     mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url:
        "https://afiliados-pro-v3-2.onrender.com/success",
      cancel_url:
        "https://afiliados-pro-v3-2.onrender.com/cancel",
    });

    return res.redirect(session.url);
  } catch (error) {
    console.log("ERRO STRIPE:", error.message);
    return res.status(500).send(error.message);
  }
});

export default router;