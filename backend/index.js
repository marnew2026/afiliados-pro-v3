import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import checkoutRoutes from "./routes/checkout.js";

const app = express();

connectDB();

app.use(express.json());
app.use(cors())

// 🔥 ROTAS
app.use("/checkout", checkoutRoutes);

app.get("/test", (req, res) => {
  res.json({ ok: true });
}); 
app.get("", (req, res) => {
  res.send("🚀 SaaS Afiliados PRO ONLINE");
});
app.use(express.urlencoded({ extended: true }));
app.get("/success", (req, res) => {
  res.send("🎉 PAGAMENTO OK");
});

app.get("/cancel", (req, res) => {
  res.send("❌ CANCELADO");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🔥 SERVER INICIADO");
  console.log("🚀 PORTA:", PORT);
});