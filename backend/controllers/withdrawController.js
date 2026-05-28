import Withdraw from "../models/Withdraw.js";
import { sendPix } from "../services/pixService.js";

export async function processWithdraw(req, res) {
  try {
    const withdraw = await Withdraw.findById(req.params.id);

    if (!withdraw) {
      return res.status(404).json({ error: "Saque não encontrado" });
    }

    if (withdraw.status !== "processing") {
      return res.status(400).json({ error: "Status inválido" });
    }

    // 🔥 ENVIA PIX REAL
    const pix = await sendPix({
      pixKey: withdraw.pixKey,
      amount: withdraw.amount,
    });

    withdraw.status = "approved";
    withdraw.externalId = pix.id;
    withdraw.paidAt = new Date();

    await withdraw.save();

    res.json({
      success: true,
      pix,
      withdraw,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao processar PIX" });
  }
}