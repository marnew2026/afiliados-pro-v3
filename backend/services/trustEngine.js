export function updateRiskScore(user, event) {
  let score = user.riskScore || 50;

  // 📉 FRAUDE
  if (event.fraudDetected) score -= 30;

  // 📉 CLICK SUSPEITO
  if (event.clickSpam) score -= 10;

  // 📉 CHARGEBACK (muito crítico)
  if (event.chargeback) score -= 40;

  // 📈 VENDA REAL
  if (event.sale) score += 5;

  // 📈 CONSISTÊNCIA
  if (event.consecutiveSales > 3) score += 10;

  // limites
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  let trustLevel = "LOW";

  if (score >= 80) trustLevel = "HIGH";
  else if (score >= 50) trustLevel = "MEDIUM";
  else trustLevel = "LOW";

  return {
    score,
    trustLevel
  };
}