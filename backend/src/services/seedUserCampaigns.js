import Campaign from "../../models/Campaign.js";

export async function seedUserCampaigns(userId) {
  console.log("🔥 SEED INICIADO:", userId);

  const existing = await Campaign.find({ userId });

  console.log("📊 campanhas encontradas:", existing.length);

  if (existing.length > 0) {
    console.log("✅ usuário já possui campanhas");
    return;
  }

  const baseCampaigns = [
    {
      nome: "Celular em Oferta",
      link: "https://lista.mercadolivre.com.br/celular",
    },
    {
      nome: "Fone Bluetooth",
      link: "https://lista.mercadolivre.com.br/fone-bluetooth",
    },
    {
      nome: "Airfryer Promoção",
      link: "https://lista.mercadolivre.com.br/airfryer",
    },
    {
      nome: "Notebook Barato",
      link: "https://lista.mercadolivre.com.br/notebook",
    }
  ];

  const docs = baseCampaigns.map(c => ({
    userId,
    nome: c.nome,
    link: c.link,
    active: true,
    clicks: 0,
    earnings: 0,
    sales: 0,
  }));

  console.log("💾 criando campanhas...");

  await Campaign.insertMany(docs);

  console.log("✅ campanhas criadas");
}