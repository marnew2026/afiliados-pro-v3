import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    userId: {
  type: String,
  required: true,
  unique: true,
  index: true,
},

    availableBalance: { type: Number, default: 0 },
    lockedBalance: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 },

    riskScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Wallet =
  mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;