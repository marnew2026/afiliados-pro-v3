import express from "express";
import Sale from "../models/Sale.js";
import Click from "../models/Click.js";

const router = express.Router();

router.get("/:affiliateCode", async (req, res) => {
  try {
    const { affiliateCode } = req.params;

    const clicks = await Click.countDocuments({ affiliateId: affiliateCode });
    const sales = await Sale.find({ affiliateId: affiliateCode });

    const totalCommission = sales.reduce(
      (sum, s) => sum + (s.commission || 0),
      0
    );

    res.json({
      clicks,  conversionRate,
  totalEarnings,
  pendingBalance,
  paidBalance,
  epc: earnings / clicks,
      sales: sales.length,
      totalCommission,
      conversionRate: clicks ? (sales.length / clicks) * 100 : 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;