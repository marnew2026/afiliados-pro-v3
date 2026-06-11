import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: String,
    nome: String,
    preco: Number,
    link: String,
    imagem: String,

    commission: { type: Number, default: 0.1 },
    clicks: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);