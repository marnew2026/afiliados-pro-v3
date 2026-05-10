import mongoose from "mongoose";

const WithdrawalSchema = new mongoose.Schema({
  affiliateCode: String,
  pixKey: String,
  amount: Number,
  status: {
    type: String,
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Withdrawal", WithdrawalSchema);