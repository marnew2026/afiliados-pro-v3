import dotenv from "dotenv";
dotenv.config();

export async function generatePost(productUrl) {
  return `🔥 OFERTA IMPERDÍVEL!

✅ Confira este produto:
${productUrl}

⏳ Promoção por tempo limitado!

👉 Clique agora e veja os detalhes.`;
}