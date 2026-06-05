export function checkFraudRules(wallet, amount) {
  const now = new Date();
  const last = wallet.lastWithdrawAt;

  // 🔥 1. limite por saque
  if (amount > 1000) {
    throw new Error("Limite por saque excedido");
  }

  // 🔥 2. saque muito frequente
  if (last) {
    const diffMinutes = (now - last) / 60000;

    if (diffMinutes < 2) {
      throw new Error("Muitos saques em pouco tempo");
    }
  }

  // 🔥 3. risco alto
  if (wallet.riskScore >= 80) {
    throw new Error("Conta bloqueada por risco");
  }
}
export function increaseRisk(wallet, reason = "") {
  let score = wallet.riskScore || 0;

  if (reason === "fast_withdraw") score += 20;
  if (reason === "failed_withdraw") score += 30;
  if (reason === "multiple_attempts") score += 40;

  wallet.riskScore = score;
}