import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log("🔥 BACKEND INICIANDO V2");

app.use(cors());

// rota teste
app.get("/", (req, res) => {
  res.send("🚀 Backend OK");
});

// checkout
app.post("/checkout", express.json(), async (req, res) => {
  try {
    const { ref } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      metadata: {
        ref: ref || "",
      },
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "SaaS Afiliados Pro",
            },
            unit_amount: 2900,
          },
          quantity: 1,
        },
      ],
      success_url: "https://afiliados-pro-v3-l3ht.vercel.app/sucesso",
      cancel_url: "https://afiliados-pro-v3-l3ht.vercel.app/cancelado",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log("❌ CHECKOUT:", error.message);
    res.status(500).json({ error: error.message });
  }
});
app.post("/withdraw", express.json(), async (req, res) => {
  try {
    const { email, pixKey, amount } = req.body;

    console.log("💸 SAQUE:", email, pixKey, amount);

    res.json({
      success: true,
      message: "Solicitação registrada",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// clique
app.post("/click", express.json(), async (req, res) => {
  const { ref } = req.body;
  console.log("👆 CLIQUE:", ref);
  res.json({ ok: true });
});

// webhook
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("🔥 EVENTO:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("💰 PAGAMENTO:", session.customer_email);
    }

    res.json({ received: true });
  } catch (err) {
    console.log("❌ WEBHOOK:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 BACKEND RODANDO NA ${PORT}`);
});