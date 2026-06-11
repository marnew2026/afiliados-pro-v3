import Ledger from "../models/Ledger.js";

export async function getBalance(userId) {

  const credit = await Ledger.aggregate([
    {
      $match: {
        userId,
        type: "credit",
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const debit = await Ledger.aggregate([
    {
      $match: {
        userId,
        type: "debit",
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  console.log("LEDGER CREDIT:", credit);
  console.log("LEDGER DEBIT:", debit);

  const balance =
    (credit[0]?.total || 0) -
    (debit[0]?.total || 0);

  console.log(
    "LEDGER BALANCE:",
    userId,
    balance
  );

  return balance;
}