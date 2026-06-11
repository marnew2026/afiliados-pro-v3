import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({
  userId: String,

  action: String, // WITHDRAW_REQUEST | PIX_SENT | PIX_CONFIRMED | BLOCKED_FRAUD

  amount: Number,

  ip: String,

  metadata: Object,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("AuditLog", AuditLogSchema);