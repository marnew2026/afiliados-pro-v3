import mongoose from "mongoose";

const ConversionSchema = new mongoose.Schema({
  affiliateCode: String,
  amount: Number,
  commission: Number,
  stripeSessionId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Conversion", ConversionSchema);