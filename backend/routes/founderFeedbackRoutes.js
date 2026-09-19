import express from "express";

import FounderFeedback from "../models/FounderFeedback.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validateFounderFeedback } from "../services/founding/FounderFeedbackService.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  if (!req.user.founderTrialGrantedAt) {
    return res.status(403).json({
      success: false,
      error: "Feedback disponivel somente para usuarios fundadores.",
    });
  }

  const feedback = await FounderFeedback.findOne({ userId: req.user._id }).lean();
  return res.json({ success: true, feedback });
});

router.post("/", protect, async (req, res) => {
  try {
    if (!req.user.founderTrialGrantedAt) {
      return res.status(403).json({
        success: false,
        error: "Feedback disponivel somente para usuarios fundadores.",
      });
    }

    const validation = validateFounderFeedback(req.body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, error: validation.error });
    }
    const {
      rating,
      wouldRecommend,
      mostValuable,
      biggestDifficulty,
      comment,
    } = validation.value;

    const feedback = await FounderFeedback.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          rating,
          wouldRecommend,
          mostValuable,
          biggestDifficulty,
          comment,
          status: "new",
        },
        $setOnInsert: { userId: req.user._id },
      },
      { new: true, upsert: true, runValidators: true }
    );

    return res.json({ success: true, feedback });
  } catch (error) {
    console.error("ERRO FOUNDER FEEDBACK:", error.message);
    return res.status(500).json({
      success: false,
      error: "Nao foi possivel salvar sua opiniao.",
    });
  }
});

export default router;
