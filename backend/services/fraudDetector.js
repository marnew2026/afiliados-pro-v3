export function detectFraud(click) {
  const risk = {
    score: 0,
    flags: []
  };

  // 🚨 IP suspeito (simulação simples)
  if (click.ip && click.ip.startsWith("127")) {
    risk.score += 50;
    risk.flags.push("LOCALHOST_IP");
  }

  // 🚨 muitos cliques em pouco tempo
  if (click.clickCountLastMinute > 10) {
    risk.score += 40;
    risk.flags.push("CLICK_SPAM");
  }

  // 🚨 user-agent vazio
  if (!click.userAgent) {
    risk.score += 20;
    risk.flags.push("NO_USER_AGENT");
  }

  return {
    riskScore: risk.score,
    isFraud: risk.score >= 70,
    flags: risk.flags
  };
}