import express from "express";
import stripe from "../config/stripe.js";

const router = express.Router();

router.post("/create-checkout", async (req, res) => {
  try {
    const { email } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    return res.json({ url: session.url });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;