import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

/* LISTAR CAMPANHAS */
router.get("/:email", async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* CRIAR CAMPANHA */
router.post("/create", async (req, res) => {
  try {
    const { userEmail, nome, link } = req.body;

    const codigo = Math.random().toString(36).substring(2, 10);

    const campaign = await Campaign.create({
      userEmail,
      nome,
      link,
      affiliateLink: `https://afiliados-pro-v3-2.onrender.com/r/${codigo}`,
      commission: 0.1,
      clicks: 0,
      earnings: 0,
    });

    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* REGISTRAR CLIQUE */
router.post("/:id/click", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: "Campanha não encontrada" });
    }

    campaign.clicks = (campaign.clicks || 0) + 1;
    campaign.earnings = campaign.clicks * (campaign.commission || 0.1);

    await campaign.save();

    res.json({
      clicks: campaign.clicks,
      earnings: campaign.earnings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* EXCLUIR */
router.delete("/:id", async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;