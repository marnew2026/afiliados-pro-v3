export function buildMessage(campaign) {
  const link = campaign.link || "https://google.com";

  return `🔥 OFERTA IMPERDÍVEL!

✅ Confira este produto:
${link}

⏳ Promoção por tempo limitado!

👉 Clique agora e veja os detalhes.`;
}