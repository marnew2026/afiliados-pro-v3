export function analyzeClick({ ip, userAgent, lastClicks }) {
  let score = 0;

  // 🤖 bot detection simples
  if (!userAgent || userAgent.length < 10) score += 5;

  if (/bot|crawler|spider|curl|wget/i.test(userAgent)) {
    score += 10;
  }

  // 🌐 spam IP (muitos cliques recentes)
  const sameIpClicks = lastClicks.filter(c => c.ip === ip);

  if (sameIpClicks.length > 5) {
    score += 8;
  }

  // ⚡ flood rápido
  const now = Date.now();
  const fastClicks = lastClicks.filter(
    c => now - new Date(c.createdAt).getTime() < 10000 // 10s
  );

  if (fastClicks.length > 3) {
    score += 10;
  }

  return {
    score,
    isBot: score >= 15,
  };
}