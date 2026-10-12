import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tuaiRoutes from "./routes/tuaiRoutes.js";

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "64kb" }));

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "tuai-staging" });
});

app.use("/tuai/v1", tuaiRoutes);

app.use((error, _req, res, _next) => {
  console.error("TUAI REQUEST ERROR:", error.name);
  res.status(error.status === 400 ? 400 : 500).json({
    ok: false,
    error: "Nao foi possivel processar a solicitacao."
  });
});

async function start() {
  for (const key of [
    "MONGO_URI",
    "TUAI_EVENT_SECRET",
    "TUAI_SESSION_HASH_SECRET"
  ]) {
    if (!process.env[key]) throw new Error(`Variavel ausente: ${key}`);
  }

  await mongoose.connect(process.env.MONGO_URI);
  const port = Number(process.env.PORT || 10000);
  app.listen(port, "0.0.0.0", () => {
    console.log(`TUAI iniciado na porta ${port}`);
  });
}

start().catch(error => {
  console.error("TUAI BOOT ERROR:", error.name);
  process.exit(1);
});