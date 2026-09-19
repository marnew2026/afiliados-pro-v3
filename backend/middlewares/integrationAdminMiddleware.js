function adminEmails(env = process.env) {
  return String(env.INTEGRATION_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function requireIntegrationAdmin(req, res, next) {
  const email = String(req.user?.email || "").trim().toLowerCase();
  const allowedEmails = adminEmails();

  if (!email || !allowedEmails.includes(email)) {
    return res.status(403).json({
      success: false,
      error: "Acesso administrativo nao autorizado.",
    });
  }

  return next();
}

