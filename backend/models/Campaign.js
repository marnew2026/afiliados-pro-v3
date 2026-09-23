import mongoose from "mongoose";
console.log("🔥 MODEL CAMPAIGN CARREGADO");
const CampaignSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    nome: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    // Já deixa preparado para futuras versões
    status: {
      type: String,
      enum: ["active", "paused", "archived"],
      default: "active",
    },

    archivedAt: {
      type: Date,
      default: null,
    },

    clicks: {
      type: Number,
      default: 0,
    },

    earnings: {
      type: Number,
      default: 0,
    },

    earningsAudit: {
      invalidatedAmount: {
        type: Number,
        default: null,
      },
      invalidatedAt: {
        type: Date,
        default: null,
      },
      reason: {
        type: String,
        default: null,
      },
    },
    sales: {
      type: Number,
      default: 0,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Campaign", CampaignSchema);