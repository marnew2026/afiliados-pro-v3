import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

/* ROUTES */
import stripeRoutes from "./routes/stripeRoutes.js";
import campaignsRoutes from "./routes/campaigns.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/admin.js";
import withdrawRoutes from "./routes/withdrawRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";
import salesRoutes from "./routes/salesRoutes.js";

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

app.use(express.json());

/* =========================
   DATABASE
========================= */

connectDB();

/* =========================
   ROUTES
========================= */

app.use("/stripe", stripeRoutes);
app.use("/campaigns", campaignsRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/withdraw", withdrawRoutes);
app.use("/r", trackingRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/sales", salesRoutes);

/* =========================
   TEST ROUTES
========================= */

app.get("/", (req, res) => {
  res.send("🚀 SaaS Afiliados PRO ONLINE");
});

app.get("/success", (req, res) => {
  res.send("Pagamento aprovado");
});

app.get("/cancel", (req, res) => {
  res.send("Pagamento cancelado");
});
app.get("/teste-asaas", async (req, res) => {
  res.json({ ok: true });
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
app.get("/", (req, res) => {
  res.send("SERVIDOR ONLINE");
});

app.get("/teste-asaas", (req, res) => {
  res.json({
    teste: true,
    mensagem: "rota funcionando"
  });
});
app.listen(PORT, () => {
  console.log("🔥 SERVER INICIADO");
  console.log("🚀 PORTA:", PORT);
  console.log("💳 STRIPE ATIVO");
  console.log("📦 CAMPAIGNS ROUTES OK");
});