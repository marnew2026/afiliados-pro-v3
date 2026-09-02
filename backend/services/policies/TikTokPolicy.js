import { normalizeShortVideoContent } from "./ShortVideoPolicyBase.js";
const TIKTOK_CHANNEL = "tiktok";

export function applyTikTokPolicy({
  content,
  trackingUrl = "",
}) {
  if (!content) {
    throw new Error(
      "Conteudo nao informado para TikTokPolicy."
    );
  }

  if (content.channel !== TIKTOK_CHANNEL) {
    throw new Error(
      `TikTokPolicy recebeu canal invalido: ${content.channel}`
    );
  }

  if (content.contentType !== "short_video") {
    throw new Error(
      "TikTokPolicy exige conteudo do tipo short_video."
    );
  }

  const normalizedContent =
    normalizeShortVideoContent({
      content,
      trackingUrl,
    });

  return {
    channel: TIKTOK_CHANNEL,
    contentType: "short_video",

    ...normalizedContent,
  };
}
