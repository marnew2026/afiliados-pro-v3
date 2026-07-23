import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
  {
    userId: {
  type: String,
  required: true,
  unique: true,
  index: true,
},

   availableBalance: {
  type: Number,
  default: 0,
  min: 0,
},

    lockedBalance: {
  type: Number,
  default: 0,
  min: 0,
},

    totalEarned: {
    type:Number,
    default:0,
    min:0
},

    withdrawLocked: {
      type: Boolean,
      default: false,
    },

    dailyWithdrawn:{
    type:Number,
    default:0,
    min:0
},

    lastWithdrawAt: {
      type: Date,
      default: null,
    },

   riskScore:{
    type:Number,
    default:0,
    min:0
},
totalWithdrawn: {
    type: Number,
    default: 0,
},
  },
  { timestamps: true }
  
);

export default mongoose.model("Wallet", WalletSchema);