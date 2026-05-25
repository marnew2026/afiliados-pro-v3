import express from "express";
import Withdraw from "../models/Withdraw.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

/* LISTAR SAQUES */
router.get("/withdraws", async (req, res) => {
  try {
    const withdraws = await Withdraw.find().sort({
      createdAt: -1,
    });

    res.json(withdraws);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Erro ao buscar saques",
    });
  }
});

/* APROVAR SAQUE */
router.post("/withdraw/:id/approve", async (req, res) => {
  try {
    await Withdraw.findByIdAndUpdate(req.params.id, {
      status: "approved",
    });

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro ao aprovar saque",
    });
  }
});

/* REJEITAR SAQUE */
router.post("/withdraw/:id/reject", async (req, res) => {
  try {
    await Withdraw.findByIdAndUpdate(req.params.id, {
      status: "rejected",
    });

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro ao rejeitar saque",
    });
  }
});

/* DASHBOARD ADMIN */
router.get("/stats", async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    const totalClicks = campaigns.reduce(
      (acc, item) => acc + (item.clicks || 0),
      0
    );

    const totalSales = campaigns.reduce(
      (acc, item) => acc + (item.sales || 0),
      0
    );

    const totalEarnings = campaigns.reduce(
      (acc, item) => acc + (item.earnings || 0),
      0
    );

    res.json({
      totalClicks,
      totalSales,
      totalEarnings,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro admin stats",
    });
  }
});

export default router;