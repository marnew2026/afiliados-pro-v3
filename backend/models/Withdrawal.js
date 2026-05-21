import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    userEmail: String,
    amount: Number,
    pixKey: String,

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Withdrawal",
  withdrawalSchema
);