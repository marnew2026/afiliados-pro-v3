import Redis from "ioredis";

let redis;

export function getRedis() {
  if (redis) return redis;

 redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,

    retryStrategy(times) {
        if (times > 20) return null;
        return Math.min(times * 100, 3000);
    },

    tls: process.env.REDIS_URL.startsWith("rediss://")
        ? {}
        : undefined,
});

  redis.on("connect", () => {
  console.log("🔌 CONNECT");
});

redis.on("ready", () => {
  console.log("✅ READY");
});

redis.on("close", () => {
  console.log("❌ CLOSE");
  console.trace("REDIS CLOSE");
});

redis.on("end", () => {
  console.log("❌ END");
  console.trace("REDIS END");
});

redis.on("reconnecting", () => {
  console.log("🔄 RECONNECTING");
});

redis.on("error", (err) => {
  console.log("🔥 REDIS ERROR:", err.message);
});

  return redis;
}