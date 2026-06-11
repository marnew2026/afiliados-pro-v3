import axios from "axios";

export async function fetchProducts(query = "celular") {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  const res = await axios.get(url);

  return res.data.results.map(item => ({
    title: item.title,
    price: item.price,
    link: item.permalink,
    thumbnail: item.thumbnail
  }));
}