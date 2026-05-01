import mongoose from "mongoose";

const AffiliateSchema = new mongoose.Schema({
  userId: String,
  code: { type: String, unique: true },
  balance: { type: Number, default: 0 },
  totalEarned: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Affiliate", AffiliateSchema);