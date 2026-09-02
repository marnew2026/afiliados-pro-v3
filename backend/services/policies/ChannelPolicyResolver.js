import { applyTelegramPolicy } from "./TelegramPolicy.js";
import { applyTikTokPolicy } from "./TikTokPolicy.js";

const CHANNEL_POLICIES = {
  telegram: applyTelegramPolicy,
  tiktok: applyTikTokPolicy,
};

export function applyChannelPolicy({
  channel,
  content,
  trackingUrl = "",
}) {
  const normalizedChannel = String(
    channel || ""
  )
    .trim()
    .toLowerCase();

  if (!normalizedChannel) {
    throw new Error(
      "Canal nao informado para ChannelPolicyResolver."
    );
  }

  const policy =
    CHANNEL_POLICIES[normalizedChannel];

  if (!policy) {
    throw new Error(
      `Policy nao encontrada para o canal: ${normalizedChannel}`
    );
  }

  return policy({
    content,
    trackingUrl,
  });
}
