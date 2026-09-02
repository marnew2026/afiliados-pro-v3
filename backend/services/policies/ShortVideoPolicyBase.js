export function normalizeShortVideoContent({
  content,
  trackingUrl = "",
}) {
  if (!content) {
    throw new Error(
      "Conteudo nao informado para ShortVideoPolicyBase."
    );
  }

  if (content.contentType !== "short_video") {
    throw new Error(
      "ShortVideoPolicyBase exige conteudo do tipo short_video."
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
      "Legenda vazia para conteudo short_video."
    );
  }

  return {
    caption,
    hashtags,
    cta,
    trackingUrl: normalizedTrackingUrl,

    media: {
      type: "video",
      aspectRatio: "9:16",
      required: true,
    },
  };
}
