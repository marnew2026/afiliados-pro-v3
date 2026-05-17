import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userEmail: String,
    nome: String,
    preco: String,
    link: String,
    imagem: String,

    affiliateLink: {
      type: String,
      default: "",
    },

    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);