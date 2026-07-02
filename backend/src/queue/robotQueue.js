import { Queue } from "bullmq";
import { getRedis } from "../lib/redis.js";

const connection = getRedis();

export const robotQueue = new Queue("robotQueue", {
  connection,

  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 3,
  },
});

export async function addRobotJob(data, options = {}) {
  return await robotQueue.add(
    "process-user",
    data,
    options
  );
}