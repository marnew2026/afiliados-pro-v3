import express from "express";
import Withdraw from "../models/Withdraw.js";

const router = express.Router();

/* CRIAR SAQUE */
router.post("/", async (req, res) => {
  try {
    const { userEmail, pixKey, amount } = req.body;

    const withdraw = await Withdraw.create({
      userEmail,
      pixKey,
      amount,
      status: "pending",
    });

    res.json(withdraw);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Erro ao solicitar saque",
    });
  }
});

/* ADMIN - LISTAR SAQUES */
router.get("/admin/withdraws", async (req, res) => {
  try {
    const withdraws = await Withdraw.find().sort({
      createdAt: -1,
    });

    res.json(withdraws);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro ao carregar saques",
    });
  }
});

export default router;