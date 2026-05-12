import express from "express";
import stripe from "../services/stripe.js";
import User from "../models/User.js";
import Ledger from "../models/Ledger.js";
import { processPayout } from "../services/payoutEngine.js";
import mongoose from "mongoose";
const router = express.Router();


router.post("/payout", async (req, res) => {
  const { userId, amount } = req.body;
  const { userId } = req.body;
  const user = await User.findById(userId);
  const balance = await Ledger.aggregate([
    { $match: { userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
 const amount = balance[0]?.total || 0;
  const payout = await stripe.transfers.create({
    amount: amount * 100,
    currency: "brl",
    destination: user.stripeAccountId,
  });
    await Ledger.create({
    userId,
    type: "payout",
    amount,
    status: "paid",
    referenceId: payout.id
  });
const LedgerSchema = new mongoose.Schema({
  userId: String,
  type: String, // commission | payout | refund | sale
  amount: Number,
  currency: String,
  status: String,
  referenceId: String,
  createdAt: { type: Date, default: Date.now }
});
  res.json(payout);
});
if (user.riskScore < 30) {
  return res.status(403).json({
    error: "🚫 Payout bloqueado (risco alto)"
  });
}

if (user.riskScore >= 30 && user.riskScore < 60) {
  return res.status(403).json({
    error: "⏳ Payout em revisão manual"
  });
}
export default mongoose.model("Ledger", LedgerSchema);
export default router;