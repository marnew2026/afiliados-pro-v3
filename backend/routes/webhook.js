import express from "express";
import Stripe from "stripe";
import admin from "firebase-admin";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_email;

      const user = await admin.auth().getUserByEmail(email);

      await admin.auth().setCustomUserClaims(user.uid, {
        pro: true,
      });

      console.log("USUÁRIO PRO:", email);
    }

    res.json({ received: true });
  } catch (err) {
    console.log(err.message);
    res.status(400).send(`Webhook Error`);
  }
});

export default router;