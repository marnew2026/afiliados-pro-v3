import express from "express";
import Wallet from "../models/Wallet.js";
import { safeCreateLedger } from "../src/services/safeCreateLedger.js";
import { withLock } from "../src/lib/redlock.js";
import { rebuildWallet } from "../src/services/rebuildWallet.js";
import Withdraw from "../models/Withdraw.js";
import Ledger from "../models/Ledger.js";
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { userId, amount, pixKey, withdrawId } = req.body;

    if (!userId) {
      throw new Error("userId obrigatório");
    }

    if (!withdrawId) {
      throw new Error("withdrawId obrigatório");
    }

    const result = await withLock(`withdraw:${userId}`, async () => {

      const wallet = await Wallet.findOne({ userId });

      // =========================
      // 🔐 VALIDAÇÕES BÁSICAS
      // =========================
      if (!wallet) {
        throw new Error("Wallet não encontrada");
      }

      const value = Number(amount);

      if (!Number.isFinite(value) || value <= 0) {
        throw new Error("Valor inválido");
      }

      if (!pixKey) {
        throw new Error("PIX obrigatório");
      }

      if (wallet.riskScore > 10) {
        throw new Error("Conta bloqueada por risco");
      }

      if (wallet.withdrawLocked) {
        throw new Error("Saque bloqueado para esta conta");
      }

      if (wallet.availableBalance < value) {
        throw new Error("Saldo insuficiente");
      }

      // =========================
      // 📊 LIMITE DIÁRIO
      // =========================
      const LIMIT = 5000;

      const todayWithdrawn = Number(wallet.dailyWithdrawn || 0);

      if (todayWithdrawn + value > LIMIT) {
        throw new Error("Limite diário excedido.");
      }

      // Evita múltiplos saques simultâneos
      const existing = await Withdraw.findOne({
        userId,
        status: { $in: ["pending", "processing"] }
      });

      if (existing) {
        throw new Error("Já existe um saque em processamento.");
      }

      // =========================
      // 🧾 CRIA WITHDRAW
      // =========================
      const withdraw = await Withdraw.create({
        userId,
        amount: value,
        pixKey,
        withdrawId,
        referenceId: withdrawId,
        status: "pending",
      });

      // =========================
      // 🔒 RESERVA IMEDIATA NO WALLET
      // =========================
      await Wallet.updateOne(
        { userId },
        {
          $inc: {
            availableBalance: -value,
            lockedBalance: value,
            dailyWithdrawn: value,
          },
          $set: {
            lastWithdrawAt: new Date(),
          }
        }
      );

      // =========================
      // 📌 RESERVA + LEDGER
      // =========================
      let ledger;

      try {
        ledger = await safeCreateLedger({
          userId,
          type: "debit",
          amount: value,
          status: "pending",
          referenceId: withdrawId,
          source: "withdraw",
        });
      } catch (err) {
        const deletedWithdraw = await Withdraw.deleteOne({
          _id: withdraw._id,
        });

        if (deletedWithdraw.deletedCount !== 1) {
          console.log("⚠️ Withdraw não removido.");
        }

        throw err;
      }

      // =========================
      // 🧠 RECONSTRUÇÃO DE WALLET
      // =========================
      try {
        const walletUpdated = await rebuildWallet(userId);

        if (!walletUpdated) {
          throw new Error("Erro reconstruindo wallet");
        }
      } catch (err) {

        // rollback withdraw
        const deletedWithdraw = await Withdraw.deleteOne({
          _id: withdraw._id,
        });

        if (deletedWithdraw.deletedCount !== 1) {
          console.log("⚠️ Withdraw não removido.");
        }

        // rollback ledger
        if (ledger?._id) {
          try {
            const deletedLedger = await Ledger.deleteOne({
              _id: ledger._id,
            });

            if (deletedLedger.deletedCount !== 1) {
              console.log("⚠️ Ledger não removido.");
            }
          } catch (e) {
            console.log("⚠️ Erro removendo Ledger:", e.message);
          }
        }

        throw err;
      }

      return {
        success: true,
        ledger,
      };
    });

    return res.json(result);

  } catch (err) {
    console.log("❌ WITHDRAW ERROR:", err.message);

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "Withdraw já existe.",
      });
    }

    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;