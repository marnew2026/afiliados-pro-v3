import express from "express";

import User from "../models/User.js";
import FoundingCohortState from "../models/FoundingCohortState.js";
import { protect } from "../middlewares/authMiddleware.js";
import { requireIntegrationAdmin } from "../middlewares/integrationAdminMiddleware.js";
import { getFoundingCohortConfig } from "../services/founding/FoundingCohortService.js";

const router = express.Router();

router.get("/", protect, requireIntegrationAdmin, async (req, res) => {
  try {
    const now = new Date();
    const config = getFoundingCohortConfig();
    const [state, activeTrials, expiredTrials, convertedToStripe] = await Promise.all([
      FoundingCohortState.findById("founding-users-v1").lean(),
      User.countDocuments({
        accessSource: "FOUNDER_TRIAL",
        proAccessEndsAt: { $gt: now },
      }),
      User.countDocuments({
        founderTrialGrantedAt: { $ne: null },
        $or: [
          { accessSource: "FREE" },
          {
            accessSource: "FOUNDER_TRIAL",
            proAccessEndsAt: { $lte: now },
          },
        ],
      }),
      User.countDocuments({
        founderTrialGrantedAt: { $ne: null },
        accessSource: "STRIPE",
      }),
    ]);

    const claimed = Number(state?.claimedCount || 0);

    return res.json({
      success: true,
      cohort: {
        enabled: config.enabled,
        limit: config.limit,
        durationDays: config.durationDays,
        startsAt: config.startsAt,
        endsAt: config.endsAt,
        claimed,
        remaining: Math.max(config.limit - claimed, 0),
        activeTrials,
        expiredTrials,
        convertedToStripe,
        conversionRate:
          claimed > 0
            ? Number(((convertedToStripe / claimed) * 100).toFixed(2))
            : 0,
      },
    });
  } catch (error) {
    console.error("ERRO FOUNDING COHORT SUMMARY:", error.message);
    return res.status(500).json({
      success: false,
      error: "Nao foi possivel carregar as metricas dos fundadores.",
    });
  }
});

export default router;
