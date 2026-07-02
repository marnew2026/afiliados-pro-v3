import express from "express";
import Wallet from "../models/Wallet.js";
import User from "../models/User.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      wallet = await Wallet.create({
        userId,
        availableBalance: 0,
        totalEarned: 0,
      });
    }

    const campaigns = await Campaign.find({ userId });

    const totalClicks = campaigns.reduce(
      (acc, c) => acc + (c.clicks || 0),
      0
    );

    return res.json({
      user,
      wallet,
      campaigns,
      metrics: {
        totalEarnings: wallet.totalEarned || 0,
        totalClicks,
      },
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;