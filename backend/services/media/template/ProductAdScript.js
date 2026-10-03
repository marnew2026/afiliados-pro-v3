const clean = value => String(value || "").replace(/[\x00-\x1f\x7f]/g, " ").replace(/\s+/g, " ").trim();
const fold = value => clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function brief(value, limit = 66) {
  const text = clean(value);
  if (text.length <= limit) return text;
  return text.slice(0, limit).replace(/\s+\S*$/, "") + "…";
}
const profiles = [
  { key: "fitness", match: /\b(?:faixa elastica|faixas elasticas|mini band|super band|extensor|extersor)\b/, opening: "Conheça seu próximo kit de treino", accent: "0x50E3C2", background: "0x101F24", tag: "treino" },
  { key: "fishing", match: /\b(?:vara de pesca|molinete|carretilha)\b/, opening: "Para sua próxima pescaria", accent: "0x50E3C2", background: "0x101F24", tag: "pesca" },
  { key: "footwear", match: /\b(?:tenis|sapato|sapatilha|sandalia|chinelo)\b/, opening: "Veja de perto cada detalhe", accent: "0xFBBF24", background: "0x201B16", tag: "calcados" },
  { key: "technology", match: /\b(?:mouse|teclado|fone|celular|smartphone|notebook)\b/, opening: "Tecnologia nos detalhes", accent: "0x60A5FA", background: "0x101827", tag: "tecnologia" },
  { key: "home", match: /\b(?:panela|airfryer|cafeteira|lavadora|luminaria|aspirador)\b/, opening: "Uma novidade para sua casa", accent: "0xFB923C", background: "0x251A17", tag: "casa" },
];
export function buildProductAdScript(product) {
  const title = clean(product?.title).slice(0, 160);
  if (!title || !Array.isArray(product.images) || !product.images.length) throw new Error("Produto sem titulo ou imagem para criar anuncio.");
  const profile = profiles.find(item => item.match.test(fold(title))) || { key: "general", opening: "Veja esta seleção", accent: "0xA78BFA", background: "0x101827", tag: "produtos" };
  const fitness = profile.key === "fitness";
  const quantity = title.match(/\bkit\s*(?:com\s*)?(\d{1,2})\b/i)?.[1];
  const fishing = /\bvara de pesca\b/.test(fold(title));
  const strength = title.match(/\b(\d{1,3})\s*lbs\b/i)?.[1];
  const reel = /\bcom molinete\b/.test(fold(title));
  const line = /\b(?:com|e) linha\b/.test(fold(title));
  const attributes = (product.attributes || []).map(clean).filter(Boolean).slice(0, 3);
  const fitnessFacts = [quantity ? `Kit com ${quantity} faixas` : "Faixas elásticas", /\bcolorid/.test(fold(title)) ? "Faixas coloridas" : "", /\b(?:treino|academia)\b/.test(fold(title)) ? "Para treino" : ""].filter(Boolean);
  const facts = fitness ? fitnessFacts : fishing ? [strength ? `Vara de ${strength} libras` : "Vara de pesca", reel ? "Com molinete" : "", line ? "Com linha" : ""].filter(Boolean) : attributes;
  const name = fitness ? "Kit de faixas elásticas" : fishing ? "Vara de pesca" : brief(title);
  const featureSpeech = facts.length ? facts.join(". ") + "." : "Veja os detalhes nas imagens deste anúncio.";
  const scenes = [
    { headline: profile.opening, detail: name, speech: fitness ? `Conheça este kit de faixas elásticas${quantity ? `, com ${quantity} faixas` : ""}.` : fishing ? "Preparando sua próxima pescaria? Conheça esta vara de pesca." : `${profile.opening}. ${brief(title, 100)}.`, imageIndex: 0, layout: "hero" },
    { headline: facts[0] || "O produto de perto", detail: facts.slice(1).join(" • ") || "Detalhes do anúncio", speech: featureSpeech, imageIndex: Math.min(1, product.images.length - 1), layout: "detail" },
    { headline: fitness ? "Conheça o kit" : fishing ? "Confira o conjunto" : "Mais um olhar", detail: fishing ? [reel ? "Molinete" : "", line ? "Linha" : ""].filter(Boolean).join(" + ") || "Veja os itens do anúncio" : "Imagens do produto anunciado", speech: fitness ? "Confira as medidas e as características de cada faixa na página do produto." : fishing ? "Veja as fotos do produto e confira os itens do anúncio." : "Veja mais detalhes do produto. Confira as características e as condições na página do vendedor.", imageIndex: Math.min(2, product.images.length - 1), layout: "showcase" },
    { headline: "Gostou? Confira o produto", detail: "Acesse o link da campanha", speech: "Gostou? Acesse o link da campanha para conferir os detalhes. Conteúdo de afiliado.", imageIndex: Math.min(3, product.images.length - 1), layout: "closing" },
  ];
  return { version: "narrated_v3", category: profile.key, theme: { accent: profile.accent, background: profile.background }, title, scenes,
    hashtags: [profile.tag, "ConteudoDeAfiliado"], caption: `${title}.${facts.length ? " " + facts.join(". ") + "." : ""} Confira os detalhes no link da campanha. Conteúdo de afiliado.` };
}
// Sincronizacao por frases estimada pela duracao da voz. Nao e alinhamento palavra a palavra.
export function buildPhraseCaptions(speech, durationSeconds) {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) throw new Error("Duracao de legenda invalida.");
  const words = clean(speech).split(" ").filter(Boolean), chunks = [];
  let line = "";
  for (const word of words) {
    if (line && (line + " " + word).length > 58) { chunks.push(line); line = word; }
    else line += (line ? " " : "") + word;
  }
  if (line) chunks.push(line);
  const total = chunks.reduce((n, chunk) => n + chunk.length, 0);
  let cursor = .1;
  return chunks.map(chunk => {
    const start = cursor; cursor += durationSeconds * chunk.length / total;
    return { text: chunk, start, end: cursor };
  });
}
