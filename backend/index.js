import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { runTest } from "./src/cron/scheduler.js";
console.log("🔐 META_TOKEN:", process.env.META_TOKEN ? "OK" : "MISSING");
console.log("🤖 OPENAI_KEY:", process.env.OPENAI_KEY ? "OK" : "MISSING");
// depois que o dotenv já carregou
setTimeout(() => {
  runTest();
}, 5000);
import express from "express";
import cors from "cors";
import "./src/cron/scheduler.js";
import connectDB from "./config/db.js";
import Withdraw from "./models/Withdraw.js";
/* ROUTES */
import "./workers/withdrawWorker.js";
import goRoutes from "./routes/go.js";
import campaignsAdmin from "./routes/campaignsAdmin.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import offersRoutes from "./routes/offers.js";
import stripeConnectRoutes from "./routes/stripeConnect.js";
import campaignsRoutes from "./routes/campaigns.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/admin.js";
import withdrawRoutes from "./routes/withdrawRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";
import salesRoutes from "./routes/salesRoutes.js";
import axios from "axios";
import webhookRoutes from "./routes/webhook.js";
import User from "./models/User.js";
import Campaign from "./models/Campaign.js";
import adminWithdrawRoutes from "./routes/adminWithdrawRoutes.js";
import asaasWebhookRoutes from "./routes/asaasWebhook.js";
import Wallet from "./models/Wallet.js";
import { processWithdrawQueue } from "./queue/withdrawQueue.js";
setInterval(() => {
  processWithdrawQueue();
}, 3000);
import LedgerEntry from "./models/LedgerEntry.js";
import { generateCampaigns } from "./src/services/campaignGenerator.js";
import { autoGenerateCampaigns } from "./src/services/mlCampaignAuto.js";
import cron from "node-cron";
setInterval(() => {
  autoGenerateCampaigns();
}, 1000 * 60 * 60 * 6); // a cada 6h



cron.schedule("0 */6 * * *", generateCampaigns);
console.log("VERSION 2026-06-08 18:00");
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
app.use("/offers", offersRoutes);
app.use("/stripe-connect", stripeConnectRoutes);
app.use("/campaigns", campaignsRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/withdraw", withdrawRoutes);
app.use("/r", trackingRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/sales", salesRoutes);
app.use("/webhooks/asaas", asaasWebhookRoutes);
app.use("/admin/campaigns", campaignsAdmin);
app.use("/go", goRoutes);
app.use("/admin/withdrawals", adminWithdrawRoutes);
app.use("/stripe/webhook", webhookRoutes);
/* =========================
   TEST ROUTES
========================= */
app.get("/debug-user/:email", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    const campaigns = await Campaign.find({
      userId: user?._id,
    });

    res.json({
      user,
      campaignsCount: campaigns.length,
      campaigns,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Robô de afiliado rodando 🚀");
});

app.listen(3000, () => console.log("Servidor online"));

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

console.log("📊 DASHBOARD ROUTES OK");
/* =========================
   FIX CAMPAIGNS
========================= */

app.get("/fix-campaigns", async (req, res) => {
  try {
    const Campaign =
      (await import("./models/Campaign.js")).default;

    const campaigns = await Campaign.find({ userId: req.user.id })

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
      status: "paid",
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
        value: 5.00
      },
      {
        headers: {
          access_token: process.env.ASAAS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    console.log("STATUS:", err.response?.status);
    console.log(
      JSON.stringify(err.response?.data, null, 2)
    );

    res.status(500).json(err.response?.data);
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