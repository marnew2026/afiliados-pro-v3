import Ledger from "../models/Ledger.js";

import Wallet from "../models/Wallet.js";

export async function addCredit({
  userId,
  amount,
  referenceId,
  source = "campaign",
  description = "",
  status = "confirmed",
  metadata = {},
}) {

  // grava no Ledger
  await Ledger.create({
    userId,
    type: "credit",
    amount,
    source,
    referenceId,
    description,
    status,
    metadata,
  });

  // atualiza a Wallet
 await Wallet.findOneAndUpdate(
    { userId },
    {
      $inc: {
        availableBalance: amount,
        totalEarned: amount,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

}

export async function addDebit({
  userId,
  amount,
  referenceId,
  source = "withdraw",
  description = "",
  status = "pending",
  metadata = {},
}) {
  await Ledger.create({
    userId,
    type: "debit",
    amount,
    source,
    referenceId,
    description,
    status,
    metadata,
  });
}
  

export async function getBalance(userId) {
  const credits = await Ledger.aggregate([
    { $match: { userId, type: "credit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const debits = await Ledger.aggregate([
    { $match: { userId, type: "debit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const creditTotal = credits[0]?.total || 0;
  const debitTotal = debits[0]?.total || 0;

  return creditTotal - debitTotal;
}