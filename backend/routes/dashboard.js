import express from "express";
import Sale from "../models/Sale.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const affiliateId = req.query.affiliateId;

    const sales = await Sale.find({ affiliateId });

    const totalSales = sales.length;

    const totalEarnings = sales.reduce(
      (sum, sale) => sum + (sale.commission || 0),
      0
    );

    res.json({
      affiliateId,
      totalSales,
      totalEarnings,
      sales,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/global", async (req, res) => {
  const sales = await Sale.find();

  const revenue = sales.reduce((a, s) => a + s.amount, 0);

  const byCountry = {};

  sales.forEach(s => {
    const c = s.country || "unknown";
    byCountry[c] = (byCountry[c] || 0) + s.amount;
  });

  res.json({
    revenue,
    sales: sales.length,
    countries: byCountry
  });
});

export default router;