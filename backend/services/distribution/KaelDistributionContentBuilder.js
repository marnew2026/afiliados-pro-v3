import {
  buildKaelContent,
} from "../content/KaelContentEngine.js";

import {
  resolveKaelMedia,
} from "../media/KaelMediaResolver.js";

export async function buildKaelDistributionContent({
  userId,
  campaign,
  channel,
  trackingUrl = "",
}) {
  if (!userId) {
    throw new Error(
      "userId nao informado ao KAEL Distribution Content Builder."
    );
  }

  if (!campaign?._id) {
    throw new Error(
      "Campanha invalida para o KAEL Distribution Content Builder."
    );
  }

  const kaelContent = buildKaelContent({
    campaign,
    channel,
  });

  const resolvedContent = await resolveKaelMedia({
    userId,
    campaignId: campaign._id,
    content: kaelContent,
  });

  return {
    title: resolvedContent.title,
    text: resolvedContent.text,
    contentType: resolvedContent.contentType,
    caption: resolvedContent.caption,
    hashtags: resolvedContent.hashtags,
    cta: resolvedContent.cta,
    media: {
      type: resolvedContent.media?.type,
      aspectRatio:
        resolvedContent.media?.aspectRatio,
      required:
        resolvedContent.contentType ===
        "short_video",
      assetUrl:
        resolvedContent.media?.assetUrl || "",
    },
    trackingUrl: String(
      trackingUrl || ""
    ).trim(),
  };
}
