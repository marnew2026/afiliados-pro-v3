import { eventBus } from "../events/eventBus.js";
import Wallet from "../models/Wallet.js";
import { EVENTS } from "../events/eventTypes.js";

eventBus.on(EVENTS.CONVERSION_CREATED, async (data) => {
  console.log("🚨 EVENT RECEBIDO:", data);

  const { userId, commission } = data;

  const wallet = await Wallet.findOne({ userId });

  console.log("💰 WALLET FOUND:", wallet);

  if (!wallet) {
    console.log("❌ Wallet não encontrada");
    return;
  }

  wallet.availableBalance += commission;
  wallet.totalEarnings += commission;

  await wallet.save();

  console.log("✅ SALDO ATUALIZADO:", wallet.availableBalance);
});