import express from "express";
import Campaign from "../../models/Campaign.js";
import Wallet from "../../models/Wallet.js";

const router = express.Router();

// 📊 DASHBOARD HOTMART COMPLETO
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
     console.log("USERID RECEBIDO:", userId);

    // 📦 campanhas do usuário
    const campaigns = await Campaign.find({ userId });

    // 💰 wallet
    const wallet = await Wallet.findOne({ userId });

    // 📊 métricas base
    let totalClicks = 0;
    let totalSales = 0;

    campaigns.forEach((c) => {
      totalClicks += c.clicks || 0;
      totalSales += c.sales || 0;
    });

    // 💰 ganhos
    const totalEarnings = wallet?.totalEarned || 0;

    // 📈 conversão
    const conversionRate =
      totalClicks > 0 ? (totalSales / totalClicks) * 100 : 0;

    // 💵 ticket médio
    const avgTicket =
      totalSales > 0 ? totalEarnings / totalSales : 0;

    return res.json({
      userId,

      metrics: {
        totalClicks,
        totalSales,
        totalEarnings,
        conversionRate: conversionRate.toFixed(2),
        avgTicket: avgTicket.toFixed(2),
      },

      wallet: {
        availableBalance: wallet?.availableBalance || 0,
        lockedBalance: wallet?.lockedBalance || 0,
        totalEarned: wallet?.totalEarned || 0,
      },

      campaigns,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;