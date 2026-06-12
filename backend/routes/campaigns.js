import express from "express";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import Campaign from "../models/Campaign.js";
import Withdraw from "../models/Withdraw.js";
import LedgerEntry from "../models/LedgerEntry.js";
import { protect } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
console.log("🔥 CAMPAIGNS ROUTE VERSAO 999999");
const router = express.Router();


router.get("/user", async (req, res) => {
  try {
    const userId = req.user.id;

    const campaigns = await Campaign.find({ userId });

    const withdrawals = await Withdraw.find({
      userId,
      status: { $in: ["pending", "paid"] }
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
// router.use(protect);

router.post("/create", async (req, res) => {
  try {
    const { email, nome, link } = req.body;

    const user = await User.findOne({ email });
    console.log("USER ENCONTRADO:", user);
console.log("USER ID:", user._id);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }
router.get("/:email", async (req, res) => {
  try {
    console.log(
      "BUSCANDO CAMPANHAS:",
      req.params.email
    );

    const user = await User.findOne({
      email: req.params.email,
    });

    if (!user) {
      return res.json([]);
    }

    const campaigns = await Campaign.find({
      userId: user._id,
    });

    console.log(
      "CAMPANHAS ENCONTRADAS:",
      campaigns.length
    );

    res.json(campaigns);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});
    const campaign = await Campaign.create({
      userId: user._id,
      nome,
      link,
      active: true,
      clicks: 0,
      earnings: 0,
      sales: 0,
    });

    res.json(campaign);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
});

/* REGISTRAR CLIQUE */
router.post("/:id/click", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: "Campanha não encontrada" });
    }

    campaign.clicks = (campaign.clicks || 0) + 1;

    await campaign.save();

    res.json({ clicks: campaign.clicks });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* REGISTRAR VENDA */
router.post("/:id/sale", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: "Campanha não encontrada" });
    }

    campaign.sales = (campaign.sales || 0) + 1;

    const earnings = 10;

    await campaign.save();

    await LedgerEntry.create({
      userId: campaign.userId,
      type: "credit",
      amount: earnings,
      status: "confirmed",
      referenceId: campaign._id.toString(),
      description: "Venda registrada",
    });

    await Transaction.create({
      userId: campaign.userId,
      type: "earning",
      amount: earnings,
      description: "Venda registrada",
    });

    res.json({ success: true, earnings });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* EXCLUIR CAMPANHA */
router.delete("/:id", async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);

    res.json({ ok: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;