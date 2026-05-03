import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: String,
    link: String,
    clicks: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);