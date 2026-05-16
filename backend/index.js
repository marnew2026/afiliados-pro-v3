import dotenv from "dotenv";
dotenv.config();
import productsRoutes from "./routes/products.js";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import webhookRoutes from "./routes/webhook.js";
import productRoutes from "./routes/products.js";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import stripeRoutes from "./routes/stripeRoutes.js";
import productsRoutes from "./routes/products.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/stripe", stripeRoutes);
app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("🚀 SaaS Afiliados PRO ONLINE");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🔥 SERVER INICIADO");
  console.log("🚀 PORTA:", PORT);
});