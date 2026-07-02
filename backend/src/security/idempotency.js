import { connection } from "../queue/redis.js";

export async function isProcessed(key) {
  return await connection.get(key);
}

export async function markProcessed(key) {
  await connection.set(key, "1", "EX", 60 * 60); // 1h
}

const cache = new Map();

export function isProcessed(key) {
  return cache.has(key);
}

export function markProcessed(key) {
  cache.set(key, Date.now());
}