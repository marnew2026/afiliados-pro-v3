import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
  {
    userEmail: {
  type: String,
  required: true,
  index: true,
},

    availableBalance: {
      type: Number,
      default: 0,
    },

    lockedBalance: {
      type: Number,
      default: 0,
    },

    totalEarned: {
      type: Number,
      default: 0,
    },

    withdrawLocked: {
      type: Boolean,
      default: false,
    },

    dailyWithdrawn: {
      type: Number,
      default: 0,
    },

    lastWithdrawAt: {
      type: Date,
      default: null,
    },

    riskScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Wallet", WalletSchema);