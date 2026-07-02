import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },

  plan: {
    type: String,
    enum: ["FREE", "PRO", "SCALE"],
    default: "FREE",
  },

  isPro: { type: Boolean, default: false },
  status: {
  type: String,
  default: "pending", // pending | processing | done | failed
},

lastProcessedAt: {
  type: Date,
  default: null
}
});


export default mongoose.model("User", UserSchema);
