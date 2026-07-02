import { Worker } from "bullmq";
import { connection } from "../queue/redis.js";

function createWorker(queueName, concurrency) {
  return new Worker(
    queueName,
    async (job) => {
      console.log(`⚙️ ${queueName} job`, job.data);

      // processa usuário
    },
    {
      connection,
      concurrency
    }
  );
}

export function startCluster() {
  createWorker("low", 1);
  createWorker("medium", 3);
  createWorker("high", 10);

  console.log("🚀 Cluster SaaS iniciado");
}