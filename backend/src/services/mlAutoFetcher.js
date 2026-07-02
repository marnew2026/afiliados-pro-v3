import axios from "axios";

const SEARCHES = [
  "celular",
  "fone bluetooth",
  "airfryer",
  "notebook",
  "tv",
  "caixa de som",
];

let lastCall = 0;

export async function fetchAutoProducts() {
  const now = Date.now();

  // cooldown 1 minuto
  if (now - lastCall < 60000) {
    console.log("⛔ ML bloqueado por cooldown");
    return [];
  }

  lastCall = now;

  try {
    let all = [];

    for (const q of SEARCHES) {
      const url =
        `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}`;

      const res = await axios.get(url);

      const products = (res.data.results || []).slice(0, 3);

      all.push(
        ...products.map((p) => ({
          title: p.title,
          price: p.price,
          url: p.permalink,
          img: p.thumbnail,
        }))
      );
    }

    return all;
  } catch (err) {
    console.log("⚠️ ML FAIL → fallback ativado");
    return [];
  }
}