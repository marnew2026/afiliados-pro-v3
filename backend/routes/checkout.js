import express from "express";
import Stripe from "stripe";
import { protect } from "../middlewares/authMiddleware.js";
import { buildProCheckoutSession } from "../services/billing/StripeSubscriptionService.js";
console.log("🔥 CHECKOUT ROUTE CARREGADA");
const router = express.Router();
console.log("🔥 CHECKOUT ROUTES CARREGADA");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout", protect, async (req, res) => {

    console.log("🔥 CREATE CHECKOUT CHAMADO");
    console.log("🔥🔥🔥 CHECKOUT.JS FOI IMPORTADO 🔥🔥🔥");
  try {
    const params = buildProCheckoutSession({
      user: req.user,
      priceId: process.env.STRIPE_PRICE_ID,
      baseUrl: process.env.BASE_URL,
    });
    const session = await stripe.checkout.sessions.create(params);

    return res.json({ url: session.url });
  } catch (err) {
    console.log("ERRO AO CRIAR CHECKOUT:", err.message);
    return res.status(500).json({ error: "Falha ao abrir pagamento" });
  }
});

export default router;
