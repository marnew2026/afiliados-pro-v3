import Ledger from "../models/Ledger.js";

export async function getBalance(userEmail) {
  const credit = await Ledger.aggregate([
    { $match: { userEmail, type: "credit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const debit = await Ledger.aggregate([
    { $match: { userEmail, type: "debit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return (credit[0]?.total || 0) - (debit[0]?.total || 0);
}