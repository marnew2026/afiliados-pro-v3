import Ledger from "../models/Ledger.js";
import Wallet from "../models/Wallet.js";

export function startConversionWorker(eventBus) {
  eventBus.on("conversion-event", async (data) => {
    const { userId, commission, campaignId } = data;

    // 🔴 1. referenceId único OBRIGATÓRIO
    const referenceId = data.referenceId;

    if (!referenceId) {
      console.log("❌ SEM REFERENCE ID");
      return;
    }

    // 🔴 2. Ledger é a fonte da verdade
    const exists = await Ledger.findOne({
      referenceId,
      source: "campaign",
    });

    if (exists) {
      console.log("⚠️ DUPLICADO IGNORADO");
      return;
    }

    // 🔥 3. cria ledger primeiro
    await Ledger.create({
  userId,
  amount: commission,
  type: "credit",
  source: "campaign",
  referenceId,
  description: "Conversion commission",
  metadata: {
    campaignId,
  },
  status: "confirmed",
});

    // 🔥 4. atualiza wallet baseado no ledger (seguro)
  

    console.log("✅ CONVERSÃO PROCESSADA COM LEDGER");
  });
}