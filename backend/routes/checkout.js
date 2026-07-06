import express from "express";
import Stripe from "stripe";
console.log("🔥 CHECKOUT ROUTE CARREGADA");
const router = express.Router();
console.log("🔥 CHECKOUT ROUTES CARREGADA");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout", async (req, res) => {

    console.log("🔥 CREATE CHECKOUT CHAMADO");
    console.log("🔥🔥🔥 CHECKOUT.JS FOI IMPORTADO 🔥🔥🔥");
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