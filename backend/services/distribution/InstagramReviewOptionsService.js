import Campaign from "../../models/Campaign.js";
import ChannelConnection from "../../models/ChannelConnection.js";
import MediaAsset from "../../models/MediaAsset.js";

export async function listInstagramReviewOptions({
  userId,
  campaignModel = Campaign,
  connectionModel = ChannelConnection,
  mediaAssetModel = MediaAsset,
}) {
  const cleanUserId = String(userId || "").trim();

  if (!cleanUserId) {
    throw new Error("Usuario nao informado.");
  }

  const [connection, campaigns, assets] = await Promise.all([
    connectionModel
      .findOne({
        userId: cleanUserId,
        provider: "instagram",
        active: true,
      })
      .select("destinationName connectedAt")
      .lean(),
    campaignModel
      .find({ userId: cleanUserId, active: true })
      .select("nome")
      .sort({ createdAt: -1 })
      .lean(),
    mediaAssetModel
      .find({ userId: cleanUserId, type: "video", status: "ready" })
      .select("campaignId createdAt")
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  const campaignNames = new Map(
    campaigns.map((campaign) => [
      String(campaign._id),
      String(campaign.nome || "Campanha"),
    ])
  );

  const options = assets
    .filter((asset) => campaignNames.has(String(asset.campaignId)))
    .map((asset) => ({
      campaignId: String(asset.campaignId),
      mediaAssetId: String(asset._id),
      campaignName: campaignNames.get(String(asset.campaignId)),
      videoCreatedAt: asset.createdAt,
    }));

  return {
    connected: Boolean(connection),
    connection: connection
      ? {
          destinationName: String(
            connection.destinationName || "Conta Instagram"
          ),
          connectedAt: connection.connectedAt,
        }
      : null,
    options,
  };
}
