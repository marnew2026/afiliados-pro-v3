import express from "express";
import Stripe from "stripe";
import Sale from "../models/Sale.js";
import User from "../models/User.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("❌ Webhook erro assinatura:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("🔥 PAGAMENTO CONFIRMADO:", session.id);

    try {
      const offerId = session.metadata.offerId;
      const affiliateId = session.metadata.affiliateId;
      const commission = Number(session.metadata.commission || 0);
      const email = session.customer_email;

      await Sale.create({
        productId: offerId,
        productName: "Produto",
        producerId: "produtor123",
        affiliateId,
        buyerEmail: email,
        amount: session.amount_total / 100,
        commission,
        stripeSessionId: session.id,
        status: "approved",
      });

      await User.findOneAndUpdate(
        { email },
        { isPro: true },
        { new: true }
      );

      console.log("✅ USUÁRIO LIBERADO PRO:", email);
      console.log("🔥 SALE SALVA COM SUCESSO");
    } catch (err) {
      console.log("❌ ERRO AO PROCESSAR:", err.message);
    }
  }

  res.json({ received: true });
});

export default router;