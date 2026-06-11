import Campaign from "../../models/Campaign.js";
import { fetchAutoProducts } from "./mlAutoFetcher.js";

export async function autoGenerateCampaigns() {
  const products = await fetchAutoProducts();

  for (const p of products) {
    await Campaign.updateOne(
      { link: p.url },
      {
        nome: p.title,
        link: p.url,
        image: p.img,
        active: true,
      },
      { upsert: true }
    );
  }

  console.log("🔥 Campanhas automáticas atualizadas");
}