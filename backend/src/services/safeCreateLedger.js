import Ledger from "../../models/Ledger.js";

console.log("SAFE LEDGER V2 CARREGADO");

export async function safeCreateLedger(entry, session = null) {
  try {
    const ledger = await Ledger.create([entry], { session });

  console.log("✅ Ledger criado");

    return ledger[0];

  } catch (err) {

    if (err.code === 11000) {

     console.log("⚠ Ledger duplicado ignorado");

      return await Ledger.findOne({
        referenceId: entry.referenceId,
        type: entry.type,
      }).session(session);

    }

    throw err;
  }
}