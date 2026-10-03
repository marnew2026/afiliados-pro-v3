import mongoose from "mongoose";
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  link: { type: String, required: true },
  linkHash: { type: String, required: true },
  status: { type: String, enum: ["queued", "processing", "ready", "failed"], default: "queued" },
  product: { title: String, provider: String, itemId: String, images: [String],
    resolvedUrl: String, fetchedAt: Date, attributes: [String] },
  mediaAssetId: { type: mongoose.Schema.Types.ObjectId, ref: "MediaAsset" },
  lastError: { type: String, default: "" },
}, { timestamps: true });
schema.index({ userId: 1, linkHash: 1 }, { unique: true });
export default mongoose.model("CampaignVideoTask", schema);
