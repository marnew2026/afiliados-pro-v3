import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

router.post("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(
      req.params.id
    );

    if (!campaign) {
      return res.status(404).json({
        error: "Campanha não encontrada",
      });
    }

    campaign.sales =
      (campaign.sales || 0) + 1;

    campaign.earnings =
      (campaign.earnings || 0) + 10;

    await campaign.save();

    res.json({
      success: true,
      campaign,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;