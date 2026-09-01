const TIKTOK_CHANNEL = "tiktok";
const TIKTOK_ASPECT_RATIO = "9:16";

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

  const caption = String(
    content.caption || ""
  ).trim();

  const cta = String(
    content.cta || ""
  ).trim();

  const hashtags = Array.isArray(content.hashtags)
    ? content.hashtags
        .map((item) => String(item || "").trim())
        .filter(Boolean)
    : [];

  const normalizedTrackingUrl =
    String(trackingUrl || "").trim();

  if (!caption) {
    throw new Error(
      "Legenda vazia para publicacao no TikTok."
    );
  }

  return {
    channel: TIKTOK_CHANNEL,
    contentType: "short_video",

    caption,
    hashtags,
    cta,
    trackingUrl: normalizedTrackingUrl,

    media: {
      type: "video",
      aspectRatio: TIKTOK_ASPECT_RATIO,
      required: true,
    },
  };
}
