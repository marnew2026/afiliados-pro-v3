import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  isPro: { type: Boolean, default: false },

  // 🧠 SCORE DE CONFIANÇA
  riskScore: { type: Number, default: 50 }, // 0–100
  trustLevel: { type: String, default: "MEDIUM" },

  stripeAccountId: String
});

export default mongoose.model("User", UserSchema);