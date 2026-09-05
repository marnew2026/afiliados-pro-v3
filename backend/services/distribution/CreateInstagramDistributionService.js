import Campaign from "../../models/Campaign.js";
import ChannelConnection from "../../models/ChannelConnection.js";
import Distribution from "../../models/Distribution.js";
import MediaAsset from "../../models/MediaAsset.js";

function requestError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function createInstagramDistribution({
  userId,
  campaignId,
  mediaAssetId,
  caption,
  hashtags = [],
  cta = "Confira a oferta no link",
  env = process.env,
  campaignModel = Campaign,
  connectionModel = ChannelConnection,
  mediaAssetModel = MediaAsset,
  distributionModel = Distribution,
  scheduler,
  now = () => new Date(),
}) {
  const cleanUserId = String(userId || "").trim();
  const cleanCampaignId = String(campaignId || "").trim();
  const cleanMediaAssetId = String(mediaAssetId || "").trim();
  const cleanCaption = String(caption || "").trim();
  const cleanCta = String(cta || "").trim();
  const baseUrl = String(env.BASE_URL || "").trim().replace(/\/+$/, "");

  if (typeof scheduler !== "function") {
    throw new Error("Agendador de distribuicao nao configurado.");
  }

  if (!cleanUserId || !cleanCampaignId || !cleanMediaAssetId) {
    throw requestError("Usuario, campanha e asset sao obrigatorios.");
  }

  if (!cleanCaption) {
    throw requestError("Legenda do Reel e obrigatoria.");
  }

  if (cleanCaption.length > 1800) {
    throw requestError("Legenda do Reel excede o limite seguro.");
  }

  if (!baseUrl.startsWith("https://")) {
    throw new Error("BASE_URL HTTPS nao configurada.");
  }

  const cleanHashtags = [...new Set(
    (Array.isArray(hashtags) ? hashtags : [])
      .map((value) => String(value || "").trim().replace(/^#+/, ""))
      .filter(Boolean)
  )].slice(0, 10);

  const campaign = await campaignModel.findOne({
    _id: cleanCampaignId,
    userId: cleanUserId,
    active: true,
  });

  if (!campaign) {
    throw requestError("Campanha nao encontrada ou inativa.", 404);
  }

  const mediaAsset = await mediaAssetModel.findOne({
    _id: cleanMediaAssetId,
    userId: cleanUserId,
    campaignId: cleanCampaignId,
    type: "video",
    status: "ready",
  });

  if (!mediaAsset || !String(mediaAsset.assetUrl || "").startsWith("https://")) {
    throw requestError("Video pronto e publico nao encontrado.", 404);
  }

  const connection = await connectionModel.findOne({
    userId: cleanUserId,
    provider: "instagram",
    active: true,
  });

  if (!connection) {
    throw requestError("Conexao ativa do Instagram nao encontrada.");
  }

  const publishAt = now();
  const trackingUrl = `${baseUrl}/campaigns/r/${cleanCampaignId}`;
  const distribution = await distributionModel.create({
    userId: cleanUserId,
    campaignId: cleanCampaignId,
    channel: "instagram",
    source: "manual",
    destinationId: String(connection.destinationId),
    content: {
      text: cleanCaption,
      contentType: "short_video",
      caption: cleanCaption,
      hashtags: cleanHashtags,
      cta: cleanCta,
      media: {
        type: "video",
        aspectRatio: "9:16",
        required: true,
        assetUrl: String(mediaAsset.assetUrl),
      },
      trackingUrl,
    },
    scheduledAt: publishAt,
    status: "scheduled",
  });

  try {
    const queue = await scheduler({
      distributionId: distribution._id,
      scheduledAt: publishAt,
    });

    return { distribution, queue };
  } catch (error) {
    distribution.status = "failed";
    distribution.lastError = "Falha ao agendar publicacao no Instagram.";
    await distribution.save();
    throw error;
  }
}
