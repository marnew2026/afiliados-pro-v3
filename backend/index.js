import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import Stripe from "stripe";

/* ROUTES */
import stripeRoutes from "./routes/stripeRoutes.js";
import campaignsRoutes from "./routes/campaigns.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/admin.js";
import withdrawRoutes from "./routes/withdrawRoutes.js";

const app = express();

/* =========================
   MIDDLEWARE BASE
========================= */
app.use(cors());
app.use(express.json());

/* Stripe webhook raw */
app.use(
  "/stripe/webhook",
  express.raw({ type: "application/json" })
);

/* =========================
   DB
========================= */
connectDB();

/* =========================
   ROUTES
========================= */
app.use("/stripe", stripeRoutes);
app.use("/campaigns", campaignsRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/withdraw", withdrawRoutes);

/* =========================
   TEST ROUTES
========================= */
app.get("/", (req, res) => {
  res.send("🚀 SaaS Afiliados PRO ONLINE");
});

app.get("/success", (req, res) => {
  res.send("Pagamento aprovado");
});

app.get("/cancel", (req, res) => {
  res.send("Pagamento cancelado");
});
app.get("/dashboard/:email", async (req, res) => {
  try {
    const Campaign =
      (await import("./models/Campaign.js")).default;

    const Withdraw =
      (await import("./models/Withdraw.js")).default;

    const email = req.params.email;

    const campaigns = await Campaign.find({
      userEmail: email,
    });

    const withdraws = await Withdraw.find({
      userEmail: email,
      status: "approved",
    });

    // SOMA CLICKS
    const totalClicks = campaigns.reduce(
      (sum, c) => sum + (c.clicks || 0),
      0
    );

    // REMOVE GANHOS NEGATIVOS
    const normalizedCampaigns = campaigns.map(c => ({
      ...c._doc,
      earnings: Math.max(c.earnings || 0, 0),
    }));

    // TOTAL GANHOS
    const totalEarnings = normalizedCampaigns.reduce(
      (sum, c) => sum + c.earnings,
      0
    );

    // TOTAL SACADO
    const totalWithdrawn = withdraws.reduce(
      (sum, w) => sum + (w.amount || 0),
      0
    );

    // SALDO DISPONÍVEL
    const availableBalance = Math.max(
      totalEarnings - totalWithdrawn,
      0
    );

    res.json({
      campaigns: normalizedCampaigns,
      totalClicks,
      totalEarnings,
      totalWithdrawn,
      availableBalance,
    });

  } catch (err) {
    console.log("DASHBOARD ERROR:", err);

    res.status(500).json({
      error: "Erro dashboard",
    });
  }
});
     

/* =========================
   USER (fallback seguro)
========================= */
app.get("/user/:email", async (req, res) => {
  try {
    const User = (await import("./models/User.js")).default;

    const user = await User.findOne({
      email: req.params.email,
    });

    res.json(user || {});
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

/* =========================
   AFFILIATE REDIRECT
========================= */
app.get("/r/:id", async (req, res) => {
  try {
    const Campaign = (await import("./models/Campaign.js")).default;

    const campaign = await Campaign.findOne({
      affiliateLink: { $regex: req.params.id },
    });

    if (!campaign) {
      return res.status(404).send("Link inválido");
    }

    campaign.clicks = (campaign.clicks || 0) + 1;

    const commission = campaign.commission ?? 0.1;

    campaign.earnings =
      (campaign.earnings || 0) + commission;

    await campaign.save();

    return res.redirect(campaign.link);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Erro");
  }
});

/* =========================
   STRIPE INIT SAFE
========================= */
if (!process.env.STRIPE_SECRET_KEY) {
  console.log("❌ STRIPE_SECRET_KEY não encontrada");
}

console.log(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
/* =========================
   CHECKOUT
========================= */
app.post("/create-checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Plano PRO",
            },
            unit_amount: 2900,
          },
          quantity: 1,
        },
      ],

      success_url: "https://google.com",
      cancel_url: "https://google.com",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🔥 SERVER INICIADO");
  console.log("🚀 PORTA:", PORT);
  console.log("💳 STRIPE ATIVO");
  console.log("📦 CAMPAIGNS ROUTES OK");
  console.log("🔥 MongoDB conectado");
});