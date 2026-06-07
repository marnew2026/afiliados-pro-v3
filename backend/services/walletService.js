import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

export async function addEarning({
  userEmail,
  amount,
  referenceId,
}) {

  console.log(
    "ADD EARNING INICIO:",
    userEmail,
    amount
  );

const wallet = await Wallet.findOne({ userEmail });

const balance = wallet?.availableBalance || 0;

if (balance < amount) {
  return res.status(400).json({ error: "Saldo insuficiente" });
}
  console.log(
    "WALLET APÓS UPDATE:",
    wallet
  );

  await Transaction.create({
    userEmail,
    type: "earning",
    amount,
    referenceId,
    description: "Venda confirmada",
  });

  return wallet;
}