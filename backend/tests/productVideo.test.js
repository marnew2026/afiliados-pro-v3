import test from "node:test";
import assert from "node:assert/strict";
import { validateProductLink, validateProductImage, extractItemId, productFromItem, productFromPage, productPageDestination, resolveMercadoLivreProduct } from "../services/campaigns/MercadoLivreProductResolver.js";
import { wrapVideoText, renderProductVideo } from "../services/media/template/ProductVideoRenderer.js";
import { buildCampaignVideo } from "../services/campaigns/CampaignVideoBuildService.js";
const fixture = { id: "MLB123456", title: "Mouse vertical", status: "active", pictures: [{ secure_url: "https://http2.mlstatic.com/D_NQ_NP_123-O.webp" }], attributes: [] };
test("aceita anuncio completo e link curto; preserva rastreamento", () => {
  assert.equal(validateProductLink("https://meli.la/abc?tag=afiliado").href, "https://meli.la/abc?tag=afiliado");
  assert.equal(extractItemId("https://www.mercadolivre.com.br/p/MLBU123?wid=MLB7159273188"), "MLB7159273188");
  assert.equal(extractItemId("https://produto.mercadolivre.com.br/MLB-123456-mouse"), "MLB123456");
});
test("rejeita URLs locais, credenciais, portas e dominio disfarçado", () => {
  for (const link of ["http://meli.la/a", "https://localhost/a", "https://meli.la.evil.test/a", "https://u:p@meli.la/a", "https://meli.la:123/a", "file:///a"]) assert.throws(() => validateProductLink(link));
  assert.throws(() => validateProductImage("https://evil.test/1.jpg"));
  assert.throws(() => validateProductImage("https://mlstatic.com.evil.test/1.jpg"));
});
test("valida dados do produto e nao inventa imagens", () => {
  assert.equal(productFromItem(fixture, "https://meli.la/a").title, "Mouse vertical");
  assert.throws(() => productFromItem({ ...fixture, pictures: [] }, ""));
  assert.throws(() => productFromItem({ ...fixture, status: "closed" }, ""));
});
test("redirecionamento para host privado e recusado antes da segunda chamada", async () => {
  let calls = 0;
  await assert.rejects(resolveMercadoLivreProduct({ link: "https://meli.la/a", http: { get: async () => { calls++; return { status: 302, headers: { location: "http://127.0.0.1/" } }; } } }));
  assert.equal(calls, 1);
});
test("token de API nunca e enviado no redirecionamento do link curto", async () => {
  const calls = [];
  const product = await resolveMercadoLivreProduct({ link: "https://meli.la/a", accessToken: "secret", http: { get: async (url, opts) => {
    calls.push({url, opts});
    return calls.length === 1 ? { status: 302, headers: { location: "https://produto.mercadolivre.com.br/MLB-123456-mouse" } } : { data: fixture };
  } } });
  assert.equal(product.title, fixture.title);
  assert.equal(calls[0].opts.headers, undefined);
  assert.equal(calls[1].opts.headers.Authorization, "Bearer secret");
});
test("erro de acesso ao Mercado Livre e acionavel", async () => {
  await assert.rejects(resolveMercadoLivreProduct({ link: "https://produto.mercadolivre.com.br/MLB-123456-mouse", http: { get: async () => { throw { response: { status: 403 } }; } } }), /MERCADO_LIVRE_ACCESS_TOKEN/);
});
test("texto de titulo limitado e com quebras", () => {
  assert.ok(wrapVideoText("Mouse vertical ergonomico bluetooth recarregavel").includes("\n"));
  assert.ok(wrapVideoText("a".repeat(1000)).length <= 160);
});
function buildDependencies(overrides = {}) {
  const task = { _id: "task", userId: "user", campaignId: "campaign", link: "https://meli.la/affiliate", status: "queued", save: async () => {} };
  const deps = { taskId: "task", taskModel: { findById: async () => task },
    campaignModel: { findOneAndUpdate: async (query, update) => {
      assert.equal(query.userId, "user"); assert.equal(update.$setOnInsert.link, task.link);
      return { active: true, status: "active" };
    }, findOne: async () => ({ active: true }) }, resolver: async () => productFromItem(fixture, ""),
    renderer: async () => ({ body: Buffer.from("video") }), readyFinder: async () => null,
    uploader: async input => { assert.equal(input.source, "kael"); return { _id: "asset" }; }, ...overrides };
  return { task, deps };
}
test("campanha e video prontos mantem link de afiliado e propriedade", async () => {
  const { task, deps } = buildDependencies();
  assert.equal((await buildCampaignVideo(deps)).mediaAssetId, "asset");
  assert.equal(task.status, "ready");
});
test("retomada reutiliza video pronto sem renderizar outra vez", async () => {
  const { deps } = buildDependencies({ readyFinder: async () => ({ _id: "existing" }), renderer: async () => { throw new Error("nao deve renderizar"); } });
  assert.equal((await buildCampaignVideo(deps)).mediaAssetId, "existing");
});
test("falha de geracao fica persistida sem indicar pronto", async () => {
  const { task, deps } = buildDependencies({ renderer: async () => { throw new Error("FFmpeg indisponivel"); } });
  await assert.rejects(buildCampaignVideo(deps), /FFmpeg/);
  assert.equal(task.status, "failed");
});
test("arquivamento durante renderizacao impede upload", async () => {
  const { task, deps } = buildDependencies({ campaignModel: { findOneAndUpdate: async () => ({ active: true, status: "active" }), findOne: async () => null }, uploader: async () => { throw new Error("upload nao deve acontecer"); } });
  await assert.rejects(buildCampaignVideo(deps), /arquivada/); assert.equal(task.status, "failed");
});

test("usa apenas produto estruturado real como alternativa a API", () => {
  const html = '<script type="application/ld+json">'+JSON.stringify({"@type":"Product", name:"Mouse", image:fixture.pictures[0].secure_url})+'</script>';
  assert.equal(productFromPage(html, "https://produto.mercadolivre.com.br/MLB-123456-mouse").title, "Mouse");
  assert.throws(() => productFromPage('<title>Faça login</title>', ""));
});

import { campaignVideoTaskView } from "../services/campaigns/CampaignVideoTaskView.js";
test("falha intermediaria aparece como fila durante repeticao automatica", async () => {
  const task = { _id:"task", campaignId:"campaign", status:"failed", lastError:"falha temporaria" };
  assert.equal((await campaignVideoTaskView(task, async () => ({getState:async () => "delayed"}))).status, "queued");
  assert.equal((await campaignVideoTaskView(task, async () => ({getState:async () => "active"}))).status, "processing");
  assert.equal((await campaignVideoTaskView(task, async () => ({getState:async () => "failed"}))).status, "failed");
});

test("le canonical com href antes de rel e entidades HTML", () => {
  const url = productPageDestination('<link href="https://www.mercadolivre.com.br/p/MLB999?wid=MLB123456&amp;tag=affiliate" rel="canonical">', "https://meli.la/abc");
  assert.equal(extractItemId(url.href), "MLB123456");
  assert.equal(url.searchParams.get("tag"), "affiliate");
});
test("le meta refresh sem depender da ordem dos atributos", () => {
  const url = productPageDestination('<meta content="0; URL=https://produto.mercadolivre.com.br/MLB-123456-mouse" http-equiv="refresh">', "https://meli.la/abc");
  assert.equal(extractItemId(url.href), "MLB123456");
});
test("le apenas URL literal no redirecionamento JavaScript", () => {
  assert.equal(extractItemId(productPageDestination('<script>window.location.replace("https://produto.mercadolivre.com.br/MLB-123456-mouse");</script>', "https://meli.la/a")), "MLB123456");
  assert.equal(productPageDestination('<script>window.location = executeFunction();</script>', "https://meli.la/a"), null);
});
test("redirecionamento HTML para rede privada e recusado", () => {
  assert.throws(() => productPageDestination('<meta http-equiv="refresh" content="0;url=http://127.0.0.1/">', "https://meli.la/a"));
});
test("link curto com canonical reverso chega ao anuncio e preserva token", async () => {
  const calls = [];
  const result = await resolveMercadoLivreProduct({ link: "https://meli.la/2PnchjZ", accessToken: "secret", http: { get: async (url, options) => {
    calls.push({url, options});
    return calls.length === 1 ? {status:200, headers:{}, data:'<link href="https://produto.mercadolivre.com.br/MLB-123456-mouse" rel="canonical">'} : {data:fixture};
  } } });
  assert.equal(result.itemId, "MLB123456");
  assert.equal(calls[0].options.headers, undefined);
  assert.equal(calls[1].options.headers.Authorization, "Bearer secret");
});
test("produto publico de catalogo nao exige item_id para montar video", async () => {
  const data = '<script type="application/ld+json">'+JSON.stringify({"@type":"Product", name:"Mouse", image:fixture.pictures[0].secure_url})+'</script>';
  let count = 0;
  const result = await resolveMercadoLivreProduct({link:"https://meli.la/a", http:{get:async () => { count++; return {status:200, headers:{}, data}; }}});
  assert.equal(result.title, "Mouse"); assert.equal(result.images.length, 1); assert.equal(count, 1);
});
test("ciclo de redirecionamentos termina sem chamadas ilimitadas", async () => {
  let count = 0;
  await assert.rejects(resolveMercadoLivreProduct({link:"https://meli.la/a", http:{get:async () => {count++;return {status:302,headers:{location:"https://meli.la/a"}};}}}), /ciclo/);
  assert.equal(count, 1);
});
test("pagina com varios produtos nao escolhe o primeiro anuncio", () => {
  const list = [{"@type":"Product", name:"Mouse", image:fixture.pictures[0].secure_url}, {"@type":"Product", name:"Teclado", image:fixture.pictures[0].secure_url}];
  assert.throws(() => productFromPage('<script type="application/ld+json">'+JSON.stringify(list)+'</script>', "https://meli.la/a"), /varios produtos/);
});

const socialPage = `<meta property="og:title" content="Vara de pesca">
<noscript><meta http-equiv="refresh" content="0;URL=https://www.mercadolivre.com.br/gz/webdevice/config"></noscript>
<meta property="og:url" content="https://www.mercadolivre.com.br/social/exemplo">
<img class="poly-component__picture" alt="Vara de pesca" src="https://http2.mlstatic.com/vara.webp">
<a class="poly-component__title" href="https://www.mercadolivre.com.br/up/MLBU3425941263?wid=MLB4211228077">Vara de pesca</a>
<a class="poly-component__title" href="https://www.mercadolivre.com.br/up/MLBU999?wid=MLB999">Outro produto</a>`;
test("ignora refresh de configuracao dentro de noscript", () => {
  assert.equal(productPageDestination(socialPage, "https://www.mercadolivre.com.br/social/exemplo").pathname, "/social/exemplo");
});
test("perfil afiliado escolhe somente cartao que corresponde ao titulo compartilhado", () => {
  const product = productFromPage(socialPage, "https://www.mercadolivre.com.br/social/exemplo");
  assert.equal(product.itemId, "MLB4211228077");
  assert.equal(product.title, "Vara de pesca");
  assert.deepEqual(product.images, ["https://http2.mlstatic.com/vara.webp"]);
});
test("perfil com titulo ambiguo ou imagem diferente nao escolhe produto", () => {
  assert.throws(() => productFromPage(socialPage + '<a class="poly-component__title" href="https://www.mercadolivre.com.br/MLB-888-produto">Vara de pesca</a>', "https://www.mercadolivre.com.br/social/exemplo"));
  assert.throws(() => productFromPage(socialPage.replace('alt="Vara de pesca"','alt="Outra imagem"'), "https://www.mercadolivre.com.br/social/exemplo"));
});
test("link curto de perfil resolve produto sem seguir configuracao nem consultar API", async () => {
  const calls = [];
  const product = await resolveMercadoLivreProduct({link: "https://meli.la/exemplo", http: {get: async url => {
    calls.push(url);
    return calls.length === 1 ? {status:301,headers:{location:"https://www.mercadolivre.com.br/social/exemplo"}} : {status:200,headers:{},data:socialPage};
  }}});
  assert.equal(calls.length,2);
  assert.equal(product.itemId,"MLB4211228077");
  assert.match(product.resolvedUrl,/wid=MLB4211228077/);
});

const featuredPage = `<meta property="og:title" content="Kit 5 Faixa Elastica">
<div class="poly-card poly-card--list"><img class="poly-component__picture" alt="Kit 5 Faixa Elastica" src="https://http2.mlstatic.com/featured.webp">
<a class="poly-component__title" href="https://www.mercadolivre.com.br/p/MLB74751223?wid=MLB7071403358#c_id=/home/card-featured/element">Kit 5 Faixa Elastica</a></div>
<div class="poly-card poly-card--list"><img class="poly-component__picture" alt="Kit 5 Faixa Elastica" src="https://http2.mlstatic.com/recommendation.webp">
<a class="poly-component__title" href="https://www.mercadolivre.com.br/up/MLBU4309755457?wid=MLB7172748862#c_id=/home/affiliate-profile-recommendations/element">Kit 5 Faixa Elastica</a></div>`;
test("produto compartilhado destacado prevalece sobre recomendacao com mesmo titulo", () => {
  const product = productFromPage(featuredPage, "https://www.mercadolivre.com.br/social/feemdeus");
  assert.equal(product.itemId, "MLB7071403358");
  assert.deepEqual(product.images, ["https://http2.mlstatic.com/featured.webp"]);
});
test("sem destaque explicito permanece seguro diante de titulos iguais", () => {
  assert.throws(() => productFromPage(featuredPage.replace("/home/card-featured/element", "/home/affiliate-profile-recommendations/element"), "https://www.mercadolivre.com.br/social/feemdeus"));
});
