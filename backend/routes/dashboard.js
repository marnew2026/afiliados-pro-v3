import express from "express";
import Sale from "../models/Sale.js";
import Click from "../models/Click.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    console.log("EMAIL:", email);

    const campaigns = await Campaign.find({
      userEmail: email,
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
      totalEarnings,
      totalWithdrawn,
      availableBalance,
      totalClicks,
      campaigns,
    });

  } catch (err) {
  console.log("❌ DASHBOARD REAL ERROR:", err);

  res.status(500).json({
    error: err.message,
  });
}
export default router;