import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const affiliateLink =
      `https://afiliados-pro-v3-2.onrender.com/r/${code}`;

    const campaign = await Campaign.findOne({
      affiliateLink,
    });

    if (!campaign) {
      return res.status(404).send("Link inválido");
    }

    campaign.clicks =
      (campaign.clicks || 0) + 1;

    campaign.earnings =
      (campaign.earnings || 0) +
      (campaign.commission || 0.1);

    await campaign.save();

    console.log(
      "🔥 CLICK:",
      campaign.nome
    );

    return res.redirect(campaign.link);

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;