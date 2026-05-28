import { sendPix } from "../services/pixService.js";
import express from "express";
import Withdraw from "../models/Withdraw.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

/**
 * 🔥 CRIAR SAQUE
 */
router.post("/", async (req, res) => {
  try {
    const { userEmail, pixKey, amount } = req.body;

    // validações básicas
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

    // verifica saque pendente/processando
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

    // campanhas
    

    // total ganhos
    const totalEarnings = campaigns.reduce(
      (acc, c) => acc + (c.earnings || 0),
      0
    );

    // total já sacado
    const approvedWithdraws = await Withdraw.find({
      userEmail,
      status: "approved",
    });

    const totalWithdrawn = approvedWithdraws.reduce(
      (acc, w) => acc + (w.amount || 0),
      0
    );

    // saldo real
    const balance =
      totalEarnings - totalWithdrawn;

    // valida saldo
    if (Number(amount) > balance) {
      return res.status(400).json({
        error: "Saldo insuficiente",
      });
    }

    // cria saque
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
 * 🔥 LISTAR ADMIN
 */
router.get("/admin", async (req, res) => {
  try {
    const withdraws = await Withdraw.find()
      .sort({ createdAt: -1 });

    res.json(withdraws);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

/**
 * 🔥 APROVAR SAQUE
 */
router.put("/:id/approve", async (req, res) => {
  try {
    const withdraw = await Withdraw.findById(req.params.id);

    if (!withdraw) {
      return res.status(404).json({
        error: "Saque não encontrado",
      });
    }

    withdraw.status = "approved";
    withdraw.approvedAt = new Date();

    await withdraw.save();

    res.json(withdraw);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro ao aprovar saque",
    });
  }
});
/**
 * 🔥 HISTÓRICO USUÁRIO
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
 * 🔥 PROCESSAR PIX REAL
 */
router.post("/:id/process", async (req, res) => {
  try {
    const withdraw = await Withdraw.findById(
      req.params.id
    );

    if (!withdraw) {
      return res.status(404).json({
        error: "Saque não encontrado",
      });
    }

    if (withdraw.status !== "pending") {
      return res.status(400).json({
        error: "Status inválido",
      });
    }

    // muda pra processing
    withdraw.status = "processing";

    await withdraw.save();

    // envia PIX real
    const pix = await sendPix({
      pixKey: withdraw.pixKey,
      amount: withdraw.amount,
    });

    // aprova
    withdraw.status = "approved";

    withdraw.externalId = pix.id;

    withdraw.paidAt = new Date();

    await withdraw.save();

    return res.json({
      success: true,
      pix,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;