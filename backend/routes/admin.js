import express from "express";
import Campaign from "../models/Campaign.js";
import Withdraw from "../models/Withdraw.js";

const router = express.Router();

/**
 * 🔥 DASHBOARD ADMIN
 */
router.get("/dashboard", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    const withdraws = await Withdraw.find();

    // 💰 total ganhos
    const totalEarnings = campaigns.reduce(
      (acc, c) => acc + (c.earnings || 0),
      0
    );

    // 💸 total sacado (SOMENTE APROVADOS)
    const totalWithdrawn = withdraws
      .filter(w => w.status === "approved")
      .reduce((acc, w) => acc + (w.amount || 0), 0);

    // 🧮 saldo real
    const balance = totalEarnings - totalWithdrawn;

    // ⏳ pendentes
    const pendingWithdraws = withdraws.filter(
      w => w.status === "pending"
    );

    // ✅ aprovados
    const approvedWithdraws = withdraws.filter(
      w => w.status === "approved"
    );

    // 🔥 top campanhas
    const topCampaigns = campaigns
      .sort((a, b) => (b.earnings || 0) - (a.earnings || 0))
      .slice(0, 5);

    return res.json({
      totalEarnings,
      totalWithdrawn,
      balance,
      pendingWithdraws,
      approvedWithdraws,
      topCampaigns,
    });
  } catch (err) {
    console.log("ADMIN DASHBOARD ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;