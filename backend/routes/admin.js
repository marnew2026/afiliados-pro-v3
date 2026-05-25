import express from "express";

const router = express.Router();

/* MODELS */
import Withdraw from "../models/Withdraw.js";
import Campaign from "../models/Campaign.js";

/* =========================
   LISTAR SAQUES
========================= */
router.get("/withdraws", async (req, res) => {
  try {
    const withdraws = await Withdraw.find().sort({
      createdAt: -1,
    });

    res.json(withdraws);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Erro ao carregar saques",
    });
  }
});

/* =========================
   APROVAR SAQUE
========================= */
router.post("/approve/:id", async (req, res) => {
  try {
    const withdraw = await Withdraw.findById(req.params.id);

    if (!withdraw) {
      return res.status(404).json({
        error: "Saque não encontrado",
      });
    }

    withdraw.status = "approved";

    await withdraw.save();

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro ao aprovar",
    });
  }
});

/* =========================
   ESTATÍSTICAS ADMIN
========================= */
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
      error: "Erro stats",
    });
  }
});

export default router;