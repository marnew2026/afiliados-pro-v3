import express from "express";
import Campaign from "../models/Campaign.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * LISTAR CAMPANHAS
 */
router.get("/", async (req, res) => {
  try {
    const { ownerId } = req.query;

    if (!ownerId) {
      return res.status(400).json({ error: "ownerId é obrigatório" });
    }

    const campaigns = await Campaign.find({ ownerId });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * CRIAR CAMPANHA (APENAS PRO)
 */
router.post("/", async (req, res) => {
  try {
    const { name, link, ownerId, email } = req.body;

    if (!name || !link || !ownerId || !email) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (!user.isPro) {
      return res.status(403).json({ error: "PRO necessário" });
    }

    const campaign = await Campaign.create({
      name,
      link,
      ownerId,
      email,
      clicks: 0,
      earnings: 0,
      commission: 0.1, // garante padrão
    });

    return res.status(201).json(campaign);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * CLICK NA CAMPANHA
 */
router.post("/:id/click", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: "Campanha não encontrada" });
    }

    campaign.clicks = (campaign.clicks || 0) + 1;

    const commission = campaign.commission || 0.1;

    campaign.earnings = campaign.clicks * commission;

    await campaign.save();

    return res.json({
      success: true,
      clicks: campaign.clicks,
      earnings: campaign.earnings,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;