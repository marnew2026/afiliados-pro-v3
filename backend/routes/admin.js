import express from "express";
import User from "../models/User.js";
import Sale from "../models/Sale.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

/* MÉTRICAS */
router.get("/metrics", async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* RANKING */
router.get("/users-ranking", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ riskScore: -1 })
      .limit(100);

    const ranking = users.map((u, index) => ({
      position: index + 1,
      email: u.email,
      riskScore: u.riskScore,
      trustLevel: u.trustLevel
    }));

    res.json(ranking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DASHBOARD ADMIN */
router.get("/stats", async (req, res) => {
  try {
    const totalUsuarios = await User.countDocuments();
    const totalCampanhas = await Campaign.countDocuments();

    const campanhas = await Campaign.find();

    const totalCliques = campanhas.reduce(
      (acc, item) => acc + (item.clicks || 0),
      0
    );

    const totalVendas = campanhas.reduce(
      (acc, item) => acc + (item.sales || 0),
      0
    );

    const totalGanhos = campanhas.reduce(
      (acc, item) => acc + (item.earnings || 0),
      0
    );

    res.json({
      totalUsuarios,
      totalCampanhas,
      totalCliques,
      totalVendas,
      totalGanhos
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* USERS */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LIBERAR PRO */
router.post("/pro/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    user.isPro = true;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;