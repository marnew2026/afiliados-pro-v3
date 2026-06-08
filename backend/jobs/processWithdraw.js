import Withdraw from "../models/Withdraw.js";
import { sendPix } from "../services/pixService.js";

export async function processWithdraw(withdrawId) {
  const withdraw = await Withdraw.findById(withdrawId);

  if (!withdraw) return;

  const pix = await sendPix({
    pixKey: withdraw.pixKey,
    amount: withdraw.amount,
  });

 withdraw.status = "paid";
  withdraw.externalId = pix.id;
  withdraw.paidAt = new Date();
console.log(
  "STATUS ANTES DE SALVAR:",
  withdraw.status
);
  await withdraw.save();
}