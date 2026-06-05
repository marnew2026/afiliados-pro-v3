import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userEmail: String,

    type: {
      type: String,
      enum: ["earning", "withdraw", "refund"],
    },

    amount: Number,

    status: {
      type: String,
      enum: ["pending", "confirmed", "failed"],
      default: "confirmed",
    },

    description: String,

    referenceId: String, // campaignId ou withdrawId

  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);