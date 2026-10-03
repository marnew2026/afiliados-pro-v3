import AutopilotSettings from "../../models/AutopilotSettings.js";
export async function assertLinkAutomationAtDelivery(distribution, { env = process.env, settingsModel = AutopilotSettings } = {}) {
  if (!distribution.automationKey) return;
  const enabled = env.KAEL_LINK_AUTOMATION_ENABLED === "true" &&
    await settingsModel.exists({ userId: distribution.userId, enabled: true, linkAutomation: true,
      mode: "automatico", channels: distribution.channel });
  if (!enabled) throw Object.assign(new Error("Divulgacao automatica pausada."), { code: "KAEL_AUTOMATION_PAUSED" });
}
