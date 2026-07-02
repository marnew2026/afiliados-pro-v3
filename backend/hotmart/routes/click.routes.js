import express from "express";
import Click from "../../models/Click.js";

const router = express.Router();

// Tracking de clique básico
router.get("/:campaignId", async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { ref } = req.query;

    await Click.create({
      campaignId,
      userId: ref || null,
      ip: req.ip,
      userAgent: req.headers["user-agent"] || "",
      riskScore: 0,
      isBot: false,
      blocked: false,
    });

    res.json({
      success: true,
      campaignId,
      affiliate: ref,
    });
  } catch (err) {
    console.error("Erro click tracking:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;