import express from "express";
import Withdraw from "../models/Withdraw.js";

const router = express.Router();

router.post("/asaas", async (req, res) => {
  try {
    const event = req.body;

    // 🔥 PIX RECEBIDO
    if (event.event === "PIX_RECEIVED") {
      const externalId = event.payment.id;

      const withdraw = await Withdraw.findOne({
        externalId,
      });

      if (withdraw) {
        withdraw.status = "approved";
        withdraw.paidAt = new Date();
        await withdraw.save();
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;