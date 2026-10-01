import {
  runKaelMediaPreparation,
} from "../media/KaelMediaPreparationRunner.js";
import {
  resolveKaelDistributionCreator,
} from "./KaelDistributionCreatorResolver.js";

export async function executeKaelDistribution({
  userId,
  campaign,
  channel,
  content,
  scheduler,
  mediaPreparer = runKaelMediaPreparation,
  distributionCreator,
  creatorResolver = resolveKaelDistributionCreator,
  beforeCreate,
}) {
  const preparation = await mediaPreparer({
    userId,
    campaign,
    content,
  });

  if (preparation?.status === "PENDING") {
    return preparation;
  }

  if (preparation?.status !== "READY") {
    throw new Error(`Estado de preparacao de midia invalido: ${preparation?.status}`);
  }

  const readyContent = preparation.content;

  const creator =
    distributionCreator ||
    creatorResolver({
      channel,
    });

  if (beforeCreate && !(await beforeCreate())) {
    return { success: true, skipped: true, reason: "autopilot_state_changed" };
  }

  return creator({
    userId,
    campaignId: String(campaign?._id || ""),
    mediaAssetId: readyContent?.mediaAssetId,
    caption: readyContent?.caption,
    hashtags: readyContent?.hashtags,
    cta: readyContent?.cta,
    source: "autopilot",
    scheduler,
  });
}
