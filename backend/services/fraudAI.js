export function fraudScore(data) {
  let score = 0;

  // IP suspeito
  if (data.ip?.startsWith("127") || data.ip === "0.0.0.0") {
    score += 50;
  }

  // clique muito rápido
  if (data.timeBetweenClicks < 3) {
    score += 30;
  }

  // user-agent vazio
  if (!data.userAgent) {
    score += 20;
  }

  // muitos cliques mesmo IP
  if (data.clicksFromSameIP > 20) {
    score += 40;
  }

  return {
    score,
    isFraud: score >= 70
  };
}