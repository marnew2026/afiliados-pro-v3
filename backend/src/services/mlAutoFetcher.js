import axios from "axios";

const SEARCHES = [
  "celular",
  "fone bluetooth",
  "airfryer",
  "notebook",
  "tv",
  "caixa de som",
];

export async function fetchAutoProducts() {
  let all = [];

  for (const q of SEARCHES) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${q}`;
    const res = await axios.get(url);

    const products = res.data.results.slice(0, 3);

    all.push(
      ...products.map(p => ({
        title: p.title,
        price: p.price,
        url: p.permalink,
        img: p.thumbnail,
      }))
    );
  }

  return all;
}