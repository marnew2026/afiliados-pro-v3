import express from "express";
import Campaign from "../models/Campaign.js";
import TuaiProduct from "../models/TuaiProduct.js";
import { rankOpportunities } from "../services/tuai/TuaiOpportunityEngine.js";
import {
  isTrustedEventRequest,
  registerTuaiEvent,
} from "../services/tuai/TuaiEventService.js";

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "tuai-opportunity-engine", version: 2 });
});

router.get("/feed", async (req, res) => {
  try {
    const requestedLimit = Number.parseInt(req.query.limit, 10);
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(50, Math.max(1, requestedLimit))
      : 20;
    const now = Date.now();

    const products = await TuaiProduct.find({ active: true })
      .select("title imageUrl category affiliateUrl price currency trustScore metrics createdAt updatedAt")
      .sort({ "metrics.lastEventAt": -1, updatedAt: -1 })
      .limit(100)
      .lean();

    let items = products.map((product) => ({
      id: String(product._id),
      title: product.title,
      imageUrl: product.imageUrl,
      category: product.category,
      price: product.price,
      currency: product.currency,
      destinationUrl: `/tuai/v1/out/${product._id}`,
      impressions: product.metrics?.impressions || 0,
      clicks: product.metrics?.clicks || 0,
      saves: product.metrics?.saves || 0,
      sales: product.metrics?.conversions || 0,
      earnings: product.metrics?.revenue || 0,
      ageHours: Math.max(
        0,
        (now - new Date(product.updatedAt || product.createdAt || now).getTime()) /
          3600000
      ),
      trustScore: product.trustScore,
    }));

    // Compatibilidade temporaria enquanto o catalogo proprio e alimentado.
    if (items.length === 0) {
      const campaigns = await Campaign.find({ active: true, status: "active" })
      .select("nome link clicks sales earnings createdAt updatedAt")
      .sort({ updatedAt: -1 })
      .limit(100)
      .lean();
      items = campaigns.map((campaign) => ({
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
    }

    const ranked = rankOpportunities(items).slice(0, limit);

    res.set("Cache-Control", "no-store").json({
      ok: true,
      engineVersion: 2,
      generatedAt: new Date(now).toISOString(),
      total: ranked.length,
      items: ranked,
    });
  } catch (error) {
    console.error("TUAÍ FEED ERROR:", error);
    res.status(500).json({ ok: false, error: "Falha ao montar o feed do Tuaí" });
  }
});

router.post("/events", async (req, res) => {
  try {
    const result = await registerTuaiEvent(req.body, {
      trusted: isTrustedEventRequest(req),
    });
    res.status(result.accepted ? 201 : 200).json({ ok: true, ...result });
  } catch (error) {
    const status = Number(error.statusCode) || 500;
    if (status === 500) console.error("TUAÍ EVENT ERROR:", error);
    res.status(status).json({ ok: false, error: error.message || "Falha ao registrar evento" });
  }
});

router.get("/out/:productId", async (req, res) => {
  try {
    if (!/^[a-f\d]{24}$/i.test(req.params.productId)) {
      return res.status(400).json({ ok: false, error: "Produto invalido" });
    }
    const product = await TuaiProduct.findOne({
      _id: req.params.productId,
      active: true,
    }).select("affiliateUrl").lean();
    if (!product) return res.status(404).json({ ok: false, error: "Produto nao encontrado" });

    const sessionId = String(req.query.sessionId || `${req.ip}:${req.get("user-agent") || "unknown"}`);
    await registerTuaiEvent({
      productId: req.params.productId,
      type: "click",
      sessionId,
      source: "redirect",
      placement: String(req.query.placement || "feed"),
    });

    return res.redirect(302, product.affiliateUrl);
  } catch (error) {
    console.error("TUAÍ OUT ERROR:", error);
    return res.status(500).json({ ok: false, error: "Falha ao abrir a oferta" });
  }
});

export default router;
