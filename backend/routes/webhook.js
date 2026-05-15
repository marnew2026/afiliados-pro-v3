import express from "express";
import stripe from "../config/stripe.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    await User.findOneAndUpdate(
      { email: session.customer_email },
      { isPro: true }
    );

    console.log("🔥 USUÁRIO PRO ATIVADO");
  }

  res.json({ received: true });
});
export default router;