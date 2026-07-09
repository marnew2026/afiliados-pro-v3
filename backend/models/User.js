import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
  // legado (pode ser removido futuramente)

  name: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  firebaseUid: {
  type: String,
  index: true,
},

  plan: {
    type: String,
    enum: ["FREE", "PRO", "SCALE"],
    default: "FREE",
  },

  isPro: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["pending", "processing", "done", "failed"],
    default: "pending",
  },

  lastProcessedAt: {
    type: Date,
    default: null,
  },
},
{
  timestamps: true,
}
);

export default mongoose.model("User", UserSchema);