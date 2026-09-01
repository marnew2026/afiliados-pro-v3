import AutopilotSettings from "../../models/AutopilotSettings.js";
import { runKaelAutopilotOnce } from "./KaelAutopilotService.js";

let schedulerRunning = false;

export async function runKaelAutopilotScheduler() {
  if (schedulerRunning) {
    console.log("KAEL SCHEDULER: ciclo anterior ainda em execução");
    return;
  }

  schedulerRunning = true;

  try {
    const settingsList = await AutopilotSettings.find({
      enabled: true,
      mode: "automatico",
      channels: "telegram",
    })
      .select("userId")
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
        const result = await runKaelAutopilotOnce(settings.userId);

        console.log(
          "KAEL SCHEDULER RESULT:",
          String(settings.userId),
          result?.reason || (result?.skipped ? "skipped" : "executed")
        );
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
