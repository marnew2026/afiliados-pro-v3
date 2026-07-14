import express from "express";
import Wallet from "../models/Wallet.js";
import Campaign from "../models/Campaign.js";
import Click from "../models/Click.js";
import User from "../models/User.js";
import Ledger from "../models/Ledger.js";
import Withdraw from "../models/Withdraw.js";
import { rebuildWallet } from "../src/services/rebuildWallet.js";
console.log("🔥 DEBUG ROUTE CARREGADA");
const router = express.Router();

/**
 * DEBUG GERAL DO MONGO
 */
router.get("/mongo-check", async (req, res) => {
    console.log("🔥 FINANCE DEBUG");
  try {
    const wallets = await Wallet.find().limit(20);
    const campaigns = await Campaign.find().limit(20);
    const clicks = await Click.find().limit(20);
    const users = await User.find().limit(20);

    res.json({
      wallets: {
        total: wallets.length,
        sample: wallets,
      },
      campaigns: {
        total: campaigns.length,
        sample: campaigns,
      },
      clicks: {
        total: clicks.length,
        sample: clicks,
      },
      users: {
        total: users.length,
        sample: users.map((u) => ({
          _id: u._id,
          email: u.email,
          name: u.name,
        })),
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/finance/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const wallet = await Wallet.findOne({ userId });

    const campaigns = await Campaign.find({ userId });

    const ledger = await Ledger.find({ userId });

    const withdraws = await Withdraw.find({ userId });

    res.json({
      wallet,
      campaigns,
      ledgerCount: ledger.length,
      withdrawCount: withdraws.length,
      ledger,
      withdraws,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/rebuild-wallet/:userId", async (req, res) => {
  try {

    const { userId } = req.params;

    console.log("🔄 REBUILD WALLET DEBUG");
    console.log("USER:", userId);

    const wallet = await rebuildWallet(userId);

    console.log("✅ WALLET REBUILD OK");
    console.log(wallet);

    res.json({
      success: true,
      wallet
    });

  } catch (err) {

    console.log("❌ REBUILD ERROR");
    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }
});

export default router;