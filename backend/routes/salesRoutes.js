import express from "express";
import Sale from "../models/Sale.js";

const router = express.Router();

/**
 * 🔥 VENDAS POR AFILIADO (DEVE VIR ANTES DO :id)
 */
router.get("/affiliate/:affiliateId", async (req, res) => {
  try {
    const { affiliateId } = req.params;

    const sales = await Sale.find({ affiliateId })
      .sort({ createdAt: -1 })
      .lean();

    const totalCommission = sales.reduce(
      (sum, s) => sum + (Number(s.commission) || 0),
      0
    );

    res.json({
      sales,
      totalSales: sales.length,
      totalCommission,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 🔥 LISTAR TODAS VENDAS (ADMIN)
 */
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar vendas" });
  }
});

/**
 * 🔥 BUSCAR POR ID
 */
router.get("/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({ error: "Venda não encontrada" });
    }

    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;