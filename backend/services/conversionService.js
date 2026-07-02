import { getLastClick } from "./attributionService.js";
import { eventBus } from "../events/eventBus.js";
import { EVENTS } from "../events/eventTypes.js";

export async function handleConversion(userId, amount, metadata = {}) {
   console.trace("🔥 handleConversion foi chamada aqui:");
  try {
    const click = await getLastClick(userId);

    if (!click) {
      console.log("⚠️ Nenhum clique encontrado para atribuição");
      return;
    }

    // 💰 comissão (pode depois virar config por campanha)
    const commissionRate = 0.1;
    const commission = amount * commissionRate;

    // 🔥 evento de conversão (não mexe direto no wallet aqui)
    await eventBus.add("conversion-event", {
      
      name: EVENTS.CONVERSION_CREATED,
      data: {
        userId: click.userId,
        commission,
        campaignId: click.campaignId,
        amount,
        metadata,
      },
    });
    console.log("EVENT ADD:", name, new Error().stack);
    console.log("💰 Conversão enviada para fila:", commission);
  } catch (err) {
    console.error("❌ erro na conversão:", err.message);
  }
}