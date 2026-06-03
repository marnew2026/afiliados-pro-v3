import express from "express";
import Campaign from "../models/Campaign.js";
import Withdraw from "../models/Withdraw.js";

const router = express.Router();

/**
 * LISTAR SAQUES
 */
router.get("/withdrawals", async (req, res) => {
  try {
    const withdrawals = await Withdraw.find()
      .sort({ createdAt: -1 });

    res.json(withdrawals);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/**
 * DASHBOARD
 */
router.get("/dashboard", async (req, res) => {
  try {

    const { userEmail } = req.query;

    const campaigns = await Campaign.find({
      userEmail,
    });

    const withdraws = await Withdraw.find({
      userEmail,
    });

    const totalEarnings = campaigns.reduce(
      (acc, c) => acc + (c.earnings || 0),
      0
    );

    const totalWithdrawn = withdraws
      .filter(w => w.status === "approved")
      .reduce(
        (acc, w) => acc + (w.amount || 0),
        0
      );

    const availableBalance =
      totalEarnings - totalWithdrawn;

    return res.json({
      campaigns,
      withdrawals: withdraws,
      totalEarnings,
      totalWithdrawn,
      availableBalance,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;