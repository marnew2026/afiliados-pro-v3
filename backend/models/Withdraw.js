import mongoose from "mongoose";

const withdrawSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },

    pixKey: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "approved",
        "failed",
      ],
      default: "pending",
    },

    // 🔥 id do ASAAS
    externalId: {
      type: String,
      default: null,
    },

    // 🔥 data pagamento
    paidAt: {
      type: Date,
      default: null,
    },

    // 🔥 erro PIX
    errorMessage: {
      type: String,
      default: null,
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