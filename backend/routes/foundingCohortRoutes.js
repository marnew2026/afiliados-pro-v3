import express from "express";

import User from "../models/User.js";
import FoundingCohortState from "../models/FoundingCohortState.js";
import FounderActivityDay from "../models/FounderActivityDay.js";
import FounderFeedback from "../models/FounderFeedback.js";
import Campaign from "../models/Campaign.js";
import Distribution from "../models/Distribution.js";
import { protect } from "../middlewares/authMiddleware.js";
import { requireIntegrationAdmin } from "../middlewares/integrationAdminMiddleware.js";
import { getFoundingCohortConfig } from "../services/founding/FoundingCohortService.js";
import {
  buildFeedbackAdminRows,
  buildFounderAdminRows,
} from "../services/founding/FounderAdminViewService.js";

const router = express.Router();

router.get("/", protect, requireIntegrationAdmin, async (req, res) => {
  try {
    const now = new Date();
    const config = getFoundingCohortConfig();
    const [state, founders, feedbackSummary, recentFeedback] = await Promise.all([
      FoundingCohortState.findById("founding-users-v1").lean(),
      User.find({ founderTrialGrantedAt: { $ne: null } })
        .select("_id accessSource proAccessEndsAt founderTrialGrantedAt founderTrialClaimNumber")
        .lean(),
      FounderFeedback.aggregate([
        {
          $group: {
            _id: null,
            responses: { $sum: 1 },
            averageRating: { $avg: "$rating" },
            recommendCount: { $sum: { $cond: ["$wouldRecommend", 1, 0] } },
          },
        },
      ]),
      FounderFeedback.find({})
        .select("userId rating wouldRecommend mostValuable biggestDifficulty comment status createdAt updatedAt")
        .sort({ updatedAt: -1 })
        .limit(50)
        .lean(),
    ]);

    const claimed = Number(state?.claimedCount || 0);
    const founderIds = founders.map((founder) => founder._id);
    const founderById = new Map(
      founders.map((founder) => [String(founder._id), founder])
    );

    const [campaignUsers, valueUsers, kaelUsers, activityDays] = founderIds.length
      ? await Promise.all([
        Campaign.distinct("userId", { userId: { $in: founderIds } }),
        Distribution.distinct("userId", {
          userId: { $in: founderIds },
          status: { $in: ["delivered", "published"] },
        }),
        Distribution.distinct("userId", {
          userId: { $in: founderIds },
          source: "autopilot",
        }),
        FounderActivityDay.find({ userId: { $in: founderIds } })
          .select("userId day")
          .lean(),
      ])
      : [[], [], [], []];

    const retained = { day7: new Set(), day14: new Set(), day28: new Set() };
    for (const activity of activityDays) {
      const founder = founderById.get(String(activity.userId));
      if (!founder?.founderTrialGrantedAt) continue;
      const offset = Math.floor(
        (new Date(activity.day).getTime() - new Date(founder.founderTrialGrantedAt).getTime()) /
        (24 * 60 * 60 * 1000)
      );
      if (offset >= 7) retained.day7.add(String(activity.userId));
      if (offset >= 14) retained.day14.add(String(activity.userId));
      if (offset >= 28) retained.day28.add(String(activity.userId));
    }

    const activeTrials = founders.filter(
      (founder) =>
        founder.accessSource === "FOUNDER_TRIAL" &&
        founder.proAccessEndsAt &&
        new Date(founder.proAccessEndsAt) > now
    ).length;
    const expiredTrials = founders.filter(
      (founder) =>
        founder.accessSource === "FREE" ||
        (founder.accessSource === "FOUNDER_TRIAL" &&
          (!founder.proAccessEndsAt || new Date(founder.proAccessEndsAt) <= now))
    ).length;
    const convertedToStripe = founders.filter(
      (founder) => founder.accessSource === "STRIPE"
    ).length;
    const feedback = feedbackSummary[0] || {};
    const founderNumberById = new Map(
      founders.map((founder) => [String(founder._id), founder.founderTrialClaimNumber])
    );

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
        activation: {
          createdCampaign: campaignUsers.length,
          completedDistribution: valueUsers.length,
          usedKael: kaelUsers.length,
        },
        retention: {
          day7: retained.day7.size,
          day14: retained.day14.size,
          day28: retained.day28.size,
        },
        feedback: {
          responses: Number(feedback.responses || 0),
          averageRating: Number(Number(feedback.averageRating || 0).toFixed(2)),
          recommendationRate:
            feedback.responses > 0
              ? Number(((feedback.recommendCount / feedback.responses) * 100).toFixed(2))
              : 0,
        },
        founders: buildFounderAdminRows({ founders, activityDays, now }),
        recentFeedback: buildFeedbackAdminRows({
          feedbackItems: recentFeedback,
          founderNumberById,
        }),
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
