import { normalizeShortVideoContent } from "./ShortVideoPolicyBase.js";

const FACEBOOK_CHANNEL = "facebook";

export function applyFacebookPolicy({
  content,
  trackingUrl = "",
}) {
  if (!content) {
    throw new Error(
      "Conteudo nao informado para FacebookPolicy."
    );
  }

  if (content.channel !== FACEBOOK_CHANNEL) {
    throw new Error(
      `FacebookPolicy recebeu canal invalido: ${content.channel}`
    );
  }

  if (content.contentType !== "short_video") {
    throw new Error(
      "FacebookPolicy exige conteudo do tipo short_video."
    );
  }

  const normalizedContent =
    normalizeShortVideoContent({
      content,
      trackingUrl,
    });

  return {
    channel: FACEBOOK_CHANNEL,
    contentType: "short_video",

    ...normalizedContent,
  };
}
