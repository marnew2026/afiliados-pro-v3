import test from "node:test";
import assert from "node:assert/strict";
import { renderTikTokReviewPage } from "../services/review/TikTokReviewPage.js";

test("pagina de revisao exige login, consentimento e separa rascunho de publicacao", () => {
  const html = renderTikTokReviewPage();
  assert.match(html, /Entrar com segurança/);
  assert.match(html, /Eu revisei este conteúdo e autorizo/);
  assert.match(html, /Enviar como rascunho/);
  assert.match(html, /Publicar no TikTok/);
  assert.match(html, /Quem pode assistir/);
  assert.match(html, /Permitir comentários/);
  assert.match(html, /parceria paga/);
  assert.match(html, /\/channel\/tiktok\/creator-info/);
  assert.match(html, /\/distribution\/tiktok\/draft/);
  assert.match(html, /sessionStorage/);
  assert.doesNotMatch(html, /TIKTOK_CLIENT_SECRET|JWT_SECRET|Bearer [A-Za-z0-9]/);
});
