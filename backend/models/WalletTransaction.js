import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  userId: String,
  type: String, // commission | payout | refund
  amount: Number,
  status: { type: String, default: "pending" },
  saleId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("WalletTransaction", WalletSchema);