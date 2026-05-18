import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import stripeRoutes from "./routes/stripeRoutes.js";
import campaignsRoutes from "./routes/campaigns.js";

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