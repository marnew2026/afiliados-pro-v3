import crypto from "crypto";

export async function registerClick(userId, campaignId) {
  console.log("🖱️ Clique registrado");

  return {
    referenceId: crypto.randomUUID
      ? crypto.randomUUID()
      : crypto.createHash("sha256")
          .update(`${userId}:${campaignId}:${Date.now()}`)
          .digest("hex"),
  };
}