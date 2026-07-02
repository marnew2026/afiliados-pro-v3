import dotenv from "dotenv";
dotenv.config();

import express from "express";

import Campaign from "../models/Campaign.js";
import User from "../models/User.js";

const router = express.Router();

console.log("📊 RANKING ROUTE SAAS OK");

/**
 * 🖱 RANKING POR CLIQUES
 */
router.get("/clicks", async (req, res) => {
  try {
    const campaigns = await Campaign.find({});

    const map = new Map();

    for (const c of campaigns) {
      const userId = c.userId?.toString();

      if (!userId) continue;

      map.set(userId, (map.get(userId) || 0) + (c.clicks || 0));
    }

    const result = await buildRanking(map);

    return res.json(result);
  } catch (error) {
    console.error("❌ RANKING CLICKS ERROR:", error);

    return res.status(500).json({
      error: "ranking error",
    });
  }
});

/**
 * 💰 RANKING POR GANHOS
 */
router.get("/earnings", async (req, res) => {
  try {
    const campaigns = await Campaign.find({});

    const map = new Map();

    for (const c of campaigns) {
      const userId = c.userId?.toString();

      if (!userId) continue;

      map.set(userId, (map.get(userId) || 0) + (c.earnings || 0));
    }

    const result = await buildRanking(map);

    return res.json(result);
  } catch (error) {
    console.error("❌ RANKING EARNINGS ERROR:", error);

    return res.status(500).json({
      error: "ranking error",
    });
  }
});

/**
 * 🧠 FUNÇÃO CENTRAL (TRANSFORMA MAP EM RANKING)
 */
async function buildRanking(map) {
  const entries = [...map.entries()];

  // ordena desc
  entries.sort((a, b) => b[1] - a[1]);

  const result = [];

  for (const [userId, value] of entries) {
    const user = await User.findById(userId);

    result.push({
      userId,
      email: user?.email || "unknown",
      value,
      isPro: user?.isPro || false,
    });
  }

  return result;
}

export default router;