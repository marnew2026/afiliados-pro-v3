import express from "express";
import Campaign from "../../models/Campaign.js";

const router = express.Router();

// 💰 ROI POR CAMPANHA
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const campaigns = await Campaign.find({ userId });

  const result = campaigns.map((c) => {
    const revenue = c.sales * (c.avgTicket || 0);
    const cost = c.cost || 0;

    return {
      campaignId: c._id,
      clicks: c.clicks,
      sales: c.sales,
      revenue,
      cost,
      roi: cost > 0 ? ((revenue - cost) / cost) * 100 : 0,
    };
  });

  res.json(result);
});

export default router;