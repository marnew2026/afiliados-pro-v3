import test from "node:test";
import assert from "node:assert/strict";
import {
  duplicateWindowMs,
  metricIncrement,
  normalizeEventInput,
  validateEventInput,
} from "../../services/tuai/TuaiEventPolicy.js";

const validProductId = "507f1f77bcf86cd799439011";

test("normaliza evento publico sem aceitar valor financeiro", () => {
  const event = normalizeEventInput({
    productId: ` ${validProductId} `,
    type: " CLICK ",
    sessionId: "sessao-1",
    value: 99,
  });
  assert.equal(event.productId, validProductId);
  assert.equal(event.type, "click");
  assert.deepEqual(metricIncrement(event.type, event.value), { "metrics.clicks": 1 });
});

test("rejeita conversao enviada por origem nao confiavel", () => {
  const result = validateEventInput({
    productId: validProductId,
    type: "conversion",
    sessionId: "sessao-2",
    value: 49.9,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /origem confiavel/);
});

test("aceita conversao confirmada pelo servidor", () => {
  const result = validateEventInput({
    productId: validProductId,
    type: "conversion",
    sessionId: "pedido-123",
    value: 49.9,
  }, { trusted: true });
  assert.equal(result.ok, true);
  assert.deepEqual(metricIncrement("conversion", 49.9), {
    "metrics.conversions": 1,
    "metrics.revenue": 49.9,
  });
});

test("define janela contra repeticao de clique", () => {
  assert.equal(duplicateWindowMs("click"), 30_000);
});
