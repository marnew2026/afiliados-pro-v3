import express from "express";
import Sale from "../models/Sale.js";
import Click from "../models/Click.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

router.get("/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;

    const campaigns = await Campaign.find({
      userEmail,
    });

    const totalClicks = campaigns.reduce(
      (sum, campaign) =>
        sum + (campaign.clicks || 0),
      0
    );

    const totalEarnings = campaigns.reduce(
      (sum, campaign) =>
        sum + (campaign.earnings || 0),
      0
    );

    const totalWithdrawn = 0;

    const availableBalance =
      totalEarnings - totalWithdrawn;

    res.json({
      campaigns,
      totalClicks,
      totalEarnings,
      totalWithdrawn,
      availableBalance,
    });

  } catch (err) {
    console.log(
      "❌ DASHBOARD ERROR:",
      err.message
    );

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;