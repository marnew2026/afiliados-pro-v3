import express from "express";
import Withdrawal from "../models/Withdrawal.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const withdraws = await Withdrawal.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(withdraws);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Erro ao buscar saques",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userEmail, amount, pixKey } = req.body;

    const withdraw = await Withdrawal.create({
      userEmail,
      amount,
      pixKey,
    });

    res.json(withdraw);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Erro ao solicitar saque",
    });
  }
});

export default router;