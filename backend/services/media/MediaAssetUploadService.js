import {
  createPendingMediaAsset,
  markMediaAssetFailed,
  markMediaAssetReady,
} from "./MediaAssetService.js";

import {
  createR2StorageProvider,
} from "./storage/createR2StorageProvider.js";

export async function uploadMediaAsset({
  userId,
  campaignId,
  type,
  source,
  key,
  body,
  contentType,
}) {
  const storage = createR2StorageProvider();

  const mediaAsset = await createPendingMediaAsset({
    userId,
    campaignId,
    type,
    source,
  });

  let uploaded = null;

  try {
    uploaded = await storage.upload({
      key,
      body,
      contentType,
    });

    return await markMediaAssetReady({
      mediaAssetId: mediaAsset._id,
      assetUrl: uploaded.assetUrl,
    });
  } catch (error) {
    if (uploaded?.key) {
      try {
        await storage.remove({
          key: uploaded.key,
        });
      } catch {
        // Nao mascara o erro original.
      }
    }

    try {
      await markMediaAssetFailed({
        mediaAssetId: mediaAsset._id,
        error:
          error?.message ||
          "Falha ao enviar asset para storage.",
      });
    } catch {
      // Nao mascara o erro original.
    }

    throw error;
  }
}
