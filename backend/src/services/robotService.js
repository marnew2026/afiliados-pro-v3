import User from "../../models/User.js";
import Campaign from "../../models/Campaign.js";
import { postToMeta } from "../security/safePost.js";
import { track } from "../observability/tracker.js";

export async function processUser(user) {
  if (user.status === "processing") return;
if (user.status === "done") return;
  try {
    if (user.status === "done") return;

    user.status = "processing";
    await user.save();

    console.log("🔥 PROCESSANDO USER:", user.email);

    // 👉 SUA LÓGICA REAL DO ROBÔ AQUI
    // exemplo:
    // await generateCampaign(user)
    // await updateStats(user)

    user.status = "done";
    user.lastProcessedAt = new Date();
    await user.save();

  } catch (err) {
    user.status = "failed";
    await user.save();

    console.log("❌ ERRO USER:", user.email, err.message);
  }
}