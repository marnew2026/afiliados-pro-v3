import { Queue } from "bullmq";
import { redis } from "../config/redis.js";

export const stripeQueue = new Queue("stripe-events", {
  connection: redis,
});