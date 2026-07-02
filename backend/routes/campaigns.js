import express from "express";

import Campaign from "../models/Campaign.js";
import Wallet from "../models/Wallet.js";
import Withdraw from "../models/Withdraw.js";
import Transaction from "../models/Transaction.js";
import { safeCreateLedger } from "../src/services/safeCreateLedger.js";
import { rebuildWallet } from "../src/services/rebuildWallet.js";

import User from "../models/User.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * 🔐 TODAS ROTAS PROTEGIDAS
 */
router.use(protect);

console.log("🔥 CAMPAIGNS ROUTE SAAS BLINDADA");

/**
 * 📊 DASHBOARD USER (USERID PADRÃO)
 */
router.get("/user", async (req, res) => {
  try {
    const userId = req.user.id;

    const campaigns = await Campaign.find({ userId }).sort({ createdAt: -1 });

    const withdrawals = await Withdraw.find({
      userId,
      status: { $in: ["pending", "paid"] },
    });

    const wallet = await Wallet.findOne({ userId });

    res.json({
      campaigns,
      totalEarnings: wallet?.totalEarned || 0,
      totalWithdrawn: wallet?.totalWithdrawn || 0,
      availableBalance: wallet?.availableBalance || 0,
      withdrawals,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🧠 CRIAR CAMPANHA (SAFE)
 */
router.post("/create", async (req, res) => {
  try {
    const userId = req.user.id;
    const { nome, link } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User inválido",
      });
    }

    const campaign = await Campaign.create({
      userId,
      nome,
      link,
      active: true,
      clicks: 0,
      earnings: 0,
      sales: 0,
    });

    return res.json(campaign);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

/**
 * 🖱 CLICK TRACKING
 */
router.post("/:id/click", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        error: "Campanha não encontrada",
      });
    }

    campaign.clicks = (campaign.clicks || 0) + 1;

    await campaign.save();

    return res.json({ clicks: campaign.clicks });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * 💰 SALE TRACKING (COM LEDGER)
 */
router.post("/:id/sale", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        error: "Campanha não encontrada",
      });
    }

    campaign.sales = (campaign.sales || 0) + 1;

    const earnings = 10;

    await campaign.save();

    await safeCreateLedger({
  userId: campaign.userId,
  type: "credit",
  amount: earnings,
  status: "confirmed",
  referenceId: `campaign-${campaign._id}`,
  source: "campaign",
});

await rebuildWallet(campaign.userId);

    await Transaction.create({
      userId: campaign.userId,
      type: "earning",
      amount: earnings,
      description: "Venda registrada",
    });
      const wallet = await Wallet.findOne({
  userId: campaign.userId,
});

if (wallet) {
  wallet.availableBalance += earnings;
  wallet.totalEarned += earnings;
  await wallet.save();
}
    return res.json({
      success: true,
      earnings,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});
router.post("/create-dev", async (req, res) => {
  try {
    const { userId, nome, link } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId obrigatório" });
    }

    const campaign = await Campaign.create({
      userId,
      nome,
      link,
      clicks: 0,
      sales: 0,
      earnings: 0,
      active: true,
    });

    return res.json(campaign);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
/**
 * 🗑 DELETE CAMPANHA
 */
router.delete("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        error: "Campanha não encontrada",
      });
    }

    await Campaign.findByIdAndDelete(req.params.id);

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

export default router;