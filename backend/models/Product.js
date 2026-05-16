import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userEmail: String,
    nome: String,
    preco: String,
    link: String,
    imagem: String,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);