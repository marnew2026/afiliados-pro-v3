import {
  prepareGeneratedMediaAsset,
} from "./MediaGenerationAssetService.js";

import {
  persistGeneratedMediaAsset,
} from "./MediaGenerationPersistenceService.js";

export async function processGeneratedMedia({
  userId,
  campaignId,
  generationResult,
  downloader,
  uploader,
}) {
  const preparedAsset = await prepareGeneratedMediaAsset({
    generationResult,
    downloader,
  });

  const mediaAsset = await persistGeneratedMediaAsset({
    userId,
    campaignId,
    preparedAsset,
    uploader,
  });

  return {
    generation: {
      provider: preparedAsset.provider,
      externalTaskId: preparedAsset.externalTaskId,
    },
    mediaAsset,
  };
}
