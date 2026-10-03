import test from "node:test";
import assert from "node:assert/strict";
import { validateProductLink, validateProductImage, extractItemId, productFromItem, productFromPage, resolveMercadoLivreProduct } from "../services/campaigns/MercadoLivreProductResolver.js";
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
