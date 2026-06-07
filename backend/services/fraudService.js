export function checkFraudRules(wallet, amount) {
  const now = new Date();

  const safeAmount = Number(amount);
  const last = wallet.lastWithdrawAt
    ? new Date(wallet.lastWithdrawAt)
    : null;

  // 🔥 1. limite por saque
  if (safeAmount > 1000) {
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
  const risk = Number(wallet.riskScore || 0);

  if (risk >= 80) {
    throw new Error("Conta bloqueada por risco");
  }
}