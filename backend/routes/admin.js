import express from "express";
import User from "../models/User.js";
import Sale from "../models/Sale.js";
const router = express.Router();

/**
 * 📊 Ranking de usuários por score
 */
router.get("/users-ranking", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ riskScore: -1 }) // maior score primeiro
      .limit(100);
router.get("/metrics", async (req, res) => {
  const users = await User.countDocuments();
  const sales = await Sale.countDocuments();

  const revenue = await Sale.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  res.json({
    users,
    sales,
    revenue: revenue[0]?.total || 0
  });
});
    const ranking = users.map((u, index) => ({
      position: index + 1,
      email: u.email,
      riskScore: u.riskScore,
      trustLevel: u.trustLevel
    }));

    res.json(ranking);
  } catch (err) {
    res.status(500).json({ error: "Erro ranking" });
  }
});

export default router;