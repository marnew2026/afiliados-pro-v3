import express from "express";
import Stripe from "stripe";
import User from "../models/User.js";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* CHECKOUT */
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

    res.redirect(session.url);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro Stripe");
  }
});

/* WEBHOOK */
router.post("/webhook", async (req, res) => {
  try {
    console.log("🔥 WEBHOOK RECEBIDO");

    const sig = req.headers["stripe-signature"];
    console.log("SIGNATURE:", !!sig);

    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("EVENTO:", event.type);


    
export default router;