import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

router.get("/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;

    console.log("EMAIL:", userEmail);

    const campaigns = await Campaign.find({
      userEmail,
    });

    console.log("CAMPAIGNS:", campaigns.length);

    const totalClicks = campaigns.reduce(
      (sum, c) => sum + (c.clicks || 0),
      0
    );

    const totalEarnings = campaigns.reduce(
      (sum, c) => sum + (c.earnings || 0),
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
    console.log("DASHBOARD ERROR:", err);

    res.status(500).json({
      error: "Erro dashboard",
    });
  }
});

export default router;