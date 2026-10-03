import axios from "axios";

const pageHosts = new Set(["meli.la", "mercadolivre.com.br", "www.mercadolivre.com.br", "produto.mercadolivre.com.br"]);
export function validateProductLink(value) {
  let url;
  try { url = new URL(String(value || "").trim()); } catch { throw new Error("Link do produto invalido."); }
  if (url.protocol !== "https:" || url.username || url.password || url.port || !pageHosts.has(url.hostname)) {
    throw new Error("Nesta etapa, use um link HTTPS do Mercado Livre ou meli.la.");
  }
  if (url.href.length > 2048) throw new Error("Link muito longo.");
  return url;
}
export function validateProductImage(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.port ||
      !/^(?:[a-z0-9-]+\.)*mlstatic\.com$/.test(url.hostname)) {
    throw new Error("Imagem do produto fora do dominio permitido.");
  }
  return url.href;
}
function decodeHtml(value) {
  return String(value).replace(/&(?:amp|quot|apos|lt|gt|#x[0-9a-f]+|#\d+);/gi, entity => {
    const name = entity.slice(1, -1).toLowerCase();
    const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" };
    if (name in named) return named[name];
    const point = name.startsWith("#x") ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
  });
}
function decodeUrl(value) {
  let text = decodeHtml(value);
  for (let i = 0; i < 2; i++) {
    try { const decoded = decodeURIComponent(text); if (decoded === text) break; text = decoded; }
    catch { break; }
  }
  return text;
}
export function extractItemId(value) {
  const text = decodeUrl(value);
  const query = text.match(/(?:[?&#;]|\b)(?:item_id|wid)[=:]\s*(MLB-?\d+)\b/i);
  const path = text.match(/\/MLB-?(\d+)(?:[-/?#]|$)/i);
  return query?.[1]?.replace("-", "").toUpperCase() || (path ? `MLB${path[1]}` : null);
}
function htmlAttributes(tag) {
  const attrs = {};
  for (const match of tag.matchAll(/([a-z_:][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
    attrs[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4]);
  }
  return attrs;
}
export function productPageDestination(html, currentUrl) {
  html = String(html).replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "");
  const tags = [...String(html).matchAll(/<(?:link|meta)\b[^>]*>/gi)].map(match => htmlAttributes(match[0]));
  const refresh = tags.find(attrs => attrs["http-equiv"]?.toLowerCase() === "refresh");
  const refreshUrl = refresh?.content?.match(/(?:^|;)\s*url\s*=\s*(.+)$/i)?.[1]?.replace(/^['"]|['"]$/g, "");
  const canonical = tags.find(attrs => attrs.rel?.toLowerCase().split(/\s+/).includes("canonical"))?.href;
  const ogUrl = tags.find(attrs => attrs.property?.toLowerCase() === "og:url")?.content;
  // Le apenas destinos literais; nao executa JavaScript da loja.
  const literalRedirect = String(html).match(/(?:window\.|document\.)?location(?:\.href)?\s*=\s*(["'])(https:[^"']+)\1/i)?.[2]
    || String(html).match(/(?:window\.|document\.)?location\.(?:replace|assign)\(\s*(["'])(https:[^"']+)\1\s*\)/i)?.[2];
  const target = refreshUrl || canonical || ogUrl || literalRedirect;
  return target ? validateProductLink(new URL(decodeHtml(target), currentUrl).href) : null;
}
function wrappedDestination(url) {
  for (const key of ["url", "target", "redirect", "destination"]) {
    const value = url.searchParams.get(key);
    if (value && /^https?:/i.test(decodeUrl(value))) return validateProductLink(decodeUrl(value));
  }
  return null;
}
export function productFromItem(data, resolvedUrl) {
  const title = String(data?.title || "").trim().slice(0, 160);
  const images = [...new Set((data?.pictures || []).map(p => p.secure_url || p.url))]
    .filter(Boolean).map(value => validateProductImage(String(value).replace(/^http:/, "https:"))).slice(0, 5);
  if (!title || !images.length || data.status !== "active") {
    throw new Error("Produto sem titulo/imagens ou anuncio inativo. Nenhuma campanha criada.");
  }
  return { provider: "mercadolivre", itemId: data.id, title, images, resolvedUrl,
    fetchedAt: new Date(), attributes: (data.attributes || [])
      .filter(a => ["BRAND", "MODEL", "COLOR"].includes(a.id) && a.value_name)
      .map(a => `${a.name}: ${a.value_name}`).slice(0, 3) };
}
function socialProductFromPage(html, resolvedUrl) {
  if (!new URL(resolvedUrl).pathname.startsWith("/social/")) return null;
  const normalize = value => decodeHtml(value).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  const metadata = [...String(html).matchAll(/<meta\b[^>]*>/gi)].map(match => htmlAttributes(match[0]));
  const title = metadata.find(attrs => attrs.property?.toLowerCase() === "og:title")?.content;
  if (!title) return null;
  const matches = new Map();
  const featured = new Map();
  for (const match of String(html).matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = htmlAttributes(match[1]);
    if (!attrs.class?.split(/\s+/).includes("poly-component__title") || normalize(match[2]) !== normalize(title)) continue;
    const target = validateProductLink(new URL(attrs.href, resolvedUrl).href);
    const id = extractItemId(target.href);
    if (id) {
      matches.set(id, target.href);
      // O compartilhamento destaca um anuncio; recomendacoes podem repetir o titulo.
      const marker = target.searchParams.get("c_id") ||
        new URLSearchParams(target.hash.slice(1)).get("c_id");
      if (marker === "/home/card-featured/element") {
        const before = String(html).slice(0, match.index);
        const cards = [...before.matchAll(/<div\b[^>]*class=["'][^"']*\bpoly-card\s[^"']*["'][^>]*>/gi)];
        const start = cards.at(-1)?.index;
        const pictures = start === undefined ? [] : [...before.slice(start).matchAll(/<img\b[^>]*>/gi)]
          .map(image => htmlAttributes(image[0]))
          .filter(attrs => attrs.class?.split(/\s+/).includes("poly-component__picture") && normalize(attrs.alt || "") === normalize(title))
          .map(attrs => ({ secure_url: attrs.src })).filter(picture => picture.secure_url);
        if (pictures.length) featured.set(id, { target: target.href, pictures });
      }
    }
  }
  if (featured.size > 1) return null;
  if (featured.size === 1) {
    const [id, card] = [...featured][0];
    return productFromItem({ id, title: normalize(title), status: "active", pictures: card.pictures, attributes: [] }, card.target);
  }
  if (matches.size !== 1) return null;
  const pictures = [...String(html).matchAll(/<img\b[^>]*>/gi)]
    .map(match => htmlAttributes(match[0]))
    .filter(attrs => attrs.class?.split(/\s+/).includes("poly-component__picture") && normalize(attrs.alt || "") === normalize(title))
    .map(attrs => ({ secure_url: attrs.src })).filter(picture => picture.secure_url);
  if (!pictures.length) return null;
  const [id, target] = [...matches][0];
  return productFromItem({ id, title: normalize(title), status: "active", pictures, attributes: [] }, target);
}
export function productFromPage(html, resolvedUrl) {
  const entries = [];
  for (const match of String(html).matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { entries.push(JSON.parse(match[1])); } catch { /* Outros blocos nao sao produtos. */ }
  }
  const pending = [...entries];
  const products = [];
  while (pending.length) {
    const node = pending.shift();
    if (Array.isArray(node)) { pending.push(...node); continue; }
    if (!node || typeof node !== "object") continue;
    if (node["@graph"]) pending.push(node["@graph"]);
    if (node.mainEntity) pending.push(node.mainEntity);
    const types = [].concat(node["@type"] || []);
    if (!types.some(type => type === "Product" || type === "https://schema.org/Product")) continue;
    const rawImages = [].concat(node.image || []).map(image => typeof image === "string" ? image : image?.url);
    products.push(productFromItem({ id: extractItemId(resolvedUrl), title: node.name, status: "active",
      pictures: rawImages.filter(Boolean).map(secure_url => ({ secure_url })), attributes: [] }, resolvedUrl));
  }
  const unique = [...new Map(products.map(product => [`${product.title}|${product.images.join("|")}`, product])).values()];
  if (unique.length === 1) return unique[0];
  if (unique.length > 1) throw new Error("Pagina com varios produtos. Nao e possivel escolher um anuncio automaticamente.");
  const socialProduct = socialProductFromPage(html, resolvedUrl);
  if (socialProduct) return socialProduct;
  throw new Error("Pagina sem dados estruturados suficientes para montar a campanha.");
}
async function readProductPage({ startUrl, http, allowItemStop }) {
  let url = validateProductLink(startUrl);
  const visited = new Set();
  for (let hop = 0; hop < 8; hop++) {
    if (visited.has(url.href)) throw new Error("O link do produto entrou em um ciclo de redirecionamento.");
    visited.add(url.href);
    const wrapped = wrappedDestination(url);
    if (wrapped && wrapped.href !== url.href) { url = wrapped; continue; }
    if (allowItemStop && extractItemId(url.href)) return { url, itemId: extractItemId(url.href) };
    const response = await http.get(url.href, { maxRedirects: 0, timeout: 15000,
      maxContentLength: 2 * 1024 * 1024, validateStatus: status => status === 200 || (status >= 300 && status < 400) });
    if (response.status >= 300 && response.headers.location) {
      url = validateProductLink(new URL(response.headers.location, url).href); continue;
    }
    if (response.status >= 300) throw new Error("A loja retornou um redirecionamento sem destino.");
    const html = String(response.data);
    // Uma pagina de produto pode ter titulo e imagens reais sem informar um item_id.
    let product;
    try { product = productFromPage(html, url.href); } catch { /* Procura um destino explicito abaixo. */ }
    const destination = productPageDestination(html, url.href);
    if (product) {
      const productUrl = validateProductLink(product.resolvedUrl || (destination || url).href);
      return { url: productUrl, product: { ...product, resolvedUrl: productUrl.href, itemId: extractItemId(productUrl.href) }, itemId: extractItemId(productUrl.href) };
    }
    if (destination && destination.href !== url.href) { url = destination; continue; }
    throw new Error("Nao foi possivel identificar o produto nesta pagina do link curto. A loja nao forneceu um destino ou dados suficientes.");
  }
  throw new Error("O link do produto excedeu o limite de redirecionamentos.");
}
export async function resolveMercadoLivreProduct({ link, http = axios, accessToken = process.env.MERCADO_LIVRE_ACCESS_TOKEN }) {
  const resolved = await readProductPage({ startUrl: link, http, allowItemStop: true });
  if (resolved.product) return resolved.product;
  const { url, itemId } = resolved;
  try {
    const { data } = await http.get(`https://api.mercadolibre.com/items/${itemId}`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      maxRedirects: 0, timeout: 15000, maxContentLength: 2 * 1024 * 1024,
    });
    return productFromItem(data, url.href);
  } catch (error) {
    if ([401, 403].includes(error.response?.status)) {
      try {
        const page = await readProductPage({ startUrl: url.href, http, allowItemStop: false });
        if (page.product) return page.product;
      } catch { /* Mantem a mensagem acionavel sem expor a resposta de autenticacao. */ }
      throw new Error("Nao foi possivel ler os dados publicos deste produto. Configure MERCADO_LIVRE_ACCESS_TOKEN valido para consultar pela API.");
    }
    throw error;
  }
}
