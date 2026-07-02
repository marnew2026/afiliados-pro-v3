import Ledger from "../models/Ledger.js";
import crypto from "crypto";

export async function registerClick(userId, campaignId) {
  const referenceId = crypto.createHash("sha256")
    .update(`${userId}:${campaignId}`)
    .digest("hex");

  try {
    await Ledger.create({
      userId,
      amount: 0,
      type: "credit",
      source: "campaign",
      referenceId,
      description: "Click registrado",
      metadata: { campaignId },
      status: "confirmed",
    });
  } catch (err) {
    if (err.code === 11000) return;
    throw err;
  }
}