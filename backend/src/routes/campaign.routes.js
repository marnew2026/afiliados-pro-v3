import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

// LISTAR
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRIAR
router.post("/", async (req, res) => {
  try {
    const { name, link } = req.body;

    const campaign = await Campaign.create({
      name,
      link,
      clicks: 0,
      sales: 0,
      revenue: 0,
    });

    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RASTREAMENTO
router.get("/r/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: "Campanha não encontrada" });
    }

    campaign.clicks += 1;
    await campaign.save();

    return res.redirect(campaign.link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;