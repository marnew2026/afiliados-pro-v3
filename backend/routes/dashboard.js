import express from "express";
import Sale from "../models/Sale.js";
import Click from "../models/Click.js";

const router = express.Router();

router.get("/:affiliateCode", async (req, res) => {
  try {
    const { affiliateCode } = req.params;

    const clicks = await Click.countDocuments({
      affiliateId: affiliateCode,
    });

    const sales = await Sale.find({
      affiliateId: affiliateCode,
    });

    const totalEarnings = sales.reduce(
      (sum, sale) => sum + Number(sale.commission || 0),
      0
    );

    const conversionRate =
      clicks > 0 ? (sales.length / clicks) * 100 : 0;

    const pendingBalance = totalEarnings;
    const paidBalance = 0;
    const epc = clicks > 0 ? totalEarnings / clicks : 0;

    res.json({
      clicks,
      sales: sales.length,
      totalEarnings,
      pendingBalance,
      paidBalance,
      conversionRate,
      epc,
    });
  } catch (err) {
    console.log("❌ DASHBOARD ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;