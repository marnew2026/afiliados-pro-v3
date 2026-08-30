import axios from "axios";

const TELEGRAM_API_BASE = "https://api.telegram.org";

export async function sendTelegramMessage({
  botToken,
  destinationId,
  text,
}) {
  if (!botToken) {
    throw new Error("Token do Telegram não informado.");
  }

  if (!destinationId) {
    throw new Error("Destino do Telegram não informado.");
  }

  const message = (text || "").trim();

  if (!message) {
    throw new Error("Mensagem do Telegram não pode ficar vazia.");
  }

  if (message.length > 4096) {
    throw new Error(
      "Mensagem do Telegram excede o limite de 4096 caracteres."
    );
  }

  try {
    const response = await axios.post(
      `${TELEGRAM_API_BASE}/bot${botToken}/sendMessage`,
      {
        chat_id: destinationId,
        text: message,
        disable_web_page_preview: false,
      },
      {
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data?.ok) {
      throw new Error(
        response.data?.description || "Telegram recusou a mensagem."
      );
    }

    return {
      success: true,
      messageId: String(response.data.result.message_id),
      chatId: String(response.data.result.chat.id),
      date: response.data.result.date,
    };
  } catch (error) {
    const telegramMessage =
      error.response?.data?.description ||
      error.message ||
      "Erro desconhecido ao publicar no Telegram.";

    throw new Error(`Telegram: ${telegramMessage}`);
  }
}