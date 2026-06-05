import express from "express";
import Campaign from "../models/Campaign.js";
import Ledger from "../models/Ledger.js";

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

    await Ledger.create({
  userEmail: campaign.userEmail,
  type: "credit",
  amount: 10,
  source: "campaign",
  referenceId: campaign._id,
});

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