console.log("🔥 WEBHOOK ROUTE CARREGADA");
import express from "express";
import Stripe from "stripe";


import User from "../models/User.js";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
        console.log("🔥🔥🔥 ENTROU NO WEBHOOK");
     console.log("================================");
    console.log("🔥 WEBHOOK RECEBIDO");
    console.log("================================");
    try {
      const sig = req.headers["stripe-signature"];


      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log("EVENTO:", event.type);

      /* =========================
         PAGAMENTO APROVADO
      ========================= */
      if (event.type === "checkout.session.completed") {
            console.log("✅ EVENTO CORRETO");
        const session = event.data.object;
            
        const email = session.customer_email;

     console.log("================================");
console.log("💳 PAGAMENTO APROVADO");

console.log("================================");

        


        /* MONGODB */
const user = await User.findOneAndUpdate(
  { email },
  {
    $set: {
      isPro: true,
      plan: "PRO",
      status: "done",
      lastProcessedAt: new Date(),
    },
  },
  {
    new: true,
  }
);

if (!user) {
 
} else {

}


console.log("================================");
console.log("USUÁRIO ATUALIZADO");

console.log("================================");
console.log("✅ MONGO PRO OK");;
      }
      res.json({
        received: true,
      });
    } catch (err) {
    console.log("ERRO WEBHOOK");
    console.log(err);

      res.status(400).send("Webhook Error");
    }
  }
);

export default router;
