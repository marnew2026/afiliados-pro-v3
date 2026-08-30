import { Queue } from "bullmq";
import { connection } from "../src/lib/bullmqConnection.js";

export const distributionQueue = new Queue(
  process.env.DISTRIBUTION_QUEUE_NAME || "distributions",
  {
    connection,
  }
);

export async function scheduleDistribution({
  distributionId,
  scheduledAt,
  attempts = 3,
}) {
  if (!distributionId) {
    throw new Error("distributionId não informado.");
  }

  const publishAt = scheduledAt
    ? new Date(scheduledAt)
    : new Date();

  if (Number.isNaN(publishAt.getTime())) {
    throw new Error("Data de publicação inválida.");
  }

  const delay = Math.max(
    0,
    publishAt.getTime() - Date.now()
  );

  const job = await distributionQueue.add(
    "publish-distribution",
    {
      distributionId: String(distributionId),
    },
    {
      jobId: String(distributionId),

      delay,

      attempts,

      backoff: {
        type: "exponential",
        delay: 5000,
      },

      removeOnComplete: {
        age: 3600,
        count: 1000,
      },

      removeOnFail: {
        age: 86400,
        count: 1000,
      },
    }
  );

  return {
    jobId: job.id,
    delay,
    publishAt,
  };
}