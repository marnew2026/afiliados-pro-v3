import express from "express";
import Sale from "../models/Sale.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar vendas" });
  }
});

export default router;