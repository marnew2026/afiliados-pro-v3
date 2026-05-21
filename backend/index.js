import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import stripeRoutes from "./routes/stripeRoutes.js";
import campaignsRoutes from "./routes/campaigns.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/admin.js";
import withdrawalsRoutes from "./routes/withdrawals.js";


const app = express();

/* MIDDLEWARE */
app.use(cors());
connectDB();

/* Stripe webhook */
app.use("/stripe/webhook", express.raw({ type: "application/json" }));

/* JSON */
app.use(express.json());

/* ROUTES */
app.use("/stripe", stripeRoutes);
app.use("/campaigns", campaignsRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/withdrawals", withdrawalsRoutes);

/* TEST */
app.get("/", (req, res) => {
  res.send("🚀 SaaS Afiliados PRO ONLINE");
});

app.get("/success", (req, res) => {
  res.send("Pagamento aprovado");
});

app.get("/cancel", (req, res) => {
  res.send("Pagamento cancelado");
});

/* CONSULTAR USUÁRIO */
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

/* REDIRECT + CLICK */
app.get("/r/:id", async (req, res) => {
  try {
    const Campaign = (await import("./models/Campaign.js")).default;

    const campaign = await Campaign.findOne({
      affiliateLink: {
        $regex: req.params.id,
      },
    });

    if (!campaign) {
      return res.status(404).send("Link inválido");
    }

    campaign.clicks = (campaign.clicks || 0) + 1;

    const commission = campaign.commission ?? 0.1;
    campaign.earnings = campaign.clicks * commission;

    await campaign.save();

    return res.redirect(campaign.link);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Erro");
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🔥 SERVER INICIADO");
  console.log("🚀 PORTA:", PORT);
  console.log("💳 STRIPE ATIVO");
  console.log("📦 CAMPAIGNS ROUTES OK");
});