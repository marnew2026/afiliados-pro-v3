import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import stripeRoutes from "./routes/stripeRoutes.js";
import productsRoutes from "./routes/products.js";

const app = express();

app.use(cors());

connectDB();

/* =========================
   STRIPE WEBHOOK (IMPORTANTE)
========================= */
app.use(
  "/stripe/webhook",
  express.raw({ type: "application/json" })
);

/* =========================
   JSON NORMAL PARA RESTO
========================= */
app.use(express.json());

/* ROUTES */
app.use("/stripe", stripeRoutes);
app.use("/products", productsRoutes);

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

/* PORT */
const PORT = process.env.PORT || 3001;
import Product from "./models/Product.js";

app.get("/r/:id", async (req, res) => {
  try {
    const produto = await Product.findById(req.params.id);

    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }

    let link = produto.link?.trim();

    if (!link) {
      return res.status(404).send("Link vazio");
    }

    // adiciona https se não tiver
    if (!link.startsWith("http")) {
      link = "https://" + link.replace("Link:", "").trim();
    }

    return res.redirect(link);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Erro");
  }
});

app.listen(PORT, () => {
  console.log("🔥 SERVER INICIADO");
  console.log("🚀 PORTA:", PORT);
  console.log("💳 STRIPE ATIVO");
});