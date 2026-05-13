import express from "express";
import Sale from "../models/Sale.js";
import Click from "../models/Click.js";

const router = express.Router();

/* NORMALIZAÇÃO (MUITO IMPORTANTE) */
const normalize = (v) => (v || "").toLowerCase().trim();

router.get("/:affiliateId", async (req, res) => {
  try {
    const affiliateId = normalize(req.params.affiliateId);

    const clicks = await Click.countDocuments({
      affiliateId: new RegExp(`^${affiliateId}$`, "i"),
    });

    const sales = await Sale.find({
      affiliateId: new RegExp(`^${affiliateId}$`, "i"),
    });

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
    res.status(500).json({ error: err.message });
  }
});

export default router;