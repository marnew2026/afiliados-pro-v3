import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    userEmail: String,
    nome: String,
    preco: String,
    link: String,
    imagem: String,
    affiliateLink: String,

    commission: {
      type: Number,
      default: 0.1,
    },

    clicks: {
      type: Number,
      default: 0,
    },

    earnings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", CampaignSchema);