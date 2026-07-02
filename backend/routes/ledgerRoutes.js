import express from "express";
import { safeCreateLedger } from "../src/services/safeCreateLedger.js";
import { rebuildWallet } from "../src/services/rebuildWallet.js";

const router = express.Router();

console.log("🔥 LEDGER ROUTES CARREGADA");

router.get("/credit", async (req, res) => {
  
  try {
    const userId = "6a341138e88c46dc47af06f5";

    console.log("🧪 TEST LEDGER USER:", userId);

    const ledger = await safeCreateLedger({
      userId,
      type: "credit",
      amount: 100,
      status: "confirmed",
      referenceId: `test-${Date.now()}`,
     source: "adjustment",
    });

    console.log("LEDGER CRIADO OK");

    const wallet = await rebuildWallet(userId);

    console.log("💰 WALLET REBUILD:", wallet?.availableBalance);

    return res.json({
      ok: true,
      ledger,
      wallet,
    });
  } catch (err) {
    console.error("💥 ERROR LEDGER TEST:", err);
    return res.status(500).json({ error: err.message });
  }
});
router.get("/debit", async (req, res) => {
  try {
    const userId = "6a341138e88c46dc47af06f5";

    console.log("🧪 TEST DEBIT USER:", userId);

    const ledger = await safeCreateLedger({
      userId,
      type: "debit",
      amount: 100,
      status: "confirmed",
      referenceId: `debit-${Date.now()}`,
      source: "withdraw",
    });

    console.log("DEBIT CRIADO OK");

    const wallet = await rebuildWallet(userId);

    console.log("💰 WALLET REBUILD:", wallet?.availableBalance);

    return res.json({
      ok: true,
      ledger,
      wallet,
    });
  } catch (err) {
    console.error("💥 ERROR DEBIT TEST:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});
import Wallet from "../models/Wallet.js";

router.get("/wallet-test", async (req, res) => {
  try {
    const wallet = await Wallet.findOne({
      userId: "6a341138e88c46dc47af06f5",
    });

    return res.json(wallet);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});
export default router;