import Wallet from "../models/Wallet.js";
import Campaign from "../models/Campaign.js";

export default async function dashboard(req, res) {
  try {

    const wallet = await Wallet.findOne({
      userId: req.user.id,
    });

    const campaigns = await Campaign.find({
      userId: req.user.id,
    });

    const totalClicks = campaigns.reduce(
      (acc, c) => acc + (c.clicks || 0),
      0
    );

    res.json({
      totalEarnings: wallet?.totalEarned || 0,
      totalWithdrawn: wallet?.lockedBalance || 0,
      availableBalance: wallet?.availableBalance || 0,
      totalClicks,
      campaigns,
    });

  } catch (err) {

    console.log("dashboard error:", err);

    res.status(500).json({
      error: "Erro dashboard",
    });
  }
}