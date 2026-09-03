import {
  validateMediaAssetInput,
} from "../MediaAssetInputValidator.js";

export function validateMediaGenerationResult(
  result
) {
  if (!result || typeof result !== "object") {
    throw new Error(
      "Resultado de geracao de midia invalido."
    );
  }

  const provider = String(
    result.provider || ""
  ).trim();

  const externalTaskId = String(
    result.externalTaskId || ""
  ).trim();

  const mediaType = String(
    result.mediaType || ""
  )
    .trim()
    .toLowerCase();

  const sourceUrl = String(
    result.sourceUrl || ""
  ).trim();

  const extension = String(
    result.extension || ""
  )
    .trim()
    .toLowerCase()
    .replace(/^\./, "");

  const contentType = String(
    result.contentType || ""
  )
    .trim()
    .toLowerCase();

  if (!provider) {
    throw new Error(
      "Provider de geracao de midia nao informado."
    );
  }

  if (!externalTaskId) {
    throw new Error(
      "Task externa de geracao de midia nao informada."
    );
  }

  if (!sourceUrl) {
    throw new Error(
      "URL da midia gerada nao informada."
    );
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(sourceUrl);
  } catch {
    throw new Error(
      "URL da midia gerada invalida."
    );
  }

  if (
    parsedUrl.protocol !== "https:" &&
    parsedUrl.protocol !== "http:"
  ) {
    throw new Error(
      "Protocolo da URL da midia gerada nao suportado."
    );
  }
  const mediaInput = validateMediaAssetInput({
    type: mediaType,
    extension,
    contentType,
  });

  return {
    provider,
    externalTaskId,
    mediaType: mediaInput.type,
    sourceUrl,
    extension: mediaInput.extension,
    contentType: mediaInput.contentType,
  };
}
