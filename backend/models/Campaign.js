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
      enum: ["active", "paused"],
      default: "active",
    },

    clicks: {
      type: Number,
      default: 0,
    },

    earnings: {
      type: Number,
      default: 0,
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