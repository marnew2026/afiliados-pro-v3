import Withdraw from "../models/Withdraw.js";
import Transaction from "../models/Transaction.js";
import Wallet from "../models/Wallet.js";

export async function asaasWebhook(req, res) {
  try {
  const { transfer } = req.body;
if (!transfer?.id) {
  return res.status(200).json({ ok: true });
}    

    // 🔒 IDEMPOTÊNCIA
    const withdraw = await Withdraw.findOne({
      externalId: transfer.id,
    });

    if (!withdraw) {
      return res.status(200).json({ ok: true });
    }

    if (withdraw.status === "paid") {
      return res.status(200).json({ ok: true });
    }


  if (transfer.status !== "DONE") {
  return res.status(200).json({ ok: true });
}

    // 🔥 só confirma pagamento
   await Wallet.findOneAndUpdate(
  { userEmail: withdraw.userEmail },
  {
    $inc: {
      lockedBalance: -withdraw.amount,
    },
    $set: {
      withdrawLocked: false,
    },
  }
);
      withdraw.status = "paid";
      withdraw.paidAt = new Date();

      await withdraw.save();

     await Transaction.create({
  userEmail: withdraw.userEmail,
  type: "withdraw",
  amount: withdraw.amount,
  referenceId: withdraw._id.toString(),
  description: "Saque aprovado PIX",
  status: "confirmed",
});

return res.status(200).json({ ok: true });
 

  } catch (err) {
    console.log("WEBHOOK ERROR:", err.message);
    return res.status(200).json({ ok: true });
  }
}