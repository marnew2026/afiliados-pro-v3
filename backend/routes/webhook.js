import express from "express";
import Stripe from "stripe";


import User from "../models/User.js";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const sig = req.headers["stripe-signature"];

      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      /* =========================
         PAGAMENTO APROVADO
      ========================= */
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const email = session.customer_email;

        console.log("PAGAMENTO APROVADO:", email);

        /* FIREBASE */
        try {
          const user = await admin.auth().getUserByEmail(email);

          await admin.auth().setCustomUserClaims(user.uid, {
            pro: true,
          });

          console.log("FIREBASE PRO OK");
        } catch (firebaseError) {
          console.log("ERRO FIREBASE:", firebaseError.message);
        }

        /* MONGODB */
        await User.findOneAndUpdate(
          { email },
          {
            isPro: true,
          },
          { upsert: true }
        );

        console.log("MONGO PRO OK");
      }
      res.json({
        received: true,
      });
    } catch (err) {
      console.log("WEBHOOK ERROR:", err.message);

      res.status(400).send("Webhook Error");
    }
  }
);

export default router;