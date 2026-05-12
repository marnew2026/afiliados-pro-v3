import express from "express";
import Sale from "../models/Sale.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const sales = await Sale.find();

  const ranking = {};

  sales.forEach(s => {
    if (!ranking[s.affiliateId]) {
      ranking[s.affiliateId] = {
        affiliateId: s.affiliateId,
        revenue: 0,
        sales: 0
      };
    }

    ranking[s.affiliateId].revenue += s.commission;
    ranking[s.affiliateId].sales += 1;
  });

  const sorted = Object.values(ranking)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  res.json(sorted);
});

export default router;