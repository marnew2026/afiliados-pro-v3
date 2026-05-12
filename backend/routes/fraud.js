import express from "express";
import Click from "../models/Click.js";
import { detectFraud } from "../services/fraudDetector.js";

const router = express.Router();

router.get("/scan/:affiliateId", async (req, res) => {
  const clicks = await Click.find({
    affiliateId: req.params.affiliateId
  });

  const analyzed = clicks.map(c => {
    const result = detectFraud({
      ip: c.ip,
      userAgent: c.userAgent,
      clickCountLastMinute: c.clickCount || 0
    });

    return {
      ...c._doc,
      fraud: result
    };
  });

  res.json(analyzed);
});

export default router;