import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import campaignRoutes from "./routes/campaigns.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import trackingRoutes from "./routes/tracking.js";
import dashboardRoutes from "./routes/dashboard.js";
import checkoutRoutes from "./routes/checkout.js";
import stripeConnectRoutes from "./routes/stripeConnect.js";
import goRoutes from "./routes/go.js";
import debugRoutes from "./routes/debug.js";
import affiliateRoutes from "./routes/affiliate.js";
import offersRoutes from "./routes/offers.js";
import salesRoutes from "./routes/sales.js";
import webhookRoutes from "./routes/webhook.js";

const app = express();
app.get("/ping", (req, res) => {
  res.send("OK");
});
process.on("uncaughtException", (err) => console.error("UNCAUGHT:", err));
process.on("unhandledRejection", (err) => console.error("REJECTION:", err));

connectDB();

/* IMPORTANTE: webhook ANTES do express.json */


app.get("/ping", (req, res) => {
  res.json({ ok: true });
});
app.use(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookRoutes
);
app.use(express.json());
app.use(cors());
app.use("/checkout", checkoutRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/stripe", stripeRoutes);
app.use("/r", trackingRoutes);
app.use("/track", trackingRoutes);
app.use("/stripe-connect", stripeConnectRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/offers", offersRoutes);
app.use("/sales", salesRoutes);
app.use("/affiliate", affiliateRoutes);
app.use("/", debugRoutes);
app.use("/auth", authRoutes);
app.use("/", goRoutes);
/* webhook POR ÚLTIMO */
app.get("/", (req, res) => res.send("🚀 SaaS Afiliados PRO ONLINE"));
app.get("/success", (req, res) => res.send("🎉 PAGAMENTO APROVADO"));
app.get("/cancel", (req, res) => res.send("❌ PAGAMENTO CANCELADO"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("STRIPE:", process.env.STRIPE_SECRET_KEY);
  console.log("🔥 SERVER INICIADO");
  console.log("🚀 PORTA:", PORT);
});