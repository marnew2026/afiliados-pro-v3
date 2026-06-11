import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

export async function addEarning({
  userId,
  amount,
  referenceId,
}) {

  console.log(
    "ADD EARNING INICIO:",
    userId,
    amount
  );

const wallet = await Wallet.findOne({ userId});

const balance = wallet?.availableBalance || 0;

if (balance < amount) {
  return res.status(400).json({ error: "Saldo insuficiente" });
}
  console.log(
    "WALLET APÓS UPDATE:",
    wallet
  );

  await Transaction.create({
    userId,
    type: "earning",
    amount,
    referenceId,
    description: "Venda confirmada",
  });

  return wallet;
}