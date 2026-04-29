import mercadopago from "mercadopago";
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();

app.use(cors());

// ⚠️ IMPORTANTE: webhook precisa disso separado
app.use(express.json());

console.log("🔥 BACKEND INICIANDO");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// -------------------------
// TESTE
// -------------------------
app.get("/", (req, res) => {
  res.send("🚀 Backend OK");
});

// -------------------------
// CHECKOUT
// 
app.post("/withdraw", async (req, res) => {
  try {
    const { email, pixKey, amount } = req.body;

    console.log("💸 PEDIDO DE SAQUE:", email, amount);

    const payout = await mercadopago.payouts.create({
      amount: Number(amount),
      description: "Saque Afiliados Pro",
      payment_method_id: "pix",
      external_reference: email,
      payer: {
        email: email,
      },
      bank_info: {
        pix: {
          key: pixKey,
        },
      },
    });

    console.log("✅ PIX ENVIADO:", payout);

    return res.json({
      success: true,
      payout,
    });

  } catch (error) {
    console.log("❌ ERRO PIX:", error.message);

    return res.status(500).json({
      error: error.message,
    });
  }
});-------------------------
app.post("/checkout", async (req, res) => {
  try {
    const { ref } = req.body;

    console.log("➡️ CHECKOUT CHAMADO | REF:", ref);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      metadata: {
        ref: ref || null,
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

      success_url: "http://localhost:5173/sucesso",
      cancel_url: "http://localhost:5173/cancelado",
    });

    return res.json({ url: session.url });

  } catch (error) {
    console.log("❌ ERRO CHECKOUT:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------
// WEBHOOK STRIPE
// -------------------------
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("❌ ERRO WEBHOOK:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("🔥 EVENTO RECEBIDO:", event.type);

    // -------------------------
    // PAGAMENTO CONFIRMADO
    // -------------------------
    if (event.type === "checkout.session.completed") {
  const session = event.data.object;

  const email =
    session.customer_details?.email ||
    session.customer_email;

  const ref = session.metadata?.ref;

  console.log("💰 CONVERSÃO:", email);
  console.log("🤝 AFILIADO:", ref);

  // 🔥 SALVAR CONVERSÃO (Hotmart style)
  // se tiver Firebase, descomenta isso:
  /*
  await db.collection("conversions").add({
    ref,
    email,
    value: 29,
    createdAt: new Date().toISOString(),
  });
  */

  // 💸 COMISSÃO GERADA
  if (ref) {
    console.log("💸 COMISSÃO GERADA PARA:", ref);

    // aqui depois entra Stripe Connect payout
  }
}
      } catch (e) {
        console.log("❌ ERRO PROCESSAMENTO:", e.message);
      }
    }

    res.json({ received: true });
  }
);

// -------------------------
// START SERVER
// -------------------------
app.listen(3001, () => {
  console.log("🚀 BACKEND RODANDO NA 3001");
});
app.post("/click", async (req, res) => {
  const { ref } = req.body;

  console.log("👆 CLIQUE AFILIADO:", ref);

  // 🔥 salva clique (Firestore opcional)
  // await db.collection("clicks").add({
  //   ref,
  //   createdAt: new Date().toISOString(),
  // });

  res.json({ ok: true });
});