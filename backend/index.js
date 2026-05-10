import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// 🔐 STRIPE
// =========================
const stripe = new Stripe(process.env.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);

// =========================
// 📦 MONGO DB
// =========================
mongoose.connect("process.env.mongodb+srv://marielsantana34_db_user:Wv1xaTT98oNMtt8g@cluster0.lfiertt.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log(err));

// =========================
// 👤 USER MODEL
// =========================
const User = mongoose.model("User", {
  email: String,
  isPro: Boolean,
  stripeCustomerId: String,
});

// =========================
// 📦 CAMPAIGN MODEL
// =========================
const Campaign = mongoose.model("Campaign", {
  name: String,
  link: String,
  ownerId: String,
  email: String,
  clicks: { type: Number, default: 0 },
});

// =========================
// 💳 CREATE CHECKOUT
// =========================
app.post("/create-checkout", async (req, res) => {
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

      success_url: "https://seu-app.com/sucesso",
      cancel_url: "https://seu-app.com/cancelado",

      metadata: {
        email,
      },
    });

    res.json({ url: session.url });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "checkout error" });
  }
});

// =========================
// 🔥 STRIPE WEBHOOK (PRO)
// =========================
app.post("/stripe-webhook", express.raw({ type: "application/json" }), async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.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
    );
  } catch (err) {
    console.log("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 💳 PAGAMENTO CONFIRMADO
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.metadata.email;

    await User.findOneAndUpdate(
      { email },
      { isPro: true },
      { upsert: true }
    );

    console.log("USUÁRIO PROMOVIDO A PRO:", email);
  }

  res.json({ received: true });
});

// =========================
// 👤 GET USER
// =========================
app.get("/user/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  res.json(user || { isPro: false });
});

// =========================
// 📦 GET CAMPAIGNS
// =========================
app.get("/campaigns", async (req, res) => {
  const { ownerId } = req.query;

  const campaigns = await Campaign.find({ ownerId });

  res.json(campaigns);
});

// =========================
// ➕ CREATE CAMPAIGN
// =========================
app.post("/campaigns", async (req, res) => {
  const { name, link, ownerId, email } = req.body;

  const user = await User.findOne({ email });

  if (!user?.isPro) {
    return res.status(403).json({ error: "PRO required" });
  }

  const campaign = await Campaign.create({
    name,
    link,
    ownerId,
    email,
  });

  res.json(campaign);
});

// =========================
// 🚀 START SERVER
// =========================
const PORT = process.env.PORT || 3000;
const Stripe = require("stripe");
const stripe = Stripe(process.env.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);
app.post("/create-checkout", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email obrigatório",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      customer_email: email,

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

    res.json({
      url: session.url,
    });

  } catch (err) {
    console.log("ERRO STRIPE:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});



app.listen(PORT, () => {
  console.log("Backend rodando na porta", PORT);
});