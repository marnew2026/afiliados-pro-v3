import mongoose from "mongoose";
import Wallet from "../../models/Wallet.js";

export async function lockWallet(userId, fn) {
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {

      // 🔒 trava o documento na leitura
      const wallet = await Wallet.findOne({ userId })
        .session(session)
        .exec();

      if (!wallet) {
        throw new Error("Wallet não encontrada");
      }

      // 🔥 EXECUÇÃO SEGURA
      const result = await fn(wallet, session);

      return result;
    });

  } finally {
    session.endSession();
  }
}