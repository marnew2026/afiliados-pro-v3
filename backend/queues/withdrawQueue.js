import { Queue } from "bullmq";
import { redis } from "../config/redis.js";

export const withdrawQueue = new Queue("withdraw", {
  connection: redis,
});