import {
  findReadyCampaignVideo,
} from "./MediaAssetService.js";

export async function resolveKaelMedia({
  userId,
  campaignId,
  content,
  mediaAssetFinder = findReadyCampaignVideo,
}) {
  if (!content) {
    throw new Error(
      "Conteudo nao informado ao KAEL Media Resolver."
    );
  }

  if (content.contentType !== "short_video") {
    return content;
  }

  const mediaAsset =
    await mediaAssetFinder({
      userId,
      campaignId,
    });

  if (!mediaAsset) {
    return {
      ...content,
      media: {
        ...content.media,
        assetUrl: "",
      },
    };
  }

  return {
    ...content,
    mediaAssetId: String(mediaAsset._id),
    media: {
      ...content.media,
      assetUrl: mediaAsset.assetUrl,
    },
  };
}
