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

  const wallet = await Wallet.findOneAndUpdate(
    { userEmail },
    {
      $inc: {
        availableBalance: amount,
        totalEarned: amount,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );

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