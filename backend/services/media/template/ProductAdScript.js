const clean = value => String(value || "").replace(/[\x00-\x1f\x7f]/g, " ").replace(/\s+/g, " ").trim();
const fold = value => clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function brief(value, limit = 66) {
  const text = clean(value);
  if (text.length <= limit) return text;
  return text.slice(0, limit).replace(/\s+\S*$/, "") + "…";
}
export function buildProductAdScript(product) {
  const title = clean(product?.title).slice(0, 160);
  if (!title || !Array.isArray(product.images) || !product.images.length) throw new Error("Produto sem titulo ou imagem para criar anuncio.");
  const fishing = /\bvara de pesca\b/.test(fold(title));
  const strength = title.match(/\b(\d{1,3})\s*lbs\b/i)?.[1];
  const reel = /\bcom molinete\b/.test(fold(title));
  const line = /\b(?:com|e) linha\b/.test(fold(title));
  const attributes = (product.attributes || []).map(clean).filter(Boolean).slice(0, 2);
  const facts = fishing ? [strength ? `Vara de ${strength} libras` : "Vara de pesca", reel ? "Com molinete" : "", line ? "Com linha" : ""].filter(Boolean) : attributes;
  const name = fishing ? "Vara de pesca" : brief(title);
  const opening = fishing ? "Para sua próxima pescaria" : "Conheça este produto";
  const featureSpeech = facts.length ? facts.join(". ") + "." : "Veja o produto e confira as informações do anúncio.";
  const scenes = [
    { headline: opening, detail: name, speech: fishing ? "Preparando sua próxima pescaria? Conheça esta vara de pesca." : `Conheça ${brief(title, 90)}.`, imageIndex: 0, layout: "hero" },
    { headline: facts[0] || "Veja os detalhes", detail: facts.slice(1).join(" • ") || (attributes[1] || "Confira as informações do anúncio"), speech: featureSpeech, imageIndex: Math.min(1, product.images.length - 1), layout: "detail" },
    { headline: fishing ? "Confira o conjunto" : "Veja o produto", detail: fishing ? [reel ? "Molinete" : "", line ? "Linha" : ""].filter(Boolean).join(" + ") || "Veja os itens do anúncio" : "Fotos do produto anunciado", speech: "Veja as fotos do produto. Confira os itens, as condições e os detalhes na página do vendedor.", imageIndex: Math.min(2, product.images.length - 1), layout: "showcase" },
    { headline: "Gostou? Confira o produto", detail: "Acesse o link da campanha", speech: "Gostou? Acesse o link da campanha para conferir os detalhes. Conteúdo de afiliado.", imageIndex: 0, layout: "closing" },
  ];
  return { version: "narrated_v2", title, scenes, caption: `${title}. Confira os detalhes no link da campanha. Conteúdo de afiliado.` };
}
