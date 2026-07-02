import Wallet from "../models/Wallet.js";
import Campaign from "../models/Campaign.js";

export default async function dashboard(req, res) {
  try {

    console.log("REQ USER:", req.user);

    const wallet = await Wallet.findOne({
      userId: req.user.id,
    });

    console.log("WALLET ENCONTRADA:", wallet);

    const campaigns = await Campaign.find({
      userId: req.user.id,
    });

    res.json({
      totalEarnings: wallet?.totalEarned || 0,
      totalWithdrawn: wallet?.lockedBalance || 0,
      availableBalance: wallet?.availableBalance || 0,
      totalClicks: campaigns.reduce(
        (acc, c) => acc + (c.clicks || 0),
        0
      ),
      campaigns,
    });

  } catch (err) {
    console.log("dashboard error:", err);
    res.status(500).json({ error: "Erro dashboard" });
  }
}