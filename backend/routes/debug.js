import express from "express";
import Sale from "../models/Sale.js";

const router = express.Router();

router.get("/debug-sale", async (req, res) => {
  try {
    const sale = await Sale.create({
      productId: "TESTE",
      productName: "TESTE PRODUTO",
      producerId: "TESTE",
      affiliateId: "TESTE",
      buyerEmail: "teste@teste.com",
      amount: 100,
      commission: 50,
      stripeSessionId: "TESTE",
    });

    console.log("🔥 SALE CRIADA:", sale);

    res.json(sale);
  } catch (err) {
    console.log("❌ ERRO MONGO:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;