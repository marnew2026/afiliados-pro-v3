import express from "express";
import { requestWithdraw } from "../services/withdrawService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userEmail, amount, pixKey } = req.body;

    const withdraw = await requestWithdraw({
      userEmail,
      amount,
      pixKey,
    });

    res.json({
      success: true,
      withdraw,
    });

  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

export default router;