import test from "node:test";
import assert from "node:assert/strict";
import { inspectAffiliateProduct } from "../../services/tuai/TuaiProductImportService.js";

const resolvedProduct = {
  itemId: "MLB123456789",
  title: "Produto de teste",
  images: ["https://http2.mlstatic.com/test.jpg"],
  resolvedUrl: "https://www.mercadolivre.com.br/MLB-123456789",
};

test("identifica produto usando o resolvedor validado do KAEL", async () => {
  const resolver = async ({ link }) => {
    assert.equal(link, "https://meli.la/2nYj953");
    return resolvedProduct;
  };
  const product = await inspectAffiliateProduct("https://meli.la/2nYj953", { resolver });
  assert.equal(product.title, "Produto de teste");
  assert.equal(product.imageUrl, "https://http2.mlstatic.com/test.jpg");
  assert.equal(product.price, null);
  assert.equal(product.sourceProductId, "MLB123456789");
  assert.equal(product.affiliateUrl, "https://meli.la/2nYj953");
});

test("rejeita dominio nao autorizado antes de chamar o resolvedor", async () => {
  let called = false;
  await assert.rejects(
    () => inspectAffiliateProduct("https://example.com/produto", {
      resolver: async () => { called = true; return resolvedProduct; },
    }),
    /Mercado Livre ou meli.la/
  );
  assert.equal(called, false);
});

test("rejeita produto sem imagem", async () => {
  await assert.rejects(
    () => inspectAffiliateProduct("https://meli.la/2nYj953", {
      resolver: async () => ({ ...resolvedProduct, images: [] }),
    }),
    /titulo e imagem/
  );
});
