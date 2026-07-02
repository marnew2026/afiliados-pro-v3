import { getRedis } from "../lib/redis.js";

const KEY = "ml:products";

export async function getCachedProducts(query) {
  const redis = getRedis();

  const data = await redis.get(`${KEY}:${query}`);
  return data ? JSON.parse(data) : null;
}

export async function setCachedProducts(query, products) {
  const redis = getRedis();

  await redis.set(
    `${KEY}:${query}`,
    JSON.stringify(products),
    {
      EX: 60 * 60 * 6, // 6h
    }
  );
}