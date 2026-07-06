import express from "express";

import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import Click from "../models/Click.js";
import Conversion from "../models/Conversion.js";
import Withdraw from "../models/Withdraw.js";

const router = express.Router();
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await Wallet.countDocuments();

 const totals = result[0] || {
  totalEarned: 0,
  totalAvailable: 0,
};

return res.json({
  totalUsers,
  totalEarned: totals.totalEarned,
  totalAvailable: totals.totalAvailable,
});

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const [
      users,
      clicks,
      conversions,
      wallets,
      pendingWithdraws,
      paidWithdraws,
    ] = await Promise.all([
      User.countDocuments(),
      Click.countDocuments(),
      Conversion.countDocuments(),
      Wallet.find(),
      Withdraw.countDocuments({ status: "pending" }),
      Withdraw.countDocuments({ status: "paid" }),
    ]);

    const totalEarned = wallets.reduce(
      (sum, w) => sum + (w.totalEarned || 0),
      0
    );

    const totalAvailable = wallets.reduce(
      (sum, w) => sum + (w.availableBalance || 0),
      0
    );

    const conversionRate =
      Number(clicks) > 0
        ? ((Number(conversions) / Number(clicks)) * 100).toFixed(2)
        : "0.00";

    return res.json({
      users,
      clicks,
      conversions,
      totalEarned,
      totalAvailable,
      pendingWithdraws,
      paidWithdraws,
      conversionRate,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;