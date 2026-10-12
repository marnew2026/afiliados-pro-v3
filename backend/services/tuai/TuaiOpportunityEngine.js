const clamp = (value, min = 0, max = 100) =>
  Math.min(max, Math.max(min, Number(value) || 0));

const normalize = (value, ceiling) =>
  clamp((Math.max(0, Number(value) || 0) / ceiling) * 100);

/**
 * Primeira versao auditavel do motor Tuaí.
 * Cada fator fica separado para que o resultado possa ser explicado e testado.
 */
export function scoreOpportunity(input = {}) {
  const clicks = Math.max(0, Number(input.clicks) || 0);
  const sales = Math.max(0, Number(input.sales) || 0);
  const earnings = Math.max(0, Number(input.earnings) || 0);
  const ageHours = Math.max(0, Number(input.ageHours) || 0);

  const interest = normalize(clicks, 100);
  const conversionRate = clicks > 0 ? clamp((sales / clicks) * 100) : 0;
  const conversion = normalize(conversionRate, 10);
  const revenue = normalize(earnings, 100);
  const recency = clamp(100 - (ageHours / (24 * 30)) * 100);
  const trust = clamp(input.trustScore ?? 70);

  const factors = {
    interest: Math.round(interest),
    conversion: Math.round(conversion),
    revenue: Math.round(revenue),
    recency: Math.round(recency),
    trust: Math.round(trust),
  };

  const score = Math.round(
    factors.interest * 0.25 +
    factors.conversion * 0.3 +
    factors.revenue * 0.15 +
    factors.recency * 0.15 +
    factors.trust * 0.15
  );

  const label = score >= 75
    ? "forte oportunidade"
    : score >= 55
      ? "oportunidade em observação"
      : "dados insuficientes";

  const reasons = Object.entries(factors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([factor]) => factor);

  return { score, label, factors, reasons };
}

export function rankOpportunities(items = []) {
  return items
    .map((item) => ({ ...item, opportunity: scoreOpportunity(item) }))
    .sort((a, b) => {
      const scoreDifference = b.opportunity.score - a.opportunity.score;
      if (scoreDifference !== 0) return scoreDifference;
      return String(a.id || "").localeCompare(String(b.id || ""));
    });
}
