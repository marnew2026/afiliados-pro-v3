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
export default router;