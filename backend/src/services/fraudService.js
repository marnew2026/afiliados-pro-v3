import Wallet from "../../models/Wallet.js";

// 🔥 aumenta risco por comportamento suspeito
export async function increaseRisk(userId, points = 1) {
  const wallet = await Wallet.findOne({ userId });

  if (!wallet) return;

  wallet.riskScore += points;

  // 🚨 bloqueio automático
  if (wallet.riskScore >= 10) {
    wallet.withdrawLocked = true;
  }

  await wallet.save();
}

// ✔ reset parcial (usuário confiável)
export async function decayRisk(userId) {
  const wallet = await Wallet.findOne({ userId });

  if (!wallet) return;

  wallet.riskScore = Math.max(wallet.riskScore - 1, 0);

  await wallet.save();
}