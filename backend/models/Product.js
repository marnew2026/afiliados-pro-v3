import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userEmail: String,
    nome: String,
    preco: String,
    link: String,
    imagem: String,affiliateLink: {
  type: String,
  default: "",clicks: { type: Number, default: 0 },
},
  },
  { timestamps: true }
);
const codigo = Math.random().toString(36).substring(2, 10);

  `https://afiliados-pro-v3-2.onrender.com/r/${codigo}`;










export default mongoose.model("Product", productSchema);