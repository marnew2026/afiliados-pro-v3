import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  userEmail: String,
  nome: String,
  preco: String,
  link: String,
  imagem: String,
  affiliateLink: String,

  clicks: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("Campaign", CampaignSchema);