import mongoose from "mongoose";

const ClickSchema = new mongoose.Schema(
  {
    campaignId: String,
    userId: String,
    ip: String,
    userAgent: String,

    // 🛡️ ANTIFRAUDE
    riskScore: {
      type: Number,
      default: 0,
    },

    isBot: {
      type: Boolean,
      default: false,
    },

    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Click", ClickSchema);