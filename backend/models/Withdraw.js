import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    index: true,
  },

  amount: Number,

  pixKey: String,

  externalId: {
    type: String,
    unique: true,
    index: true,
  },

  asaasTransferId: String,

  status: {
    type: String,
    default: "pending",
    enum: [
      "pending",
      "processing",
      "sent",
      "paid",
      "failed"
    ],
    index: true,
  },

  errorMessage: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  sentAt: Date,

  paidAt: Date,

});

export default mongoose.model("Withdraw", WithdrawSchema);