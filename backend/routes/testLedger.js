
console.log("🔥 TEST LEDGER ROUTE CARREGADA");

import express from "express";
import { safeCreateLedger } from "../src/services/safeCreateLedger.js";
import { rebuildWallet } from "../src/services/rebuildWallet.js";

const router = express.Router();

router.get("/credit", async (req, res) => {
  try {
    const userId = "6a341138e88c46dc47af06f5";

    const ledger = await safeCreateLedger({
      userId,
      type: "credit",
      amount: 100,
      status: "confirmed",
      referenceId: `sale-${Date.now()}`,
      source: "sale",
    });

    console.log("LEDGER CRIADO:", ledger);

    const wallet = await rebuildWallet(userId);

    console.log("RECALCULANDO WALLET:", wallet);

    res.json({
      success: true,
      ledger,
      wallet,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;