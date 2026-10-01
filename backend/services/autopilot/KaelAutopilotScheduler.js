import AutopilotSettings from "../../models/AutopilotSettings.js";
import { runKaelAutopilotOnce } from "./KaelAutopilotService.js";

let schedulerRunning = false;

export async function runKaelAutopilotScheduler({
  settingsModel = AutopilotSettings,
  runner = runKaelAutopilotOnce,
  env = process.env,
} = {}) {
  if (schedulerRunning) {
    console.log("KAEL SCHEDULER: ciclo anterior ainda em execução");
    return;
  }

  schedulerRunning = true;

  try {
    const settingsList = await settingsModel.find({
      enabled: true,
      mode: "automatico",
      channels: env.KAEL_VIDEO_AUTOPILOT_ENABLED === "true"
        ? { $in: ["telegram", "instagram", "facebook", "tiktok", "kwai"] }
        : "telegram",
    })
      .select("userId channels")
      .limit(20)
      .lean();

    if (!settingsList.length) {
      console.log("KAEL SCHEDULER: nenhum usuário automático");
      return;
    }

    console.log(
      `KAEL SCHEDULER: ${settingsList.length} usuário(s) elegível(is)`
    );

    for (const settings of settingsList) {
      try {
        const channels = (settings.channels || ["telegram"]).filter((channel) =>
          channel === "telegram" || env.KAEL_VIDEO_AUTOPILOT_ENABLED === "true");
        for (const channel of [...new Set(channels)]) {
          try {
            const result = await runner(settings.userId, { channel });
            console.log(
              "KAEL SCHEDULER RESULT:",
              String(settings.userId),
              channel,
              result?.reason || (result?.skipped ? "skipped" : "executed")
            );
          } catch (error) {
            console.error("KAEL SCHEDULER CHANNEL ERROR:", channel, error?.message || "erro desconhecido");
          }
        }
      } catch (error) {
        console.error(
          "KAEL SCHEDULER USER ERROR:",
          String(settings.userId),
          error?.message || "erro desconhecido"
        );
      }
    }
  } catch (error) {
    console.error(
      "KAEL SCHEDULER ERROR:",
      error?.message || "erro desconhecido"
    );
  } finally {
    schedulerRunning = false;
  }
}
