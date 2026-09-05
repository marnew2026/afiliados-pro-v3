import express from "express";

import Campaign from "../models/Campaign.js";
import Distribution from "../models/Distribution.js";
import ChannelConnection from "../models/ChannelConnection.js";

import { protect } from "../middlewares/authMiddleware.js";
import {
  distributionQueue,
  scheduleDistribution,
} from "../queue/distributionQueue.js";
import {
  createInstagramDistribution,
} from "../services/distribution/CreateInstagramDistributionService.js";

const router = express.Router();

router.post("/instagram", protect, async (req, res) => {
  try {
    const result = await createInstagramDistribution({
      userId: req.user._id,
      campaignId: req.body.campaignId,
      mediaAssetId: req.body.mediaAssetId,
      caption: req.body.caption,
      hashtags: req.body.hashtags,
      cta: req.body.cta,
      scheduler: scheduleDistribution,
    });

    return res.status(201).json({
      success: true,
      distribution: {
        id: result.distribution._id,
        channel: result.distribution.channel,
        source: result.distribution.source,
        status: result.distribution.status,
        scheduledAt: result.distribution.scheduledAt,
      },
      queue: result.queue,
    });
  } catch (error) {
    console.error("ERRO CREATE INSTAGRAM DISTRIBUTION:", error.message);
    return res.status(error.statusCode || 500).json({
      success: false,
      error:
        error.statusCode
          ? error.message
          : "Nao foi possivel agendar o Reel no Instagram.",
    });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const {
      campaignId,
      destinationId,
      text,
      scheduledAt,
      channel = "telegram",
    } = req.body;

    const cleanChannel = String(channel)
      .trim()
      .toLowerCase();

    if (cleanChannel !== "telegram") {
      return res.status(400).json({
        success: false,
        error:
          "Canal ainda nao disponivel para criacao manual.",
      });
    }

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

    const trackingUrl =
      `${process.env.BASE_URL}/campaigns/r/${campaignId}`;

    const telegramMessage =
      `${cleanText}\n\n${trackingUrl}`;

    if (telegramMessage.length > 4096) {
      return res.status(400).json({
        success: false,
        error:
          "Mensagem final excede o limite de 4096 caracteres do Telegram.",
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
      provider: cleanChannel,
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
      channel: cleanChannel,
      destinationId: cleanDestinationId,

      content: {
        text: cleanText,
        trackingUrl,
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


/**
 * Listar divulgações do usuário autenticado
 */
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const status = String(req.query.status || "").trim();

    const filter = {
      userId,
    };

    const allowedStatuses = [
      "draft",
      "scheduled",
      "processing",
      "published",
      "failed",
      "cancelled",
    ];

    if (status) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: "Status inválido.",
        });
      }

      filter.status = status;
    }

    const distributions = await Distribution.find(filter)
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json({
      success: true,
      total: distributions.length,
      distributions,
    });
  } catch (error) {
    console.error(
      "ERRO LIST DISTRIBUTIONS:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error: "Erro interno ao listar divulgações.",
    });
  }
});

/**
 * Consultar uma divulgação do usuário autenticado
 */
router.get("/:id", protect, async (req, res) => {
  try {
    const distribution = await Distribution.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).lean();

    if (!distribution) {
      return res.status(404).json({
        success: false,
        error: "Divulgação não encontrada.",
      });
    }

    return res.status(200).json({
      success: true,
      distribution,
    });
  } catch (error) {
    console.error(
      "ERRO GET DISTRIBUTION:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error: "Erro interno ao consultar divulgação.",
    });
  }
});
/**
 * Cancelar divulgação agendada
 */
router.patch("/:id/cancel", protect, async (req, res) => {
  try {
    const distributionId = req.params.id;
    const userId = req.user._id;

    const existingDistribution =
      await Distribution.findOne({
        _id: distributionId,
        userId,
      }).lean();

    if (!existingDistribution) {
      return res.status(404).json({
        success: false,
        error: "Divulgação não encontrada.",
      });
    }

    if (existingDistribution.status !== "scheduled") {
      return res.status(409).json({
        success: false,
        error:
          "Somente divulgações agendadas podem ser canceladas.",
      });
    }

    const cancelledDistribution =
      await Distribution.findOneAndUpdate(
        {
          _id: distributionId,
          userId,
          status: "scheduled",
        },
        {
          $set: {
            status: "cancelled",
          },
        },
        {
          new: true,
        }
      ).lean();

    if (!cancelledDistribution) {
      return res.status(409).json({
        success: false,
        error:
          "A divulgação não está mais disponível para cancelamento.",
      });
    }

    try {
      const job = await distributionQueue.getJob(
        String(distributionId)
      );

      if (job) {
        await job.remove();
      }
    } catch (queueError) {
      console.warn(
        "AVISO CANCEL DISTRIBUTION QUEUE:",
        queueError.message
      );
    }

    return res.status(200).json({
      success: true,
      distribution: cancelledDistribution,
    });
  } catch (error) {
    console.error(
      "ERRO CANCEL DISTRIBUTION:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error: "Erro interno ao cancelar divulgação.",
    });
  }
});
/**
 * Reprocessar divulgação que falhou
 */
router.patch("/:id/retry", protect, async (req, res) => {
  try {
    const distributionId = req.params.id;
    const userId = req.user._id;

    const MAX_TOTAL_ATTEMPTS = 5;

    const distribution = await Distribution.findOne({
      _id: distributionId,
      userId,
    }).lean();

    if (!distribution) {
      return res.status(404).json({
        success: false,
        error: "Divulgação não encontrada.",
      });
    }

    if (distribution.status !== "failed") {
      return res.status(409).json({
        success: false,
        error:
          "Somente divulgações com falha podem ser reprocessadas.",
      });
    }

    if (distribution.attempts >= MAX_TOTAL_ATTEMPTS) {
      return res.status(409).json({
        success: false,
        error:
          "Limite máximo de tentativas atingido.",
      });
    }

    const existingJob = await distributionQueue.getJob(
      String(distributionId)
    );

    if (existingJob) {
      const jobState = await existingJob.getState();

      if (jobState === "failed") {
        await existingJob.remove();
      } else {
        return res.status(409).json({
          success: false,
          error:
            "Já existe uma execução ativa ou pendente para esta divulgação.",
        });
      }
    }

    const remainingAttempts =
      MAX_TOTAL_ATTEMPTS - distribution.attempts;

    const retryAttempts = Math.min(
      3,
      remainingAttempts
    );

    const retryAt = new Date();

    const scheduledDistribution =
      await Distribution.findOneAndUpdate(
        {
          _id: distributionId,
          userId,
          status: "failed",
          attempts: {
            $lt: MAX_TOTAL_ATTEMPTS,
          },
        },
        {
          $set: {
            status: "scheduled",
            scheduledAt: retryAt,
            lastError: null,
          },
        },
        {
          new: true,
        }
      );

    if (!scheduledDistribution) {
      return res.status(409).json({
        success: false,
        error:
          "A divulgação não está mais disponível para retry.",
      });
    }

    try {
      const queueResult = await scheduleDistribution({
        distributionId,
        scheduledAt: retryAt,
        attempts: retryAttempts,
      });

      return res.status(200).json({
        success: true,
        distribution: scheduledDistribution,
        retry: {
          jobId: queueResult.jobId,
          attemptsAllowed: retryAttempts,
          maxTotalAttempts: MAX_TOTAL_ATTEMPTS,
        },
      });
    } catch (queueError) {
      await Distribution.findOneAndUpdate(
        {
          _id: distributionId,
          userId,
          status: "scheduled",
        },
        {
          $set: {
            status: "failed",
            lastError:
              "Falha ao reagendar divulgação.",
          },
        }
      );

      throw queueError;
    }
  } catch (error) {
    console.error(
      "ERRO RETRY DISTRIBUTION:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error:
        "Erro interno ao reprocessar divulgação.",
    });
  }
});
export default router;
