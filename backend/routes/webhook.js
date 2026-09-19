console.log("🔥 WEBHOOK ROUTE CARREGADA");
import express from "express";
import Stripe from "stripe";


import User from "../models/User.js";
import { applyStripeSubscriptionEvent } from "../services/billing/StripeSubscriptionService.js";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
        console.log("🔥🔥🔥 ENTROU NO WEBHOOK");
     console.log("================================");
    console.log("🔥 WEBHOOK RECEBIDO");
    console.log("================================");
    try {
      const sig = req.headers["stripe-signature"];


      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log("EVENTO:", event.type);

      const result = await applyStripeSubscriptionEvent({
        event,
        UserModel: User,
      });

      console.log("STRIPE ACAO:", result.action);
      res.json({
        received: true,
      });
    } catch (err) {
    console.log("ERRO WEBHOOK");
    console.log(err);

      res.status(400).send("Webhook Error");
    }
  }
);

export default router;
