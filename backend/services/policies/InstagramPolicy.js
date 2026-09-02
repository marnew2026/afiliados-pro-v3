import { normalizeShortVideoContent } from "./ShortVideoPolicyBase.js";

const INSTAGRAM_CHANNEL = "instagram";

export function applyInstagramPolicy({
  content,
  trackingUrl = "",
}) {
  if (!content) {
    throw new Error(
      "Conteudo nao informado para InstagramPolicy."
    );
  }

  if (content.channel !== INSTAGRAM_CHANNEL) {
    throw new Error(
      `InstagramPolicy recebeu canal invalido: ${content.channel}`
    );
  }

  if (content.contentType !== "short_video") {
    throw new Error(
      "InstagramPolicy exige conteudo do tipo short_video."
    );
  }

  const normalizedContent =
    normalizeShortVideoContent({
      content,
      trackingUrl,
    });

  return {
    channel: INSTAGRAM_CHANNEL,
    contentType: "short_video",

    ...normalizedContent,
  };
}
