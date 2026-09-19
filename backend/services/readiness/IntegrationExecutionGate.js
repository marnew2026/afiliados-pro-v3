const TRUE_VALUES = new Set(["true", "1", "yes", "on"]);

const CHANNEL_CONTROLS = {
  telegram: {
    enabledEnv: "TELEGRAM_ENABLED",
    emergencyEnv: "TELEGRAM_EMERGENCY_DISABLED",
  },
  facebook: {
    approvalEnv: "FACEBOOK_API_APPROVAL_STATUS",
    enabledEnv: "FACEBOOK_ENABLED",
    emergencyEnv: "FACEBOOK_EMERGENCY_DISABLED",
  },
  instagram: {
    approvalEnv: "INSTAGRAM_API_APPROVAL_STATUS",
    enabledEnv: "INSTAGRAM_ENABLED",
    emergencyEnv: "INSTAGRAM_EMERGENCY_DISABLED",
  },
  tiktok: {
    approvalEnv: "TIKTOK_API_APPROVAL_STATUS",
    enabledEnv: "TIKTOK_ENABLED",
    emergencyEnv: "TIKTOK_EMERGENCY_DISABLED",
  },
  kwai: {
    approvalEnv: "KWAI_API_APPROVAL_STATUS",
    enabledEnv: "KWAI_ENABLED",
    emergencyEnv: "KWAI_EMERGENCY_DISABLED",
  },
};

function isTrue(value) {
  return TRUE_VALUES.has(String(value || "").trim().toLowerCase());
}

function unavailable(message, reason) {
  const error = new Error(message);
  error.statusCode = 503;
  error.code = "INTEGRATION_NOT_OPERATIONAL";
  error.reason = reason;
  return error;
}

export function assertIntegrationOperational(channel, env = process.env) {
  const normalizedChannel = String(channel || "").trim().toLowerCase();
  const control = CHANNEL_CONTROLS[normalizedChannel];

  if (!control) {
    throw unavailable("Canal sem controle operacional configurado.", "unknown_channel");
  }

  if (isTrue(env[control.emergencyEnv])) {
    throw unavailable(
      `Integracao ${normalizedChannel} interrompida pelo desligamento emergencial.`,
      "emergency_disabled"
    );
  }

  if (
    control.approvalEnv &&
    String(env[control.approvalEnv] || "").trim().toLowerCase() !== "approved"
  ) {
    throw unavailable(
      `Integracao ${normalizedChannel} aguardando aprovacao oficial.`,
      "approval_not_confirmed"
    );
  }

  if (!isTrue(env[control.enabledEnv])) {
    throw unavailable(
      `Integracao ${normalizedChannel} desativada.`,
      "feature_disabled"
    );
  }

  return true;
}
