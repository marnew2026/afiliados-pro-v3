import AuditLog from "../models/AuditLog.js";

export async function logAudit({
  userEmail,
  action,
  amount,
  ip,
  metadata,
}) {
  await AuditLog.create({
    userEmail,
    action,
    amount,
    ip,
    metadata,
  });
}