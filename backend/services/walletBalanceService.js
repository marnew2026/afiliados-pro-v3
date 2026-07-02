import Ledger from "../models/Ledger.js";

export async function getBalance(userId) {
  const credits = await Ledger.aggregate([
    { $match: { userId, type: "credit", status: "confirmed" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const debits = await Ledger.aggregate([
    { $match: { userId, type: "debit", status: "confirmed" } },
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