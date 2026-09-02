import { normalizeShortVideoContent } from "./ShortVideoPolicyBase.js";

const KWAI_CHANNEL = "kwai";

export function applyKwaiPolicy({
  content,
  trackingUrl = "",
}) {
  if (!content) {
    throw new Error(
      "Conteudo nao informado para KwaiPolicy."
    );
  }

  if (content.channel !== KWAI_CHANNEL) {
    throw new Error(
      `KwaiPolicy recebeu canal invalido: ${content.channel}`
    );
  }

  if (content.contentType !== "short_video") {
    throw new Error(
      "KwaiPolicy exige conteudo do tipo short_video."
    );
  }

  const normalizedContent =
    normalizeShortVideoContent({
      content,
      trackingUrl,
    });

  return {
    channel: KWAI_CHANNEL,
    contentType: "short_video",

    ...normalizedContent,
  };
}
