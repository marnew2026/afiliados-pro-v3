const TELEGRAM_MAX_TEXT_LENGTH = 4096;

export function applyTelegramPolicy({
  content,
  trackingUrl = "",
}) {
  if (!content) {
    throw new Error(
      "Conteudo nao informado para TelegramPolicy."
    );
  }

  if (content.channel !== "telegram") {
    throw new Error(
      `TelegramPolicy recebeu canal invalido: ${content.channel}`
    );
  }

  const text = String(content.text || "").trim();
  const normalizedTrackingUrl =
    String(trackingUrl || "").trim();

  if (!text) {
    throw new Error(
      "Conteudo de texto vazio para Telegram."
    );
  }

  const finalText = normalizedTrackingUrl
    ? `${text}\n\n${normalizedTrackingUrl}`
    : text;

  if (finalText.length > TELEGRAM_MAX_TEXT_LENGTH) {
    throw new Error(
      "Mensagem gerada excede o limite do Telegram."
    );
  }

  return {
    channel: "telegram",
    contentType: "text",
    text,
    trackingUrl: normalizedTrackingUrl,
    finalText,

    media: {
      type: null,
      aspectRatio: null,
    },
  };
}