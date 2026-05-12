import mongoose from "mongoose";

const ClickSchema = new mongoose.Schema({
  offerId: String,
  affiliateId: String,
  ip: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Click", ClickSchema);