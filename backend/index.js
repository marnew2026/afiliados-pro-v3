import campaignRoutes from "./src/routes/campaign.routes.js";
import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import cors from "cors";
import Stripe from "stripe";

import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 8081;

// Stripe (só inicia se existir chave)
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/campaigns", campaignRoutes);
// ROTAS
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend OK");
});

app.get("/ping", (req, res) => {
  res.json({ status: "ok", auth: true });
});

// CHECKOUT (seguro)
app.post("/checkout", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe não configurado" });
    }

    const { ref } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      metadata: { ref: ref || "" },

      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Produto Afiliado",
            },
            unit_amount: 2900,
          },
          quantity: 1,
        },
      ],

      success_url: "http://localhost:5173/sucesso",
      cancel_url: "http://localhost:5173/cancelado",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: err.message });
  }
});

// START SERVER (CORRIGIDO)
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("🔥 BACKEND HOTMART SAAS");
      console.log(`🚀 BACKEND RODANDO NA ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Erro ao iniciar servidor:", err);
  }
};

startServer();