import express from "express";
import Withdrawal from "../models/Withdrawal.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    console.log("BODY RECEBIDO:", req.body);

    const { userEmail, pixKey, amount } = req.body;

    console.log(userEmail);
    console.log(pixKey);
    console.log(amount);

    if (!userEmail || !pixKey || !amount) {
      return res.json({
        msg: "dados obrigatorios",
      });
    }

    res.json({
      ok: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "erro servidor",
    });
  }
});
app.post("/withdraw", async (req, res) => {
  try {
    const { userEmail, pixKey, amount } = req.body;

    if (!userEmail || !pixKey || !amount) {
      return res.status(400).json({
        message: "Dados incompletos",
      });
    }

    console.log("NOVO SAQUE:");
    console.log(userEmail);
    console.log(pixKey);
    console.log(amount);

    return res.json({
      success: true,
      message: "Saque solicitado com sucesso",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Erro interno no saque",
    });
  }
});
export default router;