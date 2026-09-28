import test from "node:test";
import assert from "node:assert/strict";
import { renderInstagramReviewPage } from "../services/review/InstagramReviewPage.js";

test("pagina de revisao do Instagram exige login, mostra perfil e pede consentimento", () => {
  const html = renderInstagramReviewPage();

  assert.match(html, /Sign in securely/);
  assert.match(html, /Connect Instagram/);
  assert.match(html, /Connected professional profile/);
  assert.match(html, /I reviewed this content and authorize/);
  assert.match(html, /Publish Reel to Instagram/);
  assert.match(html, /\/channel\/instagram\/oauth\/start/);
  assert.match(html, /\/distribution\/instagram\/options/);
  assert.match(html, /\/instagram-review\/publish/);
  assert.doesNotMatch(html, /jsonRequest\('\/distribution\/instagram',/);
  assert.match(html, /location\.assign\(data\.authorizationUrl\)/);
  assert.doesNotMatch(html, /window\.open\(data\.authorizationUrl/);
  assert.match(html, /sessionStorage/);
  assert.doesNotMatch(
    html,
    /INSTAGRAM_APP_SECRET|JWT_SECRET|Bearer [A-Za-z0-9]/
  );
});
