import express from "express";

import Campaign from "../models/Campaign.js";
import Distribution from "../models/Distribution.js";
import ChannelConnection from "../models/ChannelConnection.js";

import { protect } from "../middlewares/authMiddleware.js";
import { scheduleDistribution } from "../queue/distributionQueue.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const {
      campaignId,
      destinationId,
      text,
      scheduledAt,
    } = req.body;

    const userId = req.user._id;

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        error: "campaignId é obrigatório.",
      });
    }

    const cleanDestinationId = String(
      destinationId || ""
    ).trim();

    const cleanText = String(text || "").trim();

    if (!cleanDestinationId) {
      return res.status(400).json({
        success: false,
        error: "destinationId é obrigatório.",
      });
    }

    if (!cleanText) {
      return res.status(400).json({
        success: false,
        error: "Texto da divulgação é obrigatório.",
      });
    }

    if (cleanText.length > 4096) {
      return res.status(400).json({
        success: false,
        error: "Texto excede o limite de 4096 caracteres.",
      });
    }

    const campaign = await Campaign.findOne({
      _id: campaignId,
      userId,
      active: true,
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: "Campanha não encontrada ou inativa.",
      });
    }

    const connection = await ChannelConnection.findOne({
      userId,
      provider: "telegram",
      destinationId: cleanDestinationId,
      active: true,
    });

    if (!connection) {
      return res.status(400).json({
        success: false,
        error: "Conexão Telegram não encontrada ou inativa.",
      });
    }

    let publishAt = new Date();

    if (scheduledAt) {
      publishAt = new Date(scheduledAt);

      if (Number.isNaN(publishAt.getTime())) {
        return res.status(400).json({
          success: false,
          error: "scheduledAt inválido.",
        });
      }
    }

    const distribution = await Distribution.create({
      userId,
      campaignId: campaign._id,
      channel: "telegram",
      destinationId: cleanDestinationId,

      content: {
        text: cleanText,
     trackingUrl: `${process.env.BASE_URL}/campaigns/r/${campaign._id}`,
      },

      scheduledAt: publishAt,
      status: "scheduled",
    });

    try {
      const queued = await scheduleDistribution({
        distributionId: distribution._id,
        scheduledAt: publishAt,
      });

      return res.status(201).json({
        success: true,
        distribution,
        queue: {
          jobId: queued.jobId,
          publishAt: queued.publishAt,
        },
      });
    } catch (queueError) {
      distribution.status = "failed";
      distribution.lastError =
        "Falha ao agendar publicação.";

      await distribution.save();

      console.error(
        "ERRO AO AGENDAR DISTRIBUTION:",
        queueError.message
      );

      return res.status(503).json({
        success: false,
        error: "Não foi possível agendar a divulgação.",
        distributionId: distribution._id,
      });
    }
  } catch (error) {
    console.error(
      "ERRO CREATE DISTRIBUTION:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error: "Erro interno ao criar divulgação.",
    });
  }
});

export default router;