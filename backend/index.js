import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import campaignRoutes from "./routes/campaigns.js";
import stripeRoutes from "./routes/stripe.js";
import trackingRoutes from "./routes/tracking.js";
import dashboardRoutes from "./routes/dashboard.js";
import checkoutRoutes from "./routes/checkout.js";
import stripeConnectRoutes from "./routes/stripeConnect.js";
import debugRoutes from "./routes/debug.js";
import affiliateRoutes from "./routes/affiliate.js";
import offersRoutes from "./routes/offers.js";
import salesRoutes from "./routes/sales.js";
import webhookRoutes from "./routes/webhook.js";

// DB connect
connectDB();

const app = express();

/* =========================
   WEBHOOK (OBRIGATÓRIO RAW)
========================= */
app.use("/webhook", express.raw({ type: "application/json" }));
app.use("/webhook", webhookRoutes);

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   ROTAS
========================= */
app.use("/auth", authRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/stripe", stripeRoutes);
app.use("/track", trackingRoutes);
app.use("/stripe-connect", stripeConnectRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/offers", offersRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/sales", salesRoutes);
app.use("/affiliate", affiliateRoutes);
app.use("/", debugRoutes);

/* =========================
   PÁGINAS SIMPLES
========================= */
app.get("/success", (req, res) => {
  res.send("🎉 PAGAMENTO APROVADO");
});

app.get("/cancel", (req, res) => {
  res.send("❌ PAGAMENTO CANCELADO");
});

app.get("/", (req, res) => {
  res.send("🚀 SaaS Afiliados PRO ONLINE");
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🔥 Server rodando na porta", PORT);
  console.log("🔥 ENV carregado:", process.env.FIREBASE_SERVICE_ACCOUNT_B64 ? "OK" : "MISSING");
});