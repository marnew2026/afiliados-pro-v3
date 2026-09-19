function adminEmails(env = process.env) {
  return String(env.INTEGRATION_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isIntegrationAdminEmail(email, env = process.env) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  return Boolean(normalizedEmail && adminEmails(env).includes(normalizedEmail));
}

export function requireIntegrationAdmin(req, res, next) {
  if (!isIntegrationAdminEmail(req.user?.email)) {
    return res.status(403).json({
      success: false,
      error: "Acesso administrativo nao autorizado.",
    });
  }

  return next();
}
