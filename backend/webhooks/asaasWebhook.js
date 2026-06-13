import Withdraw from "../models/Withdraw.js";
import Wallet from "../models/Wallet.js";

export async function asaasWebhook(req, res) {
  try {
    console.log("🔥 WEBHOOK ASAAS RECEBIDO");
    console.log(JSON.stringify(req.body, null, 2));
    const event = req.body;

    const type = event.event;

    const externalId = event.transfer?.externalReference;

    const withdraw = await Withdraw.findOne({ externalId });

    if (!withdraw) return res.status(200).send("OK");

    const wallet = await Wallet.findOne({ userId: withdraw.userId });

 if (type === "TRANSFER_DONE") {

  if (withdraw.status === "paid") {
    return res.status(200).send("OK");
  }

  withdraw.status = "paid";
  withdraw.paidAt = new Date();

  if (wallet) {
    wallet.lockedBalance -= withdraw.amount;
  }

  await withdraw.save();

  if (wallet) {
    await wallet.save();
  }
}

    // 🔴 FALHA
    if (type === "TRANSFER_FAILED") {

      if (withdraw.status === "failed") {
        return res.status(200).send("OK");
      }

      withdraw.status = "failed";
      withdraw.errorMessage = event.transfer?.failReason || "falha";

      // 🔴 devolve saldo
      if (wallet) {
        wallet.availableBalance += withdraw.amount;
        wallet.lockedBalance -= withdraw.amount;
      }

      await withdraw.save();
      await wallet.save();
    }

    return res.status(200).send("OK");

  } catch (err) {
    console.error(err);
    return res.status(200).send("OK");
  }
}