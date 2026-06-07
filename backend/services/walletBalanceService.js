import LedgerEntry from "../models/LedgerEntry.js";

export async function getBalance(userEmail) {
  const credits = await LedgerEntry.aggregate([
    { $match: { userEmail, type: "credit", status: "confirmed" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const debits = await LedgerEntry.aggregate([
    { $match: { userEmail, type: "debit", status: "confirmed" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalCredits = credits[0]?.total || 0;
  const totalDebits = debits[0]?.total || 0;

  return {
    availableBalance: totalCredits - totalDebits,
    totalEarned: totalCredits,
    totalWithdrawn: totalDebits,
  };
}