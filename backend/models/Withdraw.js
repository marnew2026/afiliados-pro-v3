import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  pixKey: {
    type: String,
    required: true,
  },

  referenceId: {
    type: String,
    required: true,
    index: true,
  },

  withdrawId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  asaasTransferId: {
    type: String,
    default: null,
    index: true,
  },

  asaasStatus: {
    type: String,
    default: null,
  },

  asaasResponse: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },

  status: {
    type: String,
    enum: [
      "pending",
      "processing",
      "sent",
      "paid",
      "failed",
    ],
    default: "pending",
    index: true,
  },

  processingAt: Date,

  sentAt: Date,

  paidAt: Date,

  errorMessage: String,
},
{
  timestamps: true,
}
);

export default mongoose.model("Withdraw", WithdrawSchema);