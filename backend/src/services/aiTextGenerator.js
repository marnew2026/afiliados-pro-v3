import dotenv from "dotenv";


export async function generatePost(productUrl) {
  return `🔥 OFERTA IMPERDÍVEL!

✅ Confira este produto:
${productUrl}

⏳ Promoção por tempo limitado!

👉 Clique agora e veja os detalhes.`;
}