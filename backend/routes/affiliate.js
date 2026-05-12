import express from "express";
import Sale from "../models/Sale.js";

const router = express.Router();

router.get("/:affiliateId", async (req, res) => {
  try {
    const { affiliateId } = req.params;

    const sales = await Sale.find({ affiliateId });

    const totalSales = sales.length;

    const totalEarnings = sales.reduce((sum, sale) => {
      return sum + (sale.commission || 0);
    }, 0);

    res.json({
      affiliateId,
      totalSales,
      totalEarnings,
      sales
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;