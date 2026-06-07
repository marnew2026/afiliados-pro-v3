import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
  userEmail: { type: String, index: true },

  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },

  amount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending", "confirmed", "failed"],
    default: "confirmed",
  },

  referenceId: String,
  description: String,
}, { timestamps: true });

export default mongoose.model("LedgerEntry", ledgerSchema);