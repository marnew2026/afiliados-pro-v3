import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    nome: { type: String, required: true },
    link: { type: String, required: true },
    affiliateLink: { type: String, required: true },

    commission: { type: Number, default: 0.1 },

    clicks: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },

    earnings: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);