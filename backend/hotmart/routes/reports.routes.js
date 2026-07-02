import express from "express";
import Campaign from "../../models/Campaign.js";
import Wallet from "../../models/Wallet.js";

const router = express.Router();

// 📊 RELATÓRIO PROFISSIONAL HOTMART
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { start, end } = req.query;

    const startDate = start ? new Date(start) : new Date("2020-01-01");
    const endDate = end ? new Date(end) : new Date();

    const campaigns = await Campaign.find({
      userId,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const wallet = await Wallet.findOne({ userId });

    // 📊 métricas base
    let clicks = 0;
    let sales = 0;

    campaigns.forEach((c) => {
      clicks += c.clicks || 0;
      sales += c.sales || 0;
    });

    const earnings = wallet?.totalEarned || 0;

    const conversion = clicks > 0 ? (sales / clicks) * 100 : 0;

    return res.json({
      period: {
        start: startDate,
        end: endDate,
      },

      summary: {
        clicks,
        sales,
        earnings,
        conversion: conversion.toFixed(2),
      },

      wallet: {
        available: wallet?.availableBalance || 0,
        locked: wallet?.lockedBalance || 0,
      },

      campaigns,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;