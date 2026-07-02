import express from "express";
import Campaign from "../../models/Campaign.js";

const router = express.Router();

// 📈 EVOLUÇÃO DIÁRIA
router.get("/daily/:userId", async (req, res) => {
  const { userId } = req.params;

  const campaigns = await Campaign.find({ userId });

  const map = {};

  campaigns.forEach((c) => {
    const day = new Date(c.createdAt).toISOString().split("T")[0];

    if (!map[day]) {
      map[day] = {
        clicks: 0,
        sales: 0,
      };
    }

    map[day].clicks += c.clicks || 0;
    map[day].sales += c.sales || 0;
  });

  res.json(map);
});

export default router;