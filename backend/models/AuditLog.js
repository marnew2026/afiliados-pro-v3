import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema({
  action: String,
  userId: String,
  before: Object,
  after: Object,
  ip: String,
  source: String,
}, { timestamps: true });

export default mongoose.model("AuditLog", AuditSchema);