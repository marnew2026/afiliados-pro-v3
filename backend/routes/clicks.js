import express from "express";
import Campaign from "../models/Campaign.js";
import Ledger from "../models/Ledger.js";
import crypto from "crypto";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, campaignId } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ error: "Not found" });

    // 🔴 1. incrementa click (ok)
    campaign.clicks = (campaign.clicks || 0) + 1;
    await campaign.save();

    // 🔴 2. referenceId único (ANTI DUPLICAÇÃO)
    const referenceId = crypto.randomUUID();

    // 🔥 3. CLICK NO LEDGER (SEM DINHEIRO DIRETO)
    await Ledger.create({
      userId,
      type: "credit",
      source: "campaign",
      amount: 0, // 🔴 click não gera dinheiro direto
      referenceId,
      description: "Click registrado",
      metadata: {
        campaignId,
      },
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;