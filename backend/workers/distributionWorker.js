import { Worker } from "bullmq";
import { connection } from "../src/lib/bullmqConnection.js";
import { publishDistribution } from "../services/distribution/DistributionService.js";

export const distributionWorker = new Worker(
  process.env.DISTRIBUTION_QUEUE_NAME || "distributions",

  async (job) => {
    const { distributionId } = job.data;

    if (!distributionId) {
      throw new Error("Job de distribuição sem distributionId.");
    }

    console.log(
      "DISTRIBUTION WORKER:",
      job.id,
      distributionId
    );

   const result = await publishDistribution(
  distributionId
);

if (
  result.alreadyPublished === true ||
  result.alreadyProcessing === true
) {
  return {
    success: true,
    distributionId,
    skipped: true,
    reason:
      result.alreadyPublished === true
        ? "already-published"
        : "already-processing",
  };
}

return {
  success: true,
  distributionId,
  skipped: false,
};
  },

  {
    connection,
    concurrency: 1,
  }
);

distributionWorker.on("completed", (job) => {
  console.log(
    "DISTRIBUTION CONCLUIDA:",
    job.id
  );
});

distributionWorker.on("failed", (job, error) => {
  console.error(
    "DISTRIBUTION FALHOU:",
    job?.id,
    error.message
  );
});

distributionWorker.on("error", (error) => {
  console.error(
    "DISTRIBUTION WORKER ERROR:",
    error.message
  );
});