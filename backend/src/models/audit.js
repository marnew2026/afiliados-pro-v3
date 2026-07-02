import AuditLog from "../models/AuditLog.js";

export async function audit({
  userId,
  action,
  referenceId,
  metadata = {},
}) {
  try {
    await AuditLog.create({
      userId,
      action,
      referenceId,
      metadata,
    });
  } catch (err) {
    console.error("Audit error:", err.message);
  }
}