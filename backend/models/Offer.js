import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  commissionPercent: {
    type: Number,
    default: 50,
  },

  producerId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Offer = mongoose.model(
  "Offer",
  OfferSchema
);

export default Offer;