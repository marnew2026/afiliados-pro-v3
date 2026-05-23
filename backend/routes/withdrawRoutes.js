import express from "express";
import Withdraw from "../models/Withdraw.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const withdraw = await Withdraw.create(req.body);

    res.json(withdraw);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Erro ao criar saque",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const withdraws = await Withdraw.find()
      .sort({ createdAt: -1 });

    res.json(withdraws);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao buscar saques",
    });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const withdraws = await Withdraw.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(withdraws);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao buscar saques",
    });
  }
});

export default router;