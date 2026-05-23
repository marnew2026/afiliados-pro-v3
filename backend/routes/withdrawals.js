import express from "express";
import Withdrawal from "../models/Withdrawal.js";

const router = express.Router();

router.post("/withdraw", async (req, res) => {
  try {
    const { userEmail, pixKey, amount } = req.body;

    const withdrawal = await Withdrawal.create({
      userEmail,
      pixKey,
      amount,
    });

    res.json(withdrawal);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Erro ao solicitar saque",
    });
  }
});

router.get("/withdrawals", async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().sort({
      createdAt: -1,
    });

    res.json(withdrawals);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Erro ao buscar saques",
    });
  }
});

router.put("/withdrawals/:id/approve", async (req, res) => {
  try {
    await Withdrawal.findByIdAndUpdate(req.params.id, {
      status: "approved",
    });

    res.json({
      message: "Saque aprovado",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Erro ao aprovar saque",
    });
  }
});

export default router;