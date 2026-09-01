import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cron from "node-cron";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import { connection } from "./src/lib/bullmqConnection.js";
// import debugRoutes from "./routes/debug.js";
import goRoutes from "./routes/go.js";
import campaignsRoutes from "./routes/campaigns.js";
// import userRoutes from "./routes/userRoutes.js";
import withdrawRoutes from "./routes/withdrawRoutes.js";
import { initWalletSocket } from "./src/realtime/walletEvents.js";
// import ledgerRoutes from "./routes/ledgerRoutes.js";
import adminWithdrawRoutes from "./routes/adminWithdrawRoutes.js";
import asaasWebhookRoutes from "./routes/asaasWebhookRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import checkoutRoutes from "./routes/checkout.js";
import webhookRoutes from "./routes/webhook.js";
import authRoutes from "./routes/authRoutes.js";
import distributionRoutes from "./routes/distributionRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import autopilotRoutes from "./routes/autopilotRoutes.js";
console.log("#################################");
console.log("INDEX NOVO ATUAL  12/07  17H 45M   ");
console.log("#################################");

// ==========================
// ⚠️ IMPORTS DIFERIDOS (FIX ESM ERROR)
// ==========================
let processWithdrawQueue;
let generateCampaigns;
let autoGenerateCampaigns;

// ==========================
// APP
// ==========================
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use("/stripe/webhook", webhookRoutes);
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
// ROTAS
// app.use("/ledger", ledgerRoutes);
app.use("/go", goRoutes);
app.use("/campaigns", campaignsRoutes);
// app.use("/user", userRoutes);
app.use("/withdraw", withdrawRoutes);
// app.use("/debug", debugRoutes);
app.use("/adminWithdraw", adminWithdrawRoutes);
app.use("/asaas", asaasWebhookRoutes);
app.use("/wallet", walletRoutes);
app.use("/admin/dashboard", adminDashboardRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/auth", authRoutes);
app.use("/distribution", distributionRoutes);
app.use("/channel", channelRoutes);
app.use("/autopilot", autopilotRoutes);
console.log("🔥🔥🔥 AUTH NOVA VERSAO 19-07 CARREGADA");
console.log("✅ app.use('/checkout') registrado");


// ==========================
// STRIPE RETORNOS
// ==========================

app.get("/success", (req, res) => {
  res.send(`
    <h1>✅ Pagamento realizado com sucesso!</h1>
    <p>Agora você já pode voltar para o aplicativo.</p>
  `);
});

app.get("/cancel", (req, res) => {
  res.send(`
    <h1>❌ Pagamento cancelado.</h1>
    <p>Nenhuma cobrança foi realizada.</p>
  `);
});



// ==========================
// BOOTSTRAP
// ==========================
const PORT = process.env.PORT || 3001;

async function bootstrap() {
  console.log("🚀 Iniciando sistema...");

  // DB
  await connectDB();
  console.log("🔥 MongoDB OK");

  // Redis / Bull
  global.bullConnection = connection;
  console.log("BullMQ OK");

  // SOCKET
  initWalletSocket(io);

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) socket.join(userId);
  });

  // ==========================
  // IMPORTS SEGUROS (EVITA ERRO ESM)
  // ==========================
  const withdrawQueue = await import("./queue/withdrawQueue.js");
  const campaignGen = await import("./src/services/campaignGenerator.js");
  const mlCampaign = await import("./src/services/mlCampaignAuto.js");
  const reconciliation = await import( "./src/jobs/reconciliationJob.js");
  const watchdog = await import("./src/jobs/withdrawWatchdog.js");
  const kaelScheduler = await import(
    "./services/autopilot/KaelAutopilotScheduler.js"
  );

  const reconciliationJob = reconciliation.reconciliationJob;
  const withdrawWatchdog = watchdog.withdrawWatchdog;

  const runKaelAutopilotScheduler =
    kaelScheduler.runKaelAutopilotScheduler;
  console.log("🔄 RECONCILIATION RUN");
  processWithdrawQueue = withdrawQueue.processWithdrawQueue;
  generateCampaigns = campaignGen.generateCampaigns;
  autoGenerateCampaigns = mlCampaign.autoGenerateCampaigns;
await import("./workers/distributionWorker.js");
console.log("DISTRIBUTION WORKER CARREGADO");

  console.log("📦 Workers carregados");

  // ==========================
  // JOBS (SEM DUPLICAÇÃO)
  // ==========================

  cron.schedule("*/1 * * * *", async () => {
    await processWithdrawQueue();
  });
  cron.schedule("*/2 * * * *", async () => {
  await reconciliationJob();
  });
  cron.schedule("*/5 * * * *", async () => {
  await withdrawWatchdog();
});
  cron.schedule("0 */6 * * *", async () => {
    await autoGenerateCampaigns();
  });

  if (process.env.KAEL_AUTOPILOT_CRON_ENABLED === "true") {
    cron.schedule("*/15 * * * *", async () => {
      await runKaelAutopilotScheduler();
    });

    console.log("🤖 KAEL AUTOPILOT CRON ATIVO: a cada 15 minutos");
  } else {
    console.log("🤖 KAEL AUTOPILOT CRON DESATIVADO");
  }

  // SERVER
  server.listen(PORT, () => {
    console.log("🚀 SERVER ON PORTA:", PORT);
  });
}

// ==========================
// ERRORS GLOBAL
// ==========================
process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 REJECTION:", err);
});

bootstrap()
  .then(() => console.log("✅ BOOTSTRAP OK"))
  .catch((err) => {
    console.error("FATAL:", err);
    process.exit(1);
  });