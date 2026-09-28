import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { scheduleDistribution } from "../queue/distributionQueue.js";
import { createInstagramDistribution } from "../services/distribution/CreateInstagramDistributionService.js";
import { renderInstagramReviewPage } from "../services/review/InstagramReviewPage.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.set(
    "Content-Security-Policy",
    "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'"
  );
  res.set("Referrer-Policy", "no-referrer");
  res.set("X-Content-Type-Options", "nosniff");
  return res.status(200).type("html").send(renderInstagramReviewPage());
});

router.post("/publish", protect, async (req, res) => {
  try {
    const reviewerEmail = String(process.env.INSTAGRAM_REVIEWER_EMAIL || "")
      .trim()
      .toLowerCase();
    const authenticatedEmail = String(req.user?.email || "")
      .trim()
      .toLowerCase();

    if (!reviewerEmail || !authenticatedEmail || authenticatedEmail !== reviewerEmail) {
      return res.status(403).json({
        success: false,
        error: "Usuario nao autorizado para o review do Instagram.",
      });
    }

    const result = await createInstagramDistribution({
      userId: req.user._id,
      campaignId: req.body.campaignId,
      mediaAssetId: req.body.mediaAssetId,
      caption: req.body.caption,
      hashtags: req.body.hashtags,
      cta: req.body.cta,
      review: true,
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
    console.error("ERRO CREATE INSTAGRAM REVIEW DISTRIBUTION:", error.message);
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.statusCode
        ? error.message
        : "Nao foi possivel agendar o Reel de review no Instagram.",
    });
  }
});

export default router;
