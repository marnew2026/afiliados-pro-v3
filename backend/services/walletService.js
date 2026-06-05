import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

export async function addEarning({
  userEmail,
  amount,
  referenceId,
}) {
  // 1. atualiza wallet
  const wallet = await Wallet.findOneAndUpdate(
    { userEmail },
    {
      $inc: {
        availableBalance: amount,
        totalEarned: amount,
      },
    },
    { upsert: true, new: true }
  );

  // 2. log financeiro (IMUTÁVEL)
  await Transaction.create({
    userEmail,
    type: "earning",
    amount,
    referenceId,
    description: "Venda confirmada",
  });

  return wallet;
}