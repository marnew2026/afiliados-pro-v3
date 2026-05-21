import express from "express";
import Withdrawal from "../models/Withdrawal.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

/* CRIAR SAQUE */
router.post("/create", async (req, res) => {
  try {
    const { userEmail, pixKey, amount } = req.body;

    if (!userEmail || !pixKey || !amount) {
      return res.status(400).json({
        msg: "Dados obrigatórios",
      });
    }

    const campanhas = await Campaign.find({
      userEmail,
    });

    const saldo = campanhas.reduce(
      (acc, item) => acc + (item.earnings || 0),
      0
    );

    const saques = await Withdrawal.find({
      userEmail,
      status: "approved",
    });

    const totalSacado = saques.reduce(
      (acc, item) => acc + (item.amount || 0),
      0
    );

    const disponivel = saldo - totalSacado;

    if (amount > disponivel) {
      return res.status(400).json({
        msg: "Saldo insuficiente",
      });
    }

    const withdrawal = await Withdrawal.create({
      userEmail,
      pixKey,
      amount,
    });

    res.json(withdrawal);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Erro saque",
    });
  }
});

/* LISTAR SAQUES */
router.get("/:email", async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({
      msg: "Erro listagem",
    });
  }
});

/* APROVAR */
router.post("/approve/:id", async (req, res) => {
  try {
    const withdrawal = await Withdrawal.findById(
      req.params.id
    );

    if (!withdrawal) {
      return res.status(404).json({
        msg: "Saque não encontrado",
      });
    }

    withdrawal.status = "approved";

    await withdrawal.save();

    res.json(withdrawal);
  } catch (error) {
    res.status(500).json({
      msg: "Erro aprovação",
    });
  }
});

export default router;