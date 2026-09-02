import crypto from "crypto";

const ALLOWED_TYPES = new Set([
  "image",
  "video",
]);

const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "mp4",
  "webm",
]);

function normalizeSegment(value, fieldName) {
  const cleanValue = String(
    value || ""
  ).trim();

  if (!cleanValue) {
    throw new Error(
      `${fieldName} nao informado para chave de MediaAsset.`
    );
  }

  if (
    cleanValue.includes("/") ||
    cleanValue.includes("\\")
  ) {
    throw new Error(
      `${fieldName} invalido para chave de MediaAsset.`
    );
  }

  return cleanValue;
}

export function buildMediaAssetKey({
  userId,
  campaignId,
  type,
  extension,
}) {
  const cleanUserId = normalizeSegment(
    userId,
    "userId"
  );

  const cleanCampaignId = normalizeSegment(
    campaignId,
    "campaignId"
  );

  const cleanType = String(
    type || ""
  )
    .trim()
    .toLowerCase();

  if (!ALLOWED_TYPES.has(cleanType)) {
    throw new Error(
      "Tipo invalido para chave de MediaAsset."
    );
  }

  const cleanExtension = String(
    extension || ""
  )
    .trim()
    .toLowerCase()
    .replace(/^\./, "");

  if (!ALLOWED_EXTENSIONS.has(cleanExtension)) {
    throw new Error(
      "Extensao invalida para chave de MediaAsset."
    );
  }

  const assetId = crypto.randomUUID();

  return [
    "users",
    cleanUserId,
    "campaigns",
    cleanCampaignId,
    cleanType,
    `${assetId}.${cleanExtension}`,
  ].join("/");
}
