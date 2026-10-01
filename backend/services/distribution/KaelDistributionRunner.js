import { executeKaelDistribution } from "./KaelDistributionExecutor.js";

// BullMQ is loaded only when a ready Distribution needs scheduling.
export async function scheduleKaelDistribution(input) {
  const { scheduleDistribution } = await import("../../queue/distributionQueue.js");
  return scheduleDistribution(input);
}

export async function runKaelDistribution({
  userId, campaign, channel, content, beforeCreate,
  executor = executeKaelDistribution,
  scheduler = scheduleKaelDistribution,
}) {
  return executor({ userId, campaign, channel, content, scheduler, ...(beforeCreate ? { beforeCreate } : {}) });
}
