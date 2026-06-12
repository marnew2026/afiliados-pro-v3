import express from "express";
import User from "../models/User.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();
router.get("/debug-user/:email", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    console.log("EMAIL RECEBIDO:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    const campaigns = await Campaign.find({
      userId: user._id,
    });

    const totalEarnings = campaigns.reduce(
      (sum, c) => sum + Number(c.earnings || 0),
      0
    );

    const totalClicks = campaigns.reduce(
      (acc, c) => acc + Number(c.clicks || 0),
      0
    );

    res.json({
     totalEarnings: Number(totalEarnings.toFixed(2)),
      totalWithdrawn: 0,
      availableBalance: Number(totalEarnings.toFixed(2)),
      totalClicks,
      campaigns,
    });

  } catch (err) {
    console.log("❌ DASHBOARD ERROR:", err);

    res.status(500).json({
      error: "Erro dashboard",
    });
  }
});

export default router;