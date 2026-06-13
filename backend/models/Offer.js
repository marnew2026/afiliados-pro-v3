import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  name: String,
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

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;