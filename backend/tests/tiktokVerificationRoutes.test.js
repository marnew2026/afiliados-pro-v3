import test from "node:test";
import assert from "node:assert/strict";

import {
  TIKTOK_VERIFICATION_CONTENT,
  TIKTOK_VERIFICATION_FILENAME,
} from "../routes/tiktokVerificationRoutes.js";

test("preserva nome e conteudo exatos da verificacao do TikTok", () => {
  assert.equal(
    TIKTOK_VERIFICATION_FILENAME,
    "tiktokLdygK6cKRFkKjorbh1uoLxyXlXpGlU0Z.txt"
  );

  assert.equal(
    TIKTOK_VERIFICATION_CONTENT,
    "tiktok-developers-site-verification=LdygK6cKRFkKjorbh1uoLxyXlXpGlU0Z"
  );
});
