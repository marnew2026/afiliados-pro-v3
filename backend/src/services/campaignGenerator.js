import Campaign from "../../models/Campaign.js";
import { fetchProducts } from "./mlFetcher.js";

export async function generateCampaigns() {
  const queries = [
    "celular",
    "fone bluetooth",
    "airfryer",
    "notebook",
    "tv",
  ];

  for (const q of queries) {
    const products = await fetchProducts(q);

    if (!products.length) continue;

    const top = products.slice(0, 3);

    for (const p of top) {
      await Campaign.create({
        nome: p.title,
        link: p.link,
        earnings: 0,
        clicks: 0,
        active: true,
      });
    }
  }

  console.log("🔥 Campanhas geradas automaticamente");
}