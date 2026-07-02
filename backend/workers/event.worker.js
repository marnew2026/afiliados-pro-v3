import "dotenv/config";
import IORedis from "ioredis";
import { Worker } from "bullmq";
import { addEarning } from "../services/walletService.js";
import Conversion from "../models/Conversion.js";

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "events",
  async (job) => {
    const { name, data } = job.data;

    switch (name) {

      case "CONVERSION_CREATED":

        // 🛡️ 1. ID ÚNICO (ANTI DUPLICAÇÃO)
        const exists = await Conversion.findOne({
          externalId: data.externalId,
        });

        if (exists) {
          console.log("⚠️ conversão duplicada bloqueada");
          return;
        }

        // 🧠 2. SCORE SIMPLES DE FRAUDE
        if (data.amount <= 0) {
          console.log("⚠️ valor inválido");
          return;
        }

        if (data.commission > data.amount) {
          console.log("⚠️ comissão inválida");
          return;
        }

        // 🌍 3. SALVA CONVERSÃO SEGURA
        await Conversion.create({
          externalId: data.externalId,
          userId: data.userId,
          campaignId: data.campaignId,
          amount: data.amount,
          commission: data.commission,
          ip: data.ip,
          userAgent: data.userAgent,
        });

        // 💰 4. PAGAMENTO FINAL
        await addEarning(data.userId, data.commission);

        console.log("💰 conversão aprovada:", data.externalId);
        break;
    }
  },
  { connection }
);

console.log("🚀 Worker antifraude rodando");