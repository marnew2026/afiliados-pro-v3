import { Worker } from "bullmq";
import { connection } from "../lib/bullmqConnection.js";

export const robotWorker = new Worker(
  "robot-queue",
  async (job) => {
    // lógica
  },
  {
    connection,
  }
);