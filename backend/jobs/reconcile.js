import cron from "node-cron";
import Stripe from "stripe";
import Sale from "../models/Sale.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

cron.schedule("0 */6 * * *", async () => {
  console.log("🔄 RECONCILIANDO STRIPE...");

  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
  });

  for (const session of sessions.data) {
    const exists = await Sale.findOne({
      stripeSessionId: session.id,
    });

    if (!exists && session.payment_status === "paid") {
      console.log("⚠️ CORRIGINDO SALE PERDIDA:", session.id);

      // aqui você pode reprocessar ou enfileirar novamente
    }
  }
});