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
export function extractItemId(value) {
  const text = decodeURIComponent(String(value));
  // Links de catalogo tambem podem trazer item_id/wid do anuncio escolhido.
  const query = text.match(/(?:item_id|wid)[=:](MLB\d+)/i);
  const path = text.match(/\/MLB-?(\d+)(?:[-/?#]|$)/i);
  return query?.[1]?.toUpperCase() || (path ? `MLB${path[1]}` : null);
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
export function productFromPage(html, resolvedUrl) {
  const entries = [];
  for (const match of String(html).matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { entries.push(JSON.parse(match[1])); } catch { /* Outros blocos nao sao produtos. */ }
  }
  const pending = [...entries];
  while (pending.length) {
    const node = pending.shift();
    if (Array.isArray(node)) { pending.push(...node); continue; }
    if (!node || typeof node !== "object") continue;
    if (node["@graph"]) pending.push(node["@graph"]);
    const types = [].concat(node["@type"] || []);
    if (!types.some(type => type === "Product" || type === "https://schema.org/Product")) continue;
    const rawImages = [].concat(node.image || []).map(image => typeof image === "string" ? image : image?.url);
    return productFromItem({ id: extractItemId(resolvedUrl), title: node.name, status: "active",
      pictures: rawImages.filter(Boolean).map(secure_url => ({ secure_url })), attributes: [] }, resolvedUrl);
  }
  throw new Error("Pagina sem dados estruturados suficientes para montar a campanha.");
}
export async function resolveMercadoLivreProduct({ link, http = axios, accessToken = process.env.MERCADO_LIVRE_ACCESS_TOKEN }) {
  let url = validateProductLink(link);
  let itemId = extractItemId(url.href);
  // Cada redirecionamento e validado; nunca envia o token para uma pagina externa.
  for (let hop = 0; !itemId && hop < 6; hop++) {
    const response = await http.get(url.href, { maxRedirects: 0, timeout: 15000,
      maxContentLength: 2 * 1024 * 1024, validateStatus: s => s === 200 || (s >= 300 && s < 400) });
    if (response.status >= 300 && response.headers.location) {
      url = validateProductLink(new URL(response.headers.location, url).href);
      itemId = extractItemId(url.href);
      continue;
    }
    // Um link curto pode usar uma pagina intermediaria com URL canonica.
    const canonical = String(response.data).match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i);
    if (canonical) { url = validateProductLink(canonical[1].replace(/&amp;/g, "&")); itemId = extractItemId(url.href); }
    break;
  }
  if (!itemId) throw new Error("Nao foi possivel identificar o anuncio. Use o link completo do produto com item_id ou wid.");
  try {
    const { data } = await http.get(`https://api.mercadolibre.com/items/${itemId}`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      maxRedirects: 0, timeout: 15000, maxContentLength: 2 * 1024 * 1024,
    });
    return productFromItem(data, url.href);
  } catch (error) {
    if ([401, 403].includes(error.response?.status)) {
      // Usa apenas dados estruturados publicados pela loja; nao contorna login/captcha.
      try {
        const page = await http.get(url.href, { maxRedirects: 0, timeout: 15000, maxContentLength: 2 * 1024 * 1024 });
        return productFromPage(page.data, url.href);
      } catch {
        throw new Error("Nao foi possivel ler os dados publicos deste produto. Configure MERCADO_LIVRE_ACCESS_TOKEN valido para consultar pela API.");
      }
    }
    throw error;
  }
}
