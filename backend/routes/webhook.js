import express from "express";
import Stripe from "stripe";
import Sale from "../models/Sale.js";
import User from "../models/User.js";
import Offer from "../models/Offer.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// IMPORTANTE: como no index.js você já usa app.use("/webhook", express.raw(...))
// aqui NÃO precisa repetir express.raw()
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
    console.log("❌ Webhook assinatura:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("🔥 PAGAMENTO CONFIRMADO:", session.id);

      const offerId = session.metadata?.offerId || null;
      const affiliateId = session.metadata?.affiliateId || null;
      const email = session.customer_email || null;

      let commission = 0;

      if (offerId) {
        const offer = await Offer.findById(offerId);

        if (offer) {
          commission =
            (session.amount_total * (offer.commissionPercent || 0)) / 100;
        }
      }

      await Sale.create({
        productId: offerId,
        productName: "Produto",
        producerId: "produtor123",
        affiliateId,
        buyerEmail: email,
        amount: session.amount_total,
        commission,
        stripeSessionId: session.id,
        status: "approved",
      });

      if (email) {
        await User.findOneAndUpdate(
          { email },
          { isPro: true },
          { new: true }
        );
      }

      console.log("✅ Venda registrada");
    }

    return res.json({ received: true });
  } catch (err) {
    console.log("❌ Webhook processamento:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

export default router;