import express from "express";
import stripe from "../services/stripe.js";
import User from "../models/User.js";

const router = express.Router();

/* =========================
   CRIAR CONTA PRODUTOR
========================= */
router.post("/create", async (req, res) => {
  const { email } = req.body;

  const account = await stripe.accounts.create({
    type: "express",
    country: "BR",
    email,
  });

  await User.findOneAndUpdate(
    { email },
    {
      stripeAccountId: account.id,
      role: "producer",
    },
    { upsert: true }
  );

  res.json({
    accountId: account.id,
    onboardingUrl: `https://connect.stripe.com/express/onboarding/${account.id}`,
  });
});

export default router;