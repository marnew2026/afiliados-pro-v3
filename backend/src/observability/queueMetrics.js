import { redis } from "../queue/redis.js";

export async function getQueueMetrics() {
  const waiting = await redis.llen("bull:robot:wait");
  const active = await redis.llen("bull:robot:active");
  const completed = await redis.llen("bull:robot:completed");
  const failed = await redis.llen("bull:robot:failed");

  return {
    waiting,
    active,
    completed,
    failed,
  };
}