import {
  createPendingMediaAsset,
  markMediaAssetFailed,
  markMediaAssetReady,
} from "./MediaAssetService.js";

import {
  createR2StorageProvider,
} from "./storage/createR2StorageProvider.js";

import {
  buildGeneratedMediaAssetKey,
  buildMediaAssetKey,
} from "./MediaAssetKeyService.js";

import {
  validateMediaAssetInput,
} from "./MediaAssetInputValidator.js";

export async function uploadMediaAsset({
  userId,
  campaignId,
  generationTaskId,
  type,
  source,
  extension,
  body,
  contentType,
}) {
  const validatedInput = validateMediaAssetInput({
    type,
    extension,
    contentType,
  });

  const key = generationTaskId
    ? buildGeneratedMediaAssetKey({
        userId,
        campaignId,
        generationTaskId,
        type: validatedInput.type,
        extension: validatedInput.extension,
      })
    : buildMediaAssetKey({
        userId,
        campaignId,
        type: validatedInput.type,
        extension: validatedInput.extension,
      });

  const storage = createR2StorageProvider();

  const mediaAsset = await createPendingMediaAsset({
    userId,
    campaignId,
    generationTaskId,
    type: validatedInput.type,
    source,
  });

  let uploaded = null;

  try {
    uploaded = await storage.upload({
      key,
      body,
      contentType: validatedInput.contentType,
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
