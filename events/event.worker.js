import { Worker } from "bullmq";
import { addEarning } from "../services/walletService.js";
import Click from "../models/Click.js";

const connection = {
  host: "127.0.0.1",
  port: 6379,
};

const worker = new Worker(
  "events",
  async (job) => {
    const { name, data } = job.data;

    console.log("📩 EVENTO RECEBIDO:", name);

    switch (name) {
      case "CLICK_CREATED":
        console.log("📊 processando click");
        break;

      case "CONVERSION_CREATED": {
        const click = await Click.findOne({
          userId: data.userId,
        }).sort({ createdAt: -1 });

        if (!click) return;

        // 🚫 bloqueio total
        if (click.blocked) {
          console.log("🚫 conversão ignorada (bloqueada)");
          return;
        }

        let commission = data.commission;

        // ⚠️ redução por risco
        if (click.riskScore > 10) {
          commission *= 0.5;
        }

        await addEarning(data.userId, commission);

        console.log("💰 comissão paga:", commission);
        break;
      }

      default:
        console.log("⚠️ evento não tratado:", name);
    }
  },
  { connection }
);

// 🚀 fora do switch (CORRETO)
console.log("🚀 EVENT WORKER RODANDO");