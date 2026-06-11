import AuditLog from "../models/AuditLog.js";

export async function logAudit({
  userId,
  action,
  amount,
  ip,
  metadata,
}) {
  await AuditLog.create({
    userId,
    action,
    amount,
    ip,
    metadata,
  });
}