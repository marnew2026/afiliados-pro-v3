import { sendPix } from "../services/pixService.js";
import express from "express";
import Withdraw from "../models/Withdraw.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

/**
 * CRIAR SAQUE
 */
router.post("/", async (req, res) => {
  try {
    const { userEmail, pixKey, amount } = req.body;

    if (!userEmail || !pixKey || !amount) {
      return res.status(400).json({
        error: "Dados inválidos",
      });
    }

    if (Number(amount) <= 0) {
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
      (acc, c) => acc + (c.earnings || 0),
      0
    );

    const approvedWithdraws = await Withdraw.find({
      userEmail,
      status: "approved",
    });

    const totalWithdrawn = approvedWithdraws.reduce(
      (acc, w) => acc + (w.amount || 0),
      0
    );

    const balance =
      totalEarnings - totalWithdrawn;

    if (Number(amount) > balance) {
      return res.status(400).json({
        error: "Saldo insuficiente",
      });
    }

    const withdraw = await Withdraw.create({
      userEmail,
      pixKey,
      amount: Number(amount),
      status: "pending",
    });

    return res.json(withdraw);

  } catch (err) {

    console.log("WITHDRAW ERROR:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

/**
 * LISTAR SAQUES ADMIN
 */
router.get("/admin", async (req, res) => {
  try {

    const { email } = req.query;

    if (
      email !== "marielsantana@bol.com.br"
    ) {
      return res.status(403).json({
        error: "Acesso negado",
      });
    }

    const withdraws = await Withdraw.find()
      .sort({ createdAt: -1 });

    return res.json(withdraws);

  } catch (err) {

    return res.status(500).json({
      error: err.message,
    });
  }
});

/**
 * APROVAR SAQUE
 */
router.put("/:id/approve", async (req, res) => {
  try {

    const withdraw = await Withdraw.findById(
      req.params.id
    );

    if (!withdraw) {
      return res.status(404).json({
        error: "Saque não encontrado",
      });
    }

    withdraw.status = "approved";
    withdraw.approvedAt = new Date();

    await withdraw.save();

    return res.json(withdraw);

  } catch (err) {

    return res.status(500).json({
      error: "Erro ao aprovar saque",
    });
  }
});

/**
 * HISTÓRICO DO USUÁRIO
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

/**
 * PROCESSAR PIX REAL
 */
router.post("/:id/process", async (req, res) => {

  let withdraw;

  try {

    const { email } = req.body;

    if (
      email !== "marielsantana@bol.com.br"
    ) {
      return res.status(403).json({
        error: "Acesso negado",
      });
    }

    withdraw = await Withdraw.findById(
  req.params.id
);

console.log("PIX PROCESS REQUEST");
console.log("ID:", req.params.id);

console.log("BODY:", {
  pixKey: withdraw.pixKey,
  amount: withdraw.amount
});

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

    withdraw.status = "approved";
    withdraw.externalId = pix.id;
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