import mongoose from "mongoose";

const withdrawSchema = new mongoose.Schema(
  {
    userEmail: String,

    pixKey: String,

    amount: Number,

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
  "Withdraw",
  withdrawSchema
);