import Ledger from "../../models/Ledger.js";

console.log("SAFE LEDGER V2 CARREGADO");

export async function safeCreateLedger(entry, session = null) {
  try {
    return await Ledger.create([entry], { session })
      .then(r => r[0]);
  } catch (err) {
    if (err.code === 11000) {
      return await Ledger.findOne({
        referenceId: entry.referenceId,
        type: entry.type,
      }).session(session);
    }

    throw err;
  }
}