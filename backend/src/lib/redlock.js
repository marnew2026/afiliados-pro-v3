import Redlock from "redlock";
import { getRedis } from "./redis.js";

let redlock;

async function getRedlock() {
  if (redlock) return redlock;

  const redis = getRedis();

 

  redlock = new Redlock([redis], {
    retryCount: 3,
    retryDelay: 200,
  });

  return redlock;
}

export async function withLock(key, fn) {
    return await fn();
}