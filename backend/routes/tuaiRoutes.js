import express from "express";
import Campaign from "../models/Campaign.js";
import { rankOpportunities } from "../services/tuai/TuaiOpportunityEngine.js";

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "tuai-opportunity-engine", version: 1 });
});

router.get("/feed", async (req, res) => {
  try {
    const requestedLimit = Number.parseInt(req.query.limit, 10);
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(50, Math.max(1, requestedLimit))
      : 20;

    const campaigns = await Campaign.find({ active: true, status: "active" })
      .select("nome link clicks sales earnings createdAt updatedAt")
      .sort({ updatedAt: -1 })
      .limit(100)
      .lean();

    const now = Date.now();
    const items = campaigns.map((campaign) => ({
      id: String(campaign._id),
      title: campaign.nome,
      destinationUrl: campaign.link,
      clicks: campaign.clicks || 0,
      sales: campaign.sales || 0,
      earnings: campaign.earnings || 0,
      ageHours: Math.max(
        0,
        (now - new Date(campaign.updatedAt || campaign.createdAt || now).getTime()) /
          3600000
      ),
      trustScore: 70,
    }));

    const ranked = rankOpportunities(items).slice(0, limit);

    res.set("Cache-Control", "no-store").json({
      ok: true,
      engineVersion: 1,
      generatedAt: new Date(now).toISOString(),
      total: ranked.length,
      items: ranked,
    });
  } catch (error) {
    console.error("TUAÍ FEED ERROR:", error);
    res.status(500).json({ ok: false, error: "Falha ao montar o feed do Tuaí" });
  }
});

export default router;
