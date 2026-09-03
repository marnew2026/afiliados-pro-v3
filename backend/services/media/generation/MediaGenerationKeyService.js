import crypto from "crypto";

export function buildMediaGenerationKey({
  userId,
  campaignId,
  mediaType,
  content,
}) {
  const cleanUserId = String(
    userId || ""
  ).trim();

  const cleanCampaignId = String(
    campaignId || ""
  ).trim();

  const cleanMediaType = String(
    mediaType || ""
  ).trim();

  if (!cleanUserId) {
    throw new Error(
      "Usuario para chave de geracao nao informado."
    );
  }

  if (!cleanCampaignId) {
    throw new Error(
      "Campanha para chave de geracao nao informada."
    );
  }

  if (!cleanMediaType) {
    throw new Error(
      "Tipo de midia para chave de geracao nao informado."
    );
  }

  const generationInput = JSON.stringify({
    userId: cleanUserId,
    campaignId: cleanCampaignId,
    mediaType: cleanMediaType,
    contentType: String(
      content?.contentType || ""
    ).trim(),
    text: String(
      content?.text || ""
    ).trim(),
    caption: String(
      content?.caption || ""
    ).trim(),
    aspectRatio: String(
      content?.media?.aspectRatio || ""
    ).trim(),
  });

  return crypto
    .createHash("sha256")
    .update(generationInput)
    .digest("hex");
}
