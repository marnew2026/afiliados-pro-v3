import express from "express";
import Sale from "../models/Sale.js";
import Click from "../models/Click.js";

const router = express.Router();

router.get("/:affiliateId", async (req, res) => {
  try {
    const { affiliateId } = req.params;

    const clicks = await Click.countDocuments({ affiliateId });
    const sales = await Sale.find({ affiliateId });

    const totalCommission = sales.reduce(
      (sum, sale) => sum + (sale.commission || 0),
      0
    );

    res.json({
      clicks,
      sales: sales.length,
      totalCommission,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;