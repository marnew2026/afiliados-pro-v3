const TRUE_VALUES = new Set(["true", "1", "yes", "on"]);
const APPROVAL_STATUSES = new Set(["pending", "approved", "rejected"]);

const CHANNELS = [
  {
    channel: "telegram",
    approvalEnv: null,
    enabledEnv: "TELEGRAM_ENABLED",
    testedEnv: "TELEGRAM_STAGING_TESTED",
    releasedEnv: "TELEGRAM_PRODUCTION_RELEASED",
    emergencyEnv: "TELEGRAM_EMERGENCY_DISABLED",
    requiredEnv: ["CHANNEL_CREDENTIAL_KEY"],
    approvalDefault: "approved",
  },
  {
    channel: "facebook",
    approvalEnv: "FACEBOOK_API_APPROVAL_STATUS",
    enabledEnv: "FACEBOOK_ENABLED",
    testedEnv: "FACEBOOK_STAGING_TESTED",
    releasedEnv: "FACEBOOK_PRODUCTION_RELEASED",
    emergencyEnv: "FACEBOOK_EMERGENCY_DISABLED",
    requiredEnv: [
      "FACEBOOK_APP_ID",
      "FACEBOOK_APP_SECRET",
      "FACEBOOK_REDIRECT_URI",
      "META_GRAPH_API_VERSION",
      "JWT_SECRET",
      "CHANNEL_CREDENTIAL_KEY",
    ],
    approvalDefault: "pending",
  },
  {
    channel: "instagram",
    approvalEnv: "INSTAGRAM_API_APPROVAL_STATUS",
    enabledEnv: "INSTAGRAM_ENABLED",
    testedEnv: "INSTAGRAM_STAGING_TESTED",
    releasedEnv: "INSTAGRAM_PRODUCTION_RELEASED",
    emergencyEnv: "INSTAGRAM_EMERGENCY_DISABLED",
    requiredEnv: [
      "INSTAGRAM_APP_ID",
      "INSTAGRAM_APP_SECRET",
      "INSTAGRAM_REDIRECT_URI",
      "JWT_SECRET",
      "CHANNEL_CREDENTIAL_KEY",
    ],
    approvalDefault: "pending",
  },
  {
    channel: "tiktok",
    approvalEnv: "TIKTOK_API_APPROVAL_STATUS",
    enabledEnv: "TIKTOK_ENABLED",
    testedEnv: "TIKTOK_STAGING_TESTED",
    releasedEnv: "TIKTOK_PRODUCTION_RELEASED",
    emergencyEnv: "TIKTOK_EMERGENCY_DISABLED",
    requiredEnv: [
      "TIKTOK_CLIENT_KEY",
      "TIKTOK_CLIENT_SECRET",
      "TIKTOK_REDIRECT_URI",
      "JWT_SECRET",
      "CHANNEL_CREDENTIAL_KEY",
    ],
    approvalDefault: "pending",
  },
  {
    channel: "kwai",
    approvalEnv: "KWAI_API_APPROVAL_STATUS",
    enabledEnv: "KWAI_ENABLED",
    testedEnv: "KWAI_STAGING_TESTED",
    releasedEnv: "KWAI_PRODUCTION_RELEASED",
    emergencyEnv: "KWAI_EMERGENCY_DISABLED",
    requiredEnv: [],
    approvalDefault: "pending",
    officialConfigurationPending: true,
  },
];

function isTrue(value) {
  return TRUE_VALUES.has(String(value || "").trim().toLowerCase());
}

function readApprovalStatus(definition, env) {
  if (!definition.approvalEnv) return definition.approvalDefault;

  const value = String(env[definition.approvalEnv] || "")
    .trim()
    .toLowerCase();

  return APPROVAL_STATUSES.has(value)
    ? value
    : definition.approvalDefault;
}

function isConfiguredValue(name, value) {
  const cleanValue = String(value || "").trim();
  if (!cleanValue) return false;

  if (name === "CHANNEL_CREDENTIAL_KEY") {
    return /^[a-fA-F0-9]{64}$/.test(cleanValue);
  }

  if (name.endsWith("_REDIRECT_URI")) {
    try {
      return new URL(cleanValue).protocol === "https:";
    } catch {
      return false;
    }
  }

  return true;
}

function buildChannelReadiness(definition, env) {
  const approvalStatus = readApprovalStatus(definition, env);
  const missingEnvironmentKeys = definition.requiredEnv.filter(
    (name) => !isConfiguredValue(name, env[name])
  );
  const configurationDefined = !definition.officialConfigurationPending;
  const configured =
    configurationDefined && missingEnvironmentKeys.length === 0;
  const enabled = isTrue(env[definition.enabledEnv]);
  const stagingTested = isTrue(env[definition.testedEnv]);
  const productionReleased = isTrue(env[definition.releasedEnv]);
  const emergencyDisabled = isTrue(env[definition.emergencyEnv]);
  const approved = approvalStatus === "approved";

  const blockers = [];
  if (!approved) blockers.push(`approval_${approvalStatus}`);
  if (!configurationDefined) blockers.push("official_configuration_pending");
  if (!configured && configurationDefined) blockers.push("configuration_incomplete");
  if (!enabled) blockers.push("feature_disabled");
  if (emergencyDisabled) blockers.push("emergency_disabled");
  if (!stagingTested) blockers.push("staging_not_tested");
  if (!productionReleased) blockers.push("production_not_released");

  return {
    channel: definition.channel,
    approvalStatus,
    configured,
    enabled,
    emergencyDisabled,
    stagingTested,
    productionReleased,
    readyForStaging:
      approved && configured && enabled && !emergencyDisabled,
    readyForProduction:
      approved &&
      configured &&
      enabled &&
      !emergencyDisabled &&
      stagingTested &&
      productionReleased,
    missingEnvironmentKeys,
    blockers,
  };
}

export function getIntegrationReadiness(env = process.env) {
  const channels = CHANNELS.map((definition) =>
    buildChannelReadiness(definition, env)
  );

  return {
    generatedAt: new Date().toISOString(),
    safeByDefault: true,
    channels,
    summary: {
      total: channels.length,
      approved: channels.filter((item) => item.approvalStatus === "approved")
        .length,
      readyForStaging: channels.filter((item) => item.readyForStaging).length,
      readyForProduction: channels.filter((item) => item.readyForProduction)
        .length,
    },
  };
}

