import test from "node:test";
import assert from "node:assert/strict";
import { renderInstagramReviewPage } from "../services/review/InstagramReviewPage.js";

test("pagina de revisao do Instagram exige login, mostra perfil e pede consentimento", () => {
  const html = renderInstagramReviewPage();

  assert.match(html, /Entrar com segurança/);
  assert.match(html, /Conectar Instagram/);
  assert.match(html, /Perfil profissional conectado/);
  assert.match(html, /Eu revisei este conteúdo e autorizo/);
  assert.match(html, /Publicar Reel no Instagram/);
  assert.match(html, /\/channel\/instagram\/oauth\/start/);
  assert.match(html, /\/distribution\/instagram\/options/);
  assert.match(html, /\/distribution\/instagram/);
  assert.match(html, /sessionStorage/);
  assert.doesNotMatch(
    html,
    /INSTAGRAM_APP_SECRET|JWT_SECRET|Bearer [A-Za-z0-9]/
  );
});
