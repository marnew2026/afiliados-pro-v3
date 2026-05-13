import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// DB
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import campaignRoutes from "./routes/campaigns.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import trackingRoutes from "./routes/tracking.js";
import dashboardRoutes from "./routes/dashboard.js";
import checkoutRoutes from "./routes/checkout.js";
import stripeConnectRoutes from "./routes/stripeConnect.js";
import debugRoutes from "./routes/debug.js";
import affiliateRoutes from "./routes/affiliate.js";
import offersRoutes from "./routes/offers.js";
import salesRoutes from "./routes/sales.js";
import webhookRoutes from "./routes/webhook.js";

// =========================
// APP
// =========================
const app = express();

// =========================
// ERROR HANDLERS
// =========================
process.on("uncaughtException", (err) => {
  console.error("🔥 UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("🔥 UNHANDLED REJECTION:", err);
});

// =========================
// DB
// =========================
connectDB();

// =========================
// MIDDLEWARES
// =========================
app.use(cors());
app.use(express.json());

// =========================
// WEBHOOK (RAW BODY)
// =========================
app.use("/webhook", express.raw({ type: "application/json" }));
app.use("/webhook", webhookRoutes);

// =========================
// ROUTES
// =========================
app.use("/auth", authRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/stripe", stripeRoutes);
app.use("/r", trackingRoutes);
app.use("/track", trackingRoutes);
app.use("/stripe-connect", stripeConnectRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/offers", offersRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/sales", salesRoutes);
app.use("/affiliate", affiliateRoutes);
app.use("/", debugRoutes);

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.send("🚀 SaaS Afiliados PRO ONLINE");
});

app.get("/success", (req, res) => {
  res.send("🎉 PAGAMENTO APROVADO");
});

app.get("/cancel", (req, res) => {
  res.send("❌ PAGAMENTO CANCELADO");
});

// =========================
// SERVER START
// =========================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🔥 SERVER INICIADO");
  console.log("🚀 PORTA:", PORT);

  console.log(
    "🔥 FIREBASE:",
    process.env.FIREBASE_SERVICE_ACCOUNT_B64 ? "OK" : "MISSING"
  );

  console.log("🧠 MONGO:", process.env.MONGO_URL ? "OK" : "MISSING");
  console.log("🔐 JWT:", process.env.JWT_SECRET ? "OK" : "MISSING");
});