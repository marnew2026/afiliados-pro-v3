import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    pixKey: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "queued",
        "processing",
        "paid",
        "failed",
      ],
      default: "pending",
    },

    externalId: {
      type: String,
      default: null,
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Withdraw", WithdrawSchema);