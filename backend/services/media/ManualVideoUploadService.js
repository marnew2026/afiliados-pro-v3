import Campaign from "../../models/Campaign.js";
import { uploadMediaAsset } from "./MediaAssetUploadService.js";

export async function uploadManualVideo({
  userId,
  campaignId,
  body,
  campaignModel = Campaign,
  uploader = uploadMediaAsset,
}) {
  const cleanUserId = String(userId || "").trim();
  const cleanCampaignId = String(campaignId || "").trim();

  if (!cleanUserId || !cleanCampaignId) {
    const error = new Error("Usuario ou campanha nao informado.");
    error.statusCode = 400;
    throw error;
  }

  if (!Buffer.isBuffer(body) || body.length === 0) {
    const error = new Error("Arquivo MP4 nao informado.");
    error.statusCode = 400;
    throw error;
  }

  const campaign = await campaignModel.findOne({
    _id: cleanCampaignId,
    userId: cleanUserId,
    active: true,
  });

  if (!campaign) {
    const error = new Error("Campanha nao encontrada ou inativa.");
    error.statusCode = 404;
    throw error;
  }

  return uploader({
    userId: cleanUserId,
    campaignId: cleanCampaignId,
    type: "video",
    source: "upload",
    extension: "mp4",
    body,
    contentType: "video/mp4",
  });
}

