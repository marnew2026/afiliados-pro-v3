import express from "express";
import Withdraw from "../models/Withdraw.js";
import Campaign from "../models/Campaign.js";
import { sendPix } from "../services/pixService.js";

const router = express.Router();

/*
====================================
CRIAR SAQUE
====================================
*/
router.post("/", async (req, res) => {
  try {
    console.log("NOVA SOLICITAÇÃO DE SAQUE");
    console.log(req.body);

    const { userEmail, pixKey, amount } = req.body;

    if (!userEmail || !pixKey || !amount) {
      return res.status(400).json({
        error: "Dados inválidos",
      });
    }

    const value = Number(amount);

    if (isNaN(value) || value <= 0) {
      return res.status(400).json({
        error: "Valor inválido",
      });
    }

    const pending = await Withdraw.findOne({
      userEmail,
      status: {
        $in: ["pending", "processing"],
      },
    });

    if (pending) {
      return res.status(400).json({
        error: "Já existe saque pendente",
      });
    }

    const campaigns = await Campaign.find({
      userEmail,
    });

    const totalEarnings = campaigns.reduce(
      (acc, c) => acc + Number(c.earnings || 0),
      0
    );

    const approvedWithdraws = await Withdraw.find({
      userEmail,
      status: "approved",
    });

    const totalWithdrawn = approvedWithdraws.reduce(
      (acc, w) => acc + Number(w.amount || 0),
      0
    );

    const balance = Number(
      (totalEarnings - totalWithdrawn).toFixed(2)
    );

    console.log("TOTAL EARNINGS:", totalEarnings);
    console.log("TOTAL WITHDRAWN:", totalWithdrawn);
    console.log("BALANCE:", balance);
    console.log("AMOUNT:", value);

    if (value > balance) {
      return res.status(400).json({
        error: "Saldo insuficiente",
      });
    }

    const withdraw = await Withdraw.create({
      userEmail,
      pixKey,
      amount: value,
      status: "pending",
    });

    console.log("SAQUE CRIADO");
    console.log(withdraw);

    return res.json(withdraw);

  } catch (err) {
    console.log("WITHDRAW ERROR:");
    console.log(err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

/*
====================================
ADMIN LISTAR SAQUES
====================================
*/
router.get("/admin", async (req, res) => {
  try {

    const withdraws = await Withdraw.find()
      .sort({ createdAt: -1 });

    return res.json(withdraws);

  } catch (err) {

    return res.status(500).json({
      error: err.message,
    });
  }
});

/*
====================================
HISTÓRICO USUÁRIO
====================================
*/
router.get("/:email", async (req, res) => {
  try {

    const withdraws = await Withdraw.find({
      userEmail: req.params.email,
    }).sort({
      createdAt: -1,
    });

    return res.json(withdraws);

  } catch (err) {

    return res.status(500).json({
      error: err.message,
    });
  }
});

/*
====================================
PROCESSAR PIX
====================================
*/
router.post("/:id/process", async (req, res) => {

  let withdraw;

  try {

    withdraw = await Withdraw.findById(
      req.params.id
    );

    if (!withdraw) {
      return res.status(404).json({
        error: "Saque não encontrado",
      });
    }

    withdraw.status = "processing";
    await withdraw.save();

    const pix = await sendPix({
      pixKey: withdraw.pixKey,
      amount: withdraw.amount,
    });

    console.log("ASAAS RESPONSE:");
    console.log(JSON.stringify(pix, null, 2));

    withdraw.externalId = pix.id;
    withdraw.status = "approved";
    withdraw.paidAt = new Date();

    await withdraw.save();

    return res.json({
      success: true,
      pix,
    });

  } catch (err) {

    console.log("PIX ERROR:");
    console.log(err?.response?.data || err.message);

    if (withdraw) {
      withdraw.status = "failed";
      withdraw.errorMessage = err.message;
      await withdraw.save();
    }

    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;