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

const withdrawals = await Withdraw.find({
  userEmail: email,
  status: { $in: ["pending", "approved"] },
});

const totalWithdrawn = withdrawals.reduce(
  (acc, w) => acc + Number(w.amount || 0),
  0
);

const availableBalance =
  totalEarnings - totalWithdrawn;

 res.json({
  totalEarnings: Number(totalEarnings.toFixed(2)),
  totalWithdrawn,
  availableBalance,
  totalClicks,
  campaigns,
});

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;