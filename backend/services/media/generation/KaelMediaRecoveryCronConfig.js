export function isKaelMediaRecoveryCronEnabled({
  configuredValue =
    process.env.KAEL_MEDIA_RECOVERY_CRON_ENABLED,
} = {}) {
  return configuredValue === "true";
}
