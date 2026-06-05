import Wallet from "../models/Wallet.js";
import Campaign from "../models/Campaign.js";

export default async function dashboard(req, res) {
  try {
    const { email } = req.params;

    const wallet = await Wallet.findOne({ userEmail: email });

    const campaigns = await Campaign.find({ userEmail: email });

    const totalClicks = campaigns.reduce(
      (acc, c) => acc + (c.clicks || 0),
      0
    );

    res.json({
      totalEarnings: wallet?.totalEarned || 0,
      totalWithdrawn: wallet?.blockedBalance || 0,
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