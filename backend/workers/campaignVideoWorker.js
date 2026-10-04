import { Worker, UnrecoverableError } from "bullmq";
import { connection } from "../src/lib/bullmqConnection.js";
import { buildCampaignVideo } from "../services/campaigns/CampaignVideoBuildService.js";
export const campaignVideoWorker = new Worker("kael-campaign-videos", async job => {
  if (process.env.KAEL_PRODUCT_VIDEO_ENABLED !== "true") throw new Error("Montagem automatica de videos desativada.");
  try { return await buildCampaignVideo({ taskId: job.data.taskId }); }
  catch (error) {
    if (error.noAutoRetry) throw new UnrecoverableError(error.message);
    throw error;
  }
}, { connection, concurrency: 1, lockDuration: 120000 });
campaignVideoWorker.on("failed", job => console.warn("KAEL PRODUCT VIDEO: tarefa falhou", job?.id));
campaignVideoWorker.on("error", () => console.warn("KAEL PRODUCT VIDEO: falha de conexao com a fila."));
