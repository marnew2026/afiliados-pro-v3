import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import Withdraw from "./models/Withdraw.js";
/* ROUTES */
import stripeRoutes from "./routes/stripeRoutes.js";
import campaignsRoutes from "./routes/campaigns.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/admin.js";
import withdrawRoutes from "./routes/withdrawRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";
import salesRoutes from "./routes/salesRoutes.js";
import axios from "axios";
import asaasWebhookRoutes from "./routes/asaasWebhook.js";

import { processWithdrawQueue } from "./queue/withdrawQueue.js";
setInterval(() => {
  processWithdrawQueue();
}, 3000);



const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(
  "/stripe/webhook",
  express.raw({
    type: "application/json",
  })
);



/* =========================
   DATABASE
========================= */

connectDB();

/* =========================
   ROUTES
========================= */
app.use(express.json());
app.use("/stripe", stripeRoutes);
app.use("/campaigns", campaignsRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/withdraw", withdrawRoutes);
app.use("/r", trackingRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/sales", salesRoutes);
app.use("/webhooks/asaas", asaasWebhookRoutes);

/* =========================
   TEST ROUTES
========================= */

app.get("/", (req, res) => {
  res.send("🚀 SaaS Afiliados PRO ONLINE");
});

app.get("/ping", (req, res) => {
  res.json({
    ok: true,
    version: "2026-06-04"
  });
});

app.get("/success", (req, res) => {
  res.send("Pagamento aprovado");
});

app.get("/cancel", (req, res) => {
  res.send("Pagamento cancelado");
});
app.get("/teste-asaas", (req, res) => {
  res.json({ ok: true });
});



app.post("/asaas/webhook", async (req, res) => {
  try {
    console.log("WEBHOOK ASAAS RECEBIDO");
    console.log(req.body);

    const { event, transfer } = req.body;

    if (
      event === "TRANSFER_CREATED" &&
      transfer?.status === "DONE"
    ) {
      const withdraw = await Withdraw.findOne({
        externalId: transfer.id,
      });

      if (withdraw) {
        withdraw.status = "approved";
        withdraw.paidAt = new Date();
        await withdraw.save();

        // 💰 atualiza wallet
        const wallet = await Wallet.findOne({
          userEmail: withdraw.userEmail,
        });

        if (wallet) {
          wallet.pendingBalance -= withdraw.amount;
          wallet.totalWithdrawn += withdraw.amount;
          await wallet.save();
        }

        console.log("✅ SAQUE CONFIRMADO:", withdraw._id);
      }
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.log("❌ WEBHOOK ERROR:", err.message);

    return res.status(500).json({
      error: err.message,
    });
  }
});
/* =========================
   FIX CAMPAIGNS
========================= */

app.get("/fix-campaigns", async (req, res) => {
  try {
    const Campaign =
      (await import("./models/Campaign.js")).default;

    const campaigns = await Campaign.find();

    for (const c of campaigns) {
      if (!c.nome || c.nome === "") {
        c.nome = "Campanha";
      }

      if (
        c.nome &&
        (
          c.nome.startsWith("http://") ||
          c.nome.startsWith("https://")
        )
      ) {
        c.nome = "Campanha";
      }

      if (!c.link || c.link === "") {
        c.link = "https://google.com";
      }

      if ((c.earnings || 0) < 0) {
        c.earnings = 0;
      }

      await c.save({
        validateBeforeSave: false,
      });
    }

    res.json({
      success: true,
      fixed: campaigns.length,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* =========================
   FIX EARNINGS
========================= */

app.get("/fix-earnings", async (req, res) => {
  try {
    const Campaign =
      (await import("./models/Campaign.js")).default;

    const Withdraw =
      (await import("./models/Withdraw.js")).default;

    await Campaign.updateMany(
      {},
      {
        $set: {
          earnings: 0,
          clicks: 0,
          sales: 0,
        },
      }
    );

    await Withdraw.updateMany(
      {},
      {
        $set: {
          amount: 0,
          status: "approved",
        },
      }
    );

    res.json({
      success: true,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* =========================
START SERVER
========================= */

const PORT = process.env.PORT || 3001;



app.get("/teste-transferencia", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.asaas.com/v3/transfers",
      {
        pixAddressKey: "marielsantana@bol.com.br",
        operationType: "PIX",
        value: 0.01
      },
      {
        headers: {
          access_token: process.env.ASAAS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    return res.json(response.data);

  } catch (err) {

    console.log(
      "ASAAS TESTE:",
      err.response?.data || err.message
    );

    return res.status(500).json({
      erro: true,
      resposta: err.response?.data || err.message
    });
  }
});
app.get("/ping", (req, res) => {
  res.json({
    ok: true,
    server: "online"
  });
});

app.get("/ping", (req, res) => {
  res.json({
    ok: true,
    server: "online"
  });
});


app.listen(PORT, () => {
  console.log("🔥 SERVER INICIADO");
  console.log("🚀 PORTA:", PORT);
  console.log("💳 STRIPE ATIVO");
  console.log("📦 CAMPAIGNS ROUTES OK");
});