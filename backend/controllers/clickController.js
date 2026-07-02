import { registerClick } from "../services/clickService.js";

export async function clickController(req, res) {
  const { userId, campaignId } = req.body;

  await registerClick(userId, campaignId);

  res.json({ success: true });
}