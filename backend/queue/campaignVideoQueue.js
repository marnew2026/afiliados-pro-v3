import { Queue } from "bullmq";
import { connection } from "../src/lib/bullmqConnection.js";
export const campaignVideoQueue = new Queue("kael-campaign-videos", { connection });
export async function enqueueCampaignVideo(taskId) {
  const jobId = String(taskId);
  const previous = await campaignVideoQueue.getJob(jobId);
  if (previous) {
    if (await previous.getState() === "failed") await previous.retry();
    return previous;
  }
  return campaignVideoQueue.add("build-product-video", { taskId: jobId }, {
    jobId, attempts: 2, backoff: { type: "exponential", delay: 15000 },
    // Mantem a identidade do trabalho para impedir duplicacao em repeticoes do POST.
    removeOnComplete: false, removeOnFail: false,
  });
}
