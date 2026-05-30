import express from "express";
import stripe from "../services/stripe.js";
import User from "../models/User.js";
import Ledger from "../models/Ledger.js";

const router = express.Router();

router.post("/payout", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    // Anti-fraude
    if (user.riskScore < 30) {
      return res.status(403).json({
        error: "🚫 Payout bloqueado (risco alto)",
      });
    }

    if (
      user.riskScore >= 30 &&
      user.riskScore < 60
    ) {
      return res.status(403).json({
        error: "⏳ Payout em revisão manual",
      });
    }

    const balance = await Ledger.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const amount =
      balance[0]?.total || 0;

    if (amount <= 0) {
      return res.status(400).json({
        error: "Saldo insuficiente",
      });
    }

    const payout =
      await stripe.transfers.create({
        amount: Math.round(amount * 100),
        currency: "brl",
        destination:
          user.stripeAccountId,
      });

    await Ledger.create({
      userId,
      type: "payout",
      amount: -amount,
      status: "paid",
      referenceId: payout.id,
    });

    res.json({
      success: true,
      payout,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Erro ao processar payout",
    });
  }
});

export default router;