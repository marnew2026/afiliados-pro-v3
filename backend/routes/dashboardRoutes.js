console.log("########################################");
console.log("🔥🔥🔥 DASHBOARD ROUTE NOVA CARREGADA");
console.log("########################################");
import express from "express";
import User from "../models/User.js";
import Campaign from "../models/Campaign.js";
import Wallet from "../models/Wallet.js";

import Withdraw from "../models/Withdraw.js";
import Ledger from "../models/Ledger.js";

const router = express.Router();
router.get("/debug/finance/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("PARAM:", userId);
    const user = await User.findById(userId);
  
console.log("USER:", user);
   const mongoUserId = user._id.toString();

const campaigns = await Campaign.find({
  userId: mongoUserId,
});

const wallet = await Wallet.findOne({
  userId: mongoUserId,
});

const withdraws = await Withdraw.find({
  userId: mongoUserId,
});

const ledger = await Ledger.find({
  userId: mongoUserId,
});

    return res.json({
  wallet,
  withdrawCount: withdraws.length,
  ledgerCount: ledger.length,
  withdraws,
  ledger,
});
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


router.get("/debug/ledger-total/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const credits = await Ledger.aggregate([
      {
        $match: {
          userId,
          type: "credit",
          status: "confirmed",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const debits = await Ledger.aggregate([
      {
        $match: {
          userId,
          type: "debit",
          status: "confirmed",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      credits: credits[0]?.total || 0,
      debits: debits[0]?.total || 0,
      balance:
        (credits[0]?.total || 0) -
        (debits[0]?.total || 0),
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/:userId", async (req, res) => {
  
  try {
    console.log("==================================");
console.log("🔥 DASHBOARD");
console.log("==================================");

console.log("USER:");
console.log(req.params.userId);
    const { userId } = req.params;


    // Lista todos os usuários cadastrados
    

  // Procura o usuário pelo _id do MongoDB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    // Busca campanhas
    const campaigns = await Campaign.find({
      userId: user._id,
    });
    console.log("==============================");
console.log("CAMPANHAS ENCONTRADAS:");
console.log(campaigns.length);

campaigns.forEach((c) => {

  console.log("----------------");

  console.log("Nome:");
  console.log(c.nome);

  console.log("Clicks:");
  console.log(c.clicks);

  console.log("Ganhos:");
  console.log(c.earnings);

});

console.log("==============================");

    // Busca carteira
    const wallet = await Wallet.findOne({
      userId: user._id,
    });

    const totalClicks = campaigns.reduce(
      (acc, c) => acc + (c.clicks || 0),
      0
    );
    const totalEarnings = wallet?.totalEarned || 0;

console.log("==============================");
console.log("TOTAL CLICKS:");
console.log(totalClicks);

console.log("TOTAL GANHOS:");
console.log(totalEarnings);

console.log("SALDO DISPONÍVEL:");
console.log(wallet?.availableBalance || 0);

console.log("==============================");

    return res.json({
      user,
      campaigns: campaigns || [],
      wallet: {
        availableBalance: wallet?.availableBalance || 0,
      },
      metrics: {
        totalClicks,
        totalEarnings: wallet?.totalEarned || 0,
      },
    });

  } catch (err) {
   
    console.error(err);

    return res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
});

export default router;