const VALUE_OPTIONS = new Set([
  "campaigns",
  "kael",
  "distribution",
  "dashboard",
  "withdrawals",
  "other",
]);

const DIFFICULTY_OPTIONS = new Set([
  "none",
  "onboarding",
  "campaigns",
  "connections",
  "publishing",
  "understanding_results",
  "other",
]);

export function validateFounderFeedback(body = {}) {
  const value = {
    rating: Number(body.rating),
    wouldRecommend: body.wouldRecommend,
    mostValuable: String(body.mostValuable || "").trim(),
    biggestDifficulty: String(body.biggestDifficulty || "").trim(),
    comment: String(body.comment || "").trim(),
  };

  if (!Number.isInteger(value.rating) || value.rating < 1 || value.rating > 5) {
    return { valid: false, error: "A nota deve estar entre 1 e 5." };
  }
  if (typeof value.wouldRecommend !== "boolean") {
    return { valid: false, error: "Informe se recomendaria o aplicativo." };
  }
  if (!VALUE_OPTIONS.has(value.mostValuable)) {
    return { valid: false, error: "Recurso mais valioso invalido." };
  }
  if (!DIFFICULTY_OPTIONS.has(value.biggestDifficulty)) {
    return { valid: false, error: "Dificuldade informada invalida." };
  }
  if (value.comment.length > 1000) {
    return { valid: false, error: "Comentario excede 1000 caracteres." };
  }

  return { valid: true, value };
}
