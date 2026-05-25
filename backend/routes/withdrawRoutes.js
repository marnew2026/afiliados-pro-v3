import express from "express";

const router = express.Router();

import Withdraw from "../models/Withdraw.js";

/* CRIAR SAQUE */

router.post("/", async (req, res) => {
  try {
    const withdraw = await Withdraw.create(req.body);

    res.json(withdraw);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* LISTAR SAQUES */

router.get("/", async (req, res) => {
  try {
    const withdraws = await Withdraw.find().sort({
      createdAt: -1,
    });

    res.json(withdraws);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;