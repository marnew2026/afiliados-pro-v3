import { getRedis } from "../lib/redis.js";

export async function track(event, data) {
  const payload = {
    event,
    data,
    timestamp: Date.now(),
  };

  await redis.lPush("metrics", JSON.stringify(payload));
}