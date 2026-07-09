import mongoose from "mongoose";

const LedgerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    status: {
  type: String,
  enum: [
    "pending",
    "confirmed",
    "failed",
  ],
  default: "confirmed",
},
confirmedAt: {
  type: Date,
  default: null,
},

    amount: {
      type: Number,
      required: true,
    },



    type: {
  type: String,
  enum: ["credit", "debit"],
  required: true,
},
    source: {
  type: String,
  enum: [
    "campaign",
    "withdraw",
    "adjustment",
    "sale"
  ],
  required: true,
},

    metadata: {
  type: Object,
  default: {},
},

    referenceId: {
      type: String,
      required: true,
    },

    description: String,
  },
  { timestamps: true }
);

// 🔒 REGRA ANTI DUPLICAÇÃO (IMPORTANTE)

LedgerSchema.index(
  {
    referenceId: 1,
    type: 1,
  },
  {
    unique: true,
  }
);

LedgerSchema.index({ userId: 1 });

LedgerSchema.index({
  userId: 1,
  createdAt: -1,
});

export default mongoose.model("Ledger", LedgerSchema);