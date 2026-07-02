import { Queue } from "bullmq";
import { getRedis } from "../src/lib/redis.js";

const connection = getRedis();

export const webhookQueue = new Queue("webhooks", {
  connection,
});