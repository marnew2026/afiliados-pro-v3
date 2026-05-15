import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL);

export const webhookQueue = new Queue("webhooks", {
  connection,
});