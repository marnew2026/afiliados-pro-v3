import Wallet from "../models/Wallet.js";
import Click from "../models/Click.js";

export async function getTopAffiliates(limit = 10) {
  const users = await Wallet.find()
    .sort({ totalEarned: -1 })
    .limit(limit)
    .lean();

  return users.map((u, index) => ({
    userId: u.userId,
    totalEarned: u.totalEarned || 0,
    rank: index + 1,
  }));
}

export async function getTopClicks(limit = 10) {
  const result = await Click.aggregate([
    {
      $group: {
        _id: "$affiliateId",
        clicks: { $sum: 1 },
      },
    },
    { $sort: { clicks: -1 } },
    { $limit: limit },
  ]);

  return result.map((r, i) => ({
    affiliateId: r._id,
    clicks: r.clicks,
    rank: i + 1,
  }));
}