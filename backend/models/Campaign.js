import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
  nome: String,
  link: String,
  active: { type: Boolean, default: true },
  clicks: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  sales: { type: Number, default: 0 }
});

export default mongoose.model("Campaign", CampaignSchema);