import Ledger from "../models/Ledger.js";

export async function getWalletBalance(userId) {
  const result = await Ledger.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: "$userId",
        balance: {
          $sum: {
            $cond: [
              { $eq: ["$type", "credit"] },
              "$amount",
              { $multiply: ["$amount", -1] }
            ]
          }
        }
      }
    }
  ]);

  return result[0]?.balance || 0;
}

export async function addEarning(
  userId,
  amount,
  referenceId = `manual-${Date.now()}`
) {
  return Ledger.create({
    userId,
    amount,
    type: "credit",
    source: "campaign",
    referenceId,
    description: "Commission credit",
    status: "confirmed",
  });
}