console.log("########################################");
console.log("🔥🔥🔥 DASHBOARD ROUTE NOVA CARREGADA");
console.log("########################################");
import express from "express";
import User from "../models/User.js";
import Campaign from "../models/Campaign.js";
import Wallet from "../models/Wallet.js";

import Withdraw from "../models/Withdraw.js";
import Ledger from "../models/Ledger.js";
import { toCents, toReais, fixMoney } from "../utils/money.js";

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
 

  console.log("=================================");
  console.log("DASHBOARD CHAMADO");
  console.log("HORÁRIO:", new Date().toLocaleTimeString());
  console.log("USER:", req.params.userId);
  console.log("ORIGIN:", req.headers.origin);
  console.log("USER-AGENT:", req.headers["user-agent"]);
  console.log("=================================");

  // resto da rota...
  console.log("========================");
console.log("DASHBOARD EXECUTOU");
console.log(new Date());
console.log(req.originalUrl);
console.log(req.headers["user-agent"]);
console.log("========================");
  
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
console.log(toReais(toCents(c.earnings || 0)));

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
const totalEarnings = toReais(
  toCents(wallet?.totalEarned || 0)
);
console.log("===== TESTE FIX MONEY =====");
console.log("RAW totalEarned:", wallet?.totalEarned);
console.log("FIXED totalEarnings:", totalEarnings);
console.log("TIPO:", typeof totalEarnings);
console.log("===========================");

const availableBalance = toReais(
  toCents(wallet?.availableBalance || 0)
);

const lockedBalance = toReais(
  toCents(wallet?.lockedBalance || 0)
);

const totalWithdrawn = toReais(
  toCents(wallet?.totalWithdrawn || 0)
);
console.log("RAW totalWithdrawn:", wallet?.totalWithdrawn);
console.log("FIXED totalWithdrawn:", totalWithdrawn);
console.log("TIPO:", typeof totalWithdrawn);
console.log("==============================");
console.log("TOTAL CLICKS:");
console.log(totalClicks);

console.log("TOTAL GANHOS:");
console.log(totalEarnings);

console.log("SALDO DISPONÍVEL:");
console.log(availableBalance);

console.log("TOTAL SACADO:");
console.log(totalWithdrawn);

console.log("==============================");
const campaignsFixed = campaigns.map((campaign) => {
  const data = campaign.toObject();

  return {
    ...data,
    earnings: toReais(toCents(data.earnings || 0)),
  };
});
  return res.json({
  user: {
  _id: user._id,
  email: user.email,
  name: user.name,
  isPro: user.isPro,
  plan: user.plan,
  status: user.status,
},
 campaigns: campaignsFixed,

  wallet: {
    availableBalance,
    lockedBalance,
    totalEarned: totalEarnings,
    totalWithdrawn,
  },

  metrics: {
    totalClicks,
    totalEarnings,
    totalWithdrawn,
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