import Withdraw from "../models/Withdraw.js";
import Wallet from "../models/Wallet.js";

export async function asaasWebhook(req, res) {
  try {
    console.log("🔥 WEBHOOK ASAAS RECEBIDO");
    console.log(JSON.stringify(req.body, null, 2));

    const event = req.body;
    const type = event.event;

    const transferId = event.transfer?.id;

    console.log("EVENTO:", type);
    console.log("TRANSFER ID:", transferId);

    const withdraw = await Withdraw.findOne({
      asaasTransferId: transferId,
    });

    console.log("WITHDRAW:", withdraw);

    if (!withdraw) {
      console.log("❌ SAQUE NÃO ENCONTRADO");
      return res.status(200).send("OK");
    }

    const wallet = await Wallet.findOne({
      userId: withdraw.userId,
    });

    // PIX CONCLUÍDO
    if (type === "TRANSFER_DONE") {

      if (withdraw.status === "paid") {
        return res.status(200).send("OK");
      }

      withdraw.status = "paid";
      withdraw.paidAt = new Date();

      if (wallet) {
        wallet.lockedBalance = Math.max(
          0,
          Number(wallet.lockedBalance || 0) - withdraw.amount
        );

        await wallet.save();
      }

      await withdraw.save();

      console.log("✅ SAQUE PAGO");
    }

    // PIX FALHOU
    if (type === "TRANSFER_FAILED") {

      if (withdraw.status === "failed") {
        return res.status(200).send("OK");
      }

      withdraw.status = "failed";
      withdraw.errorMessage =
        event.transfer?.failReason || "Falha na transferência";

      if (wallet) {
        wallet.availableBalance =
          Number(wallet.availableBalance || 0) +
          withdraw.amount;

        wallet.lockedBalance = Math.max(
          0,
          Number(wallet.lockedBalance || 0) -
          withdraw.amount
        );

        await wallet.save();
      }

      await withdraw.save();

      console.log("❌ SAQUE FALHOU");
    }

    return res.status(200).send("OK");

  } catch (err) {

    console.error("🔥 ERRO WEBHOOK ASAAS");
    console.error(err);

    return res.status(200).send("OK");
  }
}