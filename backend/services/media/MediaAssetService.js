import MediaAsset from "../../models/MediaAsset.js";

export async function createPendingMediaAsset({
  userId,
  campaignId,
  generationTaskId = null,
  type,
  source,
}) {
  return MediaAsset.create({
    userId,
    campaignId,
    generationTaskId,
    type,
    source,
    status: "pending",
  });
}

export async function markMediaAssetReady({
  mediaAssetId,
  assetUrl,
}) {
  const cleanAssetUrl = String(
    assetUrl || ""
  ).trim();

  if (!cleanAssetUrl) {
    throw new Error(
      "assetUrl nao informado para MediaAsset."
    );
  }

  const mediaAsset =
    await MediaAsset.findById(mediaAssetId);

  if (!mediaAsset) {
    throw new Error(
      "MediaAsset nao encontrado."
    );
  }

  mediaAsset.status = "ready";
  mediaAsset.assetUrl = cleanAssetUrl;
  mediaAsset.lastError = "";

  await mediaAsset.save();

  return mediaAsset;
}

export async function markMediaAssetFailed({
  mediaAssetId,
  error,
}) {
  const mediaAsset =
    await MediaAsset.findById(mediaAssetId);

  if (!mediaAsset) {
    throw new Error(
      "MediaAsset nao encontrado."
    );
  }

  mediaAsset.status = "failed";
  mediaAsset.lastError = String(
    error?.message || error || "Erro desconhecido."
  ).trim();

  await mediaAsset.save();

  return mediaAsset;
}

export async function findReadyCampaignVideo({
  userId,
  campaignId,
}) {
  const mediaAsset = await MediaAsset.findOne({
    userId,
    campaignId,
    type: "video",
    status: "ready",
    assetUrl: {
      $nin: ["", null],
    },
  }).sort({
    updatedAt: -1,
  });

  return mediaAsset;
}

export async function findMediaAssetByGenerationTask({
  generationTaskId,
}) {
  if (!generationTaskId) {
    return null;
  }

  return MediaAsset.findOne({
    generationTaskId,
  });
}

export async function reserveGeneratedMediaAsset({
  userId,
  campaignId,
  generationTaskId,
  type,
  assetCreator = MediaAsset.create.bind(MediaAsset),
  assetFinder = findMediaAssetByGenerationTask,
}) {
  if (!generationTaskId) {
    throw new Error(
      "generationTaskId nao informado para reserva de MediaAsset."
    );
  }

  try {
    const mediaAsset = await assetCreator({
      userId,
      campaignId,
      generationTaskId,
      type,
      source: "kael",
      status: "pending",
    });

    return {
      mediaAsset,
      acquired: true,
    };
  } catch (error) {
    if (error?.code !== 11000) {
      throw error;
    }

    const mediaAsset =
      await assetFinder({
        generationTaskId,
      });

    if (!mediaAsset) {
      throw error;
    }

    return {
      mediaAsset,
      acquired: false,
    };
  }
}
