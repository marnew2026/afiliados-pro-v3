import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  commissionPercent: Number,
  producerId: String,
  checkoutUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Offer", offerSchema);