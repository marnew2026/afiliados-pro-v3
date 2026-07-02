import express from "express";
import Ledger from "../../models/Ledger.js";
import crypto from "crypto";
import Campaign from "../../models/Campaign.js";

const router = express.Router();

// 🔥 conversão de venda (evento final)
router.post("/sale", async (req, res) => {
  try {
    const {
      campaignId,
      amount,
      orderId,
    } = req.body;

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ error: "campanha não encontrada" });
    }

    // 👇 afiliado que gerou o clique
    const affiliateId = campaign.lastAffiliate;

    if (!affiliateId) {
      return res.json({
        message: "sem afiliado atribuído",
      });
    }

    // 💰 comissão (ex: 10%)
    const commission = amount * 0.10;

    // 🔥 EVITA DUPLICAÇÃO (IDEMPOTÊNCIA BÁSICA)
    if (campaign.processedOrders?.includes(orderId)) {
      return res.json({ message: "já processado" });
    }

    // 💸 adiciona ganho ao afiliado
    await addEarning(affiliateId, commission);

    // 🧠 marca pedido como processado
    campaign.processedOrders = [
      ...(campaign.processedOrders || []),
      orderId,
    ];

    await campaign.save();

    return res.json({
      message: "conversão registrada",
      affiliateId,
      commission,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;