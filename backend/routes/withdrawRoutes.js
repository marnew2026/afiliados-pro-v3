import express from "express";
import Withdraw from "../models/Withdraw.js";
import Campaign from "../models/Campaign.js";
const router = express.Router();

/* CRIAR SAQUE */
router.post("/", async (req, res) => {
  try {
    const { userEmail, pixKey, amount } = req.body;
    if (!amount || amount <= 0) {
  return res.status(400).json({
    error: "Valor inválido",
  });
}
    const withdraw = await Withdraw.create({
      userEmail,
      pixKey,
      amount,
      status: "pending",
    });

    await Campaign.updateMany(
      {
        userEmail,
      },
      {
        $inc: {
          earnings: -amount,
        },
      }
    );

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
/* ADMIN - APROVAR SAQUE */
router.put("/:id/approve", async (req, res) => {
  try {
    const withdraw = await Withdraw.findById(req.params.id);

    if (!withdraw) {
      return res.status(404).json({
        error: "Saque não encontrado",
      });
    }

    withdraw.status = "approved";

    await withdraw.save();

    res.json(withdraw);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Erro ao aprovar saque",
    });
  }
});
export default router;