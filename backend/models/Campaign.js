import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
  name: String,
  link: String,
  ownerId: String,
  email: String,
  clicks: { type: Number, default: 0 },
});

export default mongoose.model("Campaign", CampaignSchema);