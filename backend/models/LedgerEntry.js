import mongoose from "mongoose";

const LedgerSchema = new mongoose.Schema(
  {
    userEmail: String,

    type: {
      type: String,
      enum: ["credit", "debit"],
    },

    amount: Number,

    source: {
      type: String,
      enum: ["campaign", "withdraw", "adjustment"],
    },

    referenceId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Ledger", LedgerSchema);