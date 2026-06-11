import Wallet from "../models/Wallet.js";
import Withdraw from "../models/Withdraw.js";
import { withdrawQueue } from "../queues/withdrawQueue.js";

export async function requestWithdraw({
  userId,
  amount,
  pixKey,
}) {

  const wallet = await Wallet.findOne({ userId });

  if (!wallet) throw new Error("Wallet não encontrada");

  const value = Number(String(amount).replace(",", "."));

  const available = Number(wallet.availableBalance || 0);

  if (available < value) {
    throw new Error("Saldo insuficiente");
  }

  // 🔵 reserva saldo
  wallet.availableBalance -= value;
  wallet.lockedBalance = Number(wallet.lockedBalance || 0) + value;

  await wallet.save();

  // 🟡 cria saque
  const withdraw = await Withdraw.create({
    userId,
    amount: value,
    pixKey,
    status: "processing",
    externalId: crypto.randomUUID(),
    createdAt: new Date(),
  });

  // 🔥 ENTRA NA FILA (NÃO ENVIA PIX AQUI)
  await withdrawQueue.add("process-withdraw", {
    withdrawId: withdraw._id.toString(),
  });

  return withdraw;
}