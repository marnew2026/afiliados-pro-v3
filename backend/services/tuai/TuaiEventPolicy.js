const PUBLIC_EVENT_TYPES = new Set(["impression", "click", "save"]);
const ALL_EVENT_TYPES = new Set([...PUBLIC_EVENT_TYPES, "conversion"]);

export function normalizeEventInput(input = {}) {
  return {
    productId: String(input.productId || "").trim(),
    type: String(input.type || "").trim().toLowerCase(),
    sessionId: String(input.sessionId || "").trim().slice(0, 128),
    value: Math.max(0, Number(input.value) || 0),
    source: String(input.source || "tuai").trim().slice(0, 40),
    placement: String(input.placement || "feed").trim().slice(0, 40),
  };
}

export function validateEventInput(input, { trusted = false } = {}) {
  const event = normalizeEventInput(input);
  const errors = [];

  if (!/^[a-f\d]{24}$/i.test(event.productId)) errors.push("productId invalido");
  if (!ALL_EVENT_TYPES.has(event.type)) errors.push("tipo de evento invalido");
  if (!event.sessionId) errors.push("sessionId obrigatorio");
  if (event.type === "conversion" && !trusted) {
    errors.push("conversao exige origem confiavel");
  }

  return { ok: errors.length === 0, errors, event };
}

export function metricIncrement(type, value = 0) {
  const metrics = {
    impression: { "metrics.impressions": 1 },
    click: { "metrics.clicks": 1 },
    save: { "metrics.saves": 1 },
    conversion: {
      "metrics.conversions": 1,
      "metrics.revenue": Math.max(0, Number(value) || 0),
    },
  };

  return metrics[type] || {};
}

export function duplicateWindowMs(type) {
  if (type === "impression") return 30_000;
  if (type === "click") return 30_000;
  if (type === "save") return 5_000;
  return 0;
}
