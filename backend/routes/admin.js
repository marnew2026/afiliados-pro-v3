import express from "express";
import Campaign from "../models/Campaign.js";
import Withdraw from "../models/Withdraw.js";
import Wallet from "../models/Wallet.js";

const router = express.Router();

/**
 * LISTAR SAQUES
 */
router.get("/withdrawals", async (req, res) => {
  try {
    const withdrawals = await Withdraw.find()
      .sort({ createdAt: -1 });

    console.log(
      "TOTAL SAQUES:",
      withdrawals.length
    );

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
    const { userId} = req.query;

   

    const campaigns = await Campaign.find({
      userId,
    });

    const totalClicks = campaigns.reduce(
      (acc, campaign) =>
        acc + Number(campaign.clicks || 0),
      0
    );

    const withdrawals = await Withdraw.find()
  .sort({ createdAt: -1 });

console.log(
  "SAQUES ENCONTRADOS:",
  withdrawals.length
);

res.json(withdrawals);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;