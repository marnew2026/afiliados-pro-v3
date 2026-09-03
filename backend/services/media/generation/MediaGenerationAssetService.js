import {
  validateMediaGenerationResult,
} from "./MediaGenerationResultValidator.js";

import {
  downloadGeneratedMedia,
} from "./MediaGenerationDownloadService.js";

export async function prepareGeneratedMediaAsset({
  generationResult,
  downloader = downloadGeneratedMedia,
}) {
  const result = validateMediaGenerationResult(
    generationResult
  );

  const downloaded = await downloader({
    sourceUrl: result.sourceUrl,
  });

  if (
    downloaded.contentType &&
    downloaded.contentType !== result.contentType
  ) {
    throw new Error(
      "Content-Type baixado difere do resultado da geracao."
    );
  }

  return {
    provider: result.provider,
    externalTaskId: result.externalTaskId,
    mediaType: result.mediaType,
    extension: result.extension,
    contentType: result.contentType,
    body: downloaded.body,
    size: downloaded.size,
  };
}
