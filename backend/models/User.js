import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  isPro: { type: Boolean, default: false },

  affiliateCode: {
    type: String,
    unique: true,
    index: true,
  },

  riskScore: { type: Number, default: 50 },
  trustLevel: { type: String, default: "MEDIUM" },

  stripeAccountId: String,
});

export default mongoose.model("User", UserSchema);