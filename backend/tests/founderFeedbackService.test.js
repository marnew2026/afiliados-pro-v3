import test from "node:test";
import assert from "node:assert/strict";

import { validateFounderFeedback } from "../services/founding/FounderFeedbackService.js";

test("aceita feedback fundador completo e normalizado", () => {
  const result = validateFounderFeedback({
    rating: 5,
    wouldRecommend: true,
    mostValuable: "kael",
    biggestDifficulty: "none",
    comment: "  Muito bom.  ",
  });

  assert.equal(result.valid, true);
  assert.equal(result.value.comment, "Muito bom.");
});

test("rejeita nota, opcoes e comentario fora dos limites", () => {
  assert.equal(validateFounderFeedback({ rating: 6 }).valid, false);
  assert.equal(validateFounderFeedback({
    rating: 5,
    wouldRecommend: true,
    mostValuable: "segredo",
    biggestDifficulty: "none",
  }).valid, false);
  assert.equal(validateFounderFeedback({
    rating: 5,
    wouldRecommend: true,
    mostValuable: "kael",
    biggestDifficulty: "none",
    comment: "x".repeat(1001),
  }).valid, false);
});
