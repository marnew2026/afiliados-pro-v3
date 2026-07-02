import { redis } from "../queue/redis.js";

export async function trackEvent(event, data = {}) {
  const payload = {
    event,
    data,
    timestamp: Date.now(),
  };

  await redis.lpush("saas:events", JSON.stringify(payload));
  await redis.ltrim("saas:events", 0, 200);
}