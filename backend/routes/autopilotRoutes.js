import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import AutopilotSettings from "../models/AutopilotSettings.js";
import { runKaelAutopilotOnce } from "../services/autopilot/KaelAutopilotService.js";

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
      mode,
      dailyLimit,
      minIntervalMinutes,
    } = req.body;

    const update = {};

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
            channels: ["telegram"],
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
    const result = await runKaelAutopilotOnce(
      req.user._id
    );

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

export default router;