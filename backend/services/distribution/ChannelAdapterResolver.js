import { sendTelegramMessage } from "./TelegramAdapter.js";

const CHANNEL_ADAPTERS = {
  telegram: sendTelegramMessage,
};

export function getChannelAdapter(channel) {
  const normalizedChannel = String(
    channel || ""
  )
    .trim()
    .toLowerCase();

  if (!normalizedChannel) {
    throw new Error(
      "Canal nao informado para ChannelAdapterResolver."
    );
  }

  const adapter =
    CHANNEL_ADAPTERS[normalizedChannel];

  if (!adapter) {
    throw new Error(
      `Adapter nao implementado para o canal: ${normalizedChannel}`
    );
  }

  return adapter;
}
