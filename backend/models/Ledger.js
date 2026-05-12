import mongoose from "mongoose";

const LedgerSchema = new mongoose.Schema({
  userId: String,
  type: String, // sale | commission | payout
  amount: Number,
  status: String, // pending | paid | failed
  referenceId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Ledger", LedgerSchema);