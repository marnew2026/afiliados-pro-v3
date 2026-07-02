import axios from "axios";
import {
  getCachedProducts,
  setCachedProducts,
} from "../cache/productCache.js";

const fallbackProducts = [
  {
    title: "Produto em alta no momento",
    price: 99.9,
    link: "https://lista.mercadolivre.com.br",
    thumbnail: "",
  },
];

export async function fetchProducts(query = "celular") {
  try {
    // 🔥 1. CACHE FIRST
    const cached = await getCachedProducts(query);
    if (cached?.length) {
      console.log("⚡ CACHE HIT:", query);
      return cached;
    }

    // 🔥 2. API EXTERNA
    const res = await axios.get(
      "https://api.mercadolibre.com/sites/MLB/search",
      {
        params: { q: query },
        timeout: 8000,
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    );

    const products = (res.data.results || []).map((item) => ({
      title: item.title,
      price: item.price,
      link: item.permalink,
      thumbnail: item.thumbnail,
    }));

    // salva cache
    await setCachedProducts(query, products);

    return products;
  } catch (err) {
    console.log("⚠️ ML FAIL → fallback ativado");

    // 🔥 3. FALLBACK GARANTIDO
    return fallbackProducts;
  }
}