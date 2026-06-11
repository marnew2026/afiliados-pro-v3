import express from "express";
import { requestWithdraw } from "../services/withdrawService.js";
import Withdraw from "../models/Withdraw.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    const userId = req.user.id;
    const { amount, pixKey } = req.body;

    const value = Number(String(amount).replace(",", "."));

    if (isNaN(value) || value <= 0) {
      return res.status(400).json({ error: "Valor inválido" });
    }

    if (!pixKey) {
      return res.status(400).json({ error: "PIX obrigatório" });
    }

    const pendingWithdraw = await Withdraw.findOne({
      userId,
      status: "processing",
    });

    if (pendingWithdraw) {
      return res.status(400).json({
        error: "Você já tem um saque em andamento",
      });
    }

    const withdraw = await requestWithdraw({
      userId,
      amount: value,
      pixKey,
    });

    return res.json({
      success: true,
      withdraw,
    });

  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

export default router;