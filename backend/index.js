import dotenv from "dotenv";
dotenv.config();
console.log("URL carregada?", !!process.env.MONGO_URL);
console.log("Começo:", process.env.MONGO_URL?.slice(0, 25));
console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("ENV MONGO:", process.env.MONGO_URL ? "OK" : "UNDEFINED");
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";

connectDB();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 8081;

app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ROTAS AUTH
app.use("/auth", authRoutes);

console.log("🔥 BACKEND HOTMART SAAS");

// rota teste
app.get("/", (req, res) => {
  res.send("🚀 Backend OK");
});
app.get("/ping", (req, res) => {
  res.json({ status: "ok", auth: true });
});
// checkout
app.post("/checkout", async (req, res) => {
  try {
    const { ref } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      metadata: { ref },

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
    console.error("Erro checkout:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 BACKEND RODANDO NA ${PORT}`);
});