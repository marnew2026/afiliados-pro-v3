import { safeRedisCall } from "../lib/safeRedisCall.js";

export async function acquireLock(key, ttl = 10000) {
  return await safeRedisCall(async (redis) => {
    const result = await redis.set(key, "1", {
      NX: true,
      PX: ttl,
    });

    return result === "OK";
  });
}

export async function releaseLock(key) {
  return await safeRedisCall(async (redis) => {
    await redis.del(key);
  });
}