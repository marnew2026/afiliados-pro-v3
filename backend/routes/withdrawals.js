import express from "express";
import Withdrawal from "../models/Withdrawal.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { userEmail, pixKey, amount } = req.body;

    if (!userEmail || !pixKey || !amount) {
      return res.json({
        msg: "Dados obrigatórios",
      });
    }

    const withdrawal = await Withdrawal.create({
      userEmail,
      pixKey,
      amount,
      status: "pendente",
      createdAt: new Date(),
    });

    res.json({
      ok: true,
      withdrawal,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Erro no saque",
    });
  }
});

export default router;