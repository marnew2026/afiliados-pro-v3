import {
  uploadMediaAsset,
} from "../MediaAssetUploadService.js";

export async function persistGeneratedMediaAsset({
  userId,
  campaignId,
  generationTaskId,
  preparedAsset,
  uploader = uploadMediaAsset,
}) {
  if (!preparedAsset || typeof preparedAsset !== "object") {
    throw new Error(
      "Asset gerado preparado nao informado."
    );
  }

  return await uploader({
    userId,
    campaignId,
    generationTaskId,
    type: preparedAsset.mediaType,
    source: "kael",
    extension: preparedAsset.extension,
    body: preparedAsset.body,
    contentType: preparedAsset.contentType,
  });
}
