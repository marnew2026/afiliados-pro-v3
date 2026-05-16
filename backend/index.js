import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import webhookRoutes from "./routes/webhook.js";
import productRoutes from "./routes/products.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// teste rota
app.get("/", (req, res) => {
  res.send("🚀 SaaS Afiliados PRO ONLINE");
});

// stripe
app.use("/stripe", stripeRoutes);

// páginas stripe
app.get("/success", (req, res) => {
  res.send("🎉 PAGAMENTO APROVADO");
});
app.use("/webhook", webhookRoutes);
app.get("/cancel", (req, res) => {
  res.send("❌ PAGAMENTO CANCELADO");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🔥 SERVER INICIADO");
  console.log("🚀 PORTA:", PORT);
  console.log("💳 STRIPE ATIVO");
});