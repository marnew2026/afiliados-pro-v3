import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import AutopilotSettings from "../models/AutopilotSettings.js";
import { runKaelAutopilotOnce } from "../services/autopilot/KaelAutopilotService.js";
import {
  runKaelMediaGenerationRecoveryOnce,
} from "../services/media/generation/KaelMediaGenerationRecoveryService.js";

const router = express.Router();

router.get("/settings", protect, async (req, res) => {
  try {
    const settings = await AutopilotSettings.findOne({
      userId: req.user._id,
    }).lean();

    if (!settings) {
      return res.json({
        success: true,
        settings: null,
      });
    }

    return res.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(
      "Erro ao consultar configuracoes do KAEL Autopilot:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error: "Falha ao consultar configuracoes do Autopilot.",
    });
  }
});

router.put("/settings", protect, async (req, res) => {
  try {
    const {
      enabled,
      linkAutomation,
      mode,
      dailyLimit,
      minIntervalMinutes,
      channels,
    } = req.body;

    const update = {};
    if (linkAutomation !== undefined) {
      if (typeof linkAutomation !== "boolean") return res.status(400).json({ success: false, error: "Configuracao automatica invalida." });
      if (linkAutomation && enabled !== false && process.env.KAEL_LINK_AUTOMATION_ENABLED !== "true") return res.status(503).json({ success: false, error: "Divulgacao automatica de links ainda nao habilitada neste servidor." });
      update.linkAutomation = linkAutomation;
    }
    if (channels !== undefined) {
      const allowed = ["telegram", "instagram", "facebook", "tiktok", "kwai"];
      if (!Array.isArray(channels) || !channels.length || channels.some((c) => !allowed.includes(c))) {
        return res.status(400).json({ success: false, error: "Canais do Autopilot invalidos." });
      }
      if (channels.some((c) => c !== "telegram") && process.env.KAEL_VIDEO_AUTOPILOT_ENABLED !== "true") {
        return res.status(400).json({ success: false, error: "Autopilot de video ainda nao habilitado." });
      }
      update.channels = [...new Set(channels)];
    }

    if (typeof enabled === "boolean") {
      update.enabled = enabled;
    }

    if (
      mode !== undefined &&
      !["assistido", "automatico"].includes(mode)
    ) {
      return res.status(400).json({
        success: false,
        error: "Modo de Autopilot invalido.",
      });
    }

    if (mode !== undefined) {
      update.mode = mode;
    }

    if (dailyLimit !== undefined) {
      const parsedDailyLimit = Number(dailyLimit);

      if (
        !Number.isInteger(parsedDailyLimit) ||
        parsedDailyLimit < 1 ||
        parsedDailyLimit > 10
      ) {
        return res.status(400).json({
          success: false,
          error: "dailyLimit deve estar entre 1 e 10.",
        });
      }

      update.dailyLimit = parsedDailyLimit;
    }

    if (minIntervalMinutes !== undefined) {
      const parsedInterval =
        Number(minIntervalMinutes);

      if (
        !Number.isInteger(parsedInterval) ||
        parsedInterval < 30
      ) {
        return res.status(400).json({
          success: false,
          error:
            "minIntervalMinutes deve ser no minimo 30.",
        });
      }

      update.minIntervalMinutes = parsedInterval;
    }

    const settings =
      await AutopilotSettings.findOneAndUpdate(
        {
          userId: req.user._id,
        },
        {
          $set: update,
          $setOnInsert: {
            userId: req.user._id,
            ...(update.channels ? {} : { channels: ["telegram"] }),
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        }
      );

    return res.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(
      "Erro ao atualizar configuracoes do KAEL Autopilot:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error:
        "Falha ao atualizar configuracoes do Autopilot.",
    });
  }
});

router.post("/run-once", protect, async (req, res) => {
  try {
    const channel = req.body?.channel ?? "telegram";
    if (!["telegram", "instagram", "facebook", "tiktok", "kwai"].includes(channel)) {
      return res.status(400).json({ success: false, error: "Canal do Autopilot invalido." });
    }
    const result = await runKaelAutopilotOnce(req.user._id, { channel });

    return res.json(result);
  } catch (error) {
    console.error(
      "Erro ao executar KAEL Autopilot:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error: "Falha ao executar o KAEL Autopilot.",
    });
  }
});

router.post(
  "/media-recovery/run-once",
  protect,
  async (req, res) => {
    try {
      const result =
        await runKaelMediaGenerationRecoveryOnce({
          userId: req.user._id,
          limit: req.body?.limit ?? 3,
        });

      return res.json(result);
    } catch (error) {
      console.error(
        "Erro ao executar recovery de midia do KAEL:",
        error.message
      );

      const invalidLimit =
        error.message.includes("Limite do recovery");

      return res.status(invalidLimit ? 400 : 500).json({
        success: false,
        error: invalidLimit
          ? error.message
          : "Falha ao executar recovery de midia do KAEL.",
      });
    }
  }
);

export default router;
