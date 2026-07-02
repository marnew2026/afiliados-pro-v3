import express from "express";

import Withdraw from "../models/Withdraw.js";
import Ledger from "../models/Ledger.js";

import { rebuildWallet } from "../src/services/rebuildWallet.js";

const router = express.Router();

router.post("/webhooks", async (req, res) => {
    console.log("🔥 WEBHOOK RECEBIDO");
  const token = req.headers["asaas-access-token"];

  if (token !== process.env.ASAAS_WEBHOOK_TOKEN) {
    console.log("❌ Webhook sem autorização");
    return res.sendStatus(401);
  }

  try {

    console.log("🔥 WEBHOOK ASAAS");
    console.log("🔥 ASAAS WEBHOOK ROUTE IMPORTADA");
    const event = req.body.event;
    const transfer = req.body.transfer;

    // restante do código...

    if (!transfer) {
      return res.sendStatus(200);
    }

    const withdraw = await Withdraw.findOne({
      asaasTransferId: transfer.id,
    });

    if (!withdraw) {
      console.log("Transfer não encontrada.");
      return res.sendStatus(200);
    }

    switch (event) {

      case "TRANSFER_DONE":

        await Withdraw.updateOne(
          {
            _id: withdraw._id,
            status: { $in: ["sent", "processing"] },
          },
          {
            $set: {
              status: "paid",
              paidAt: new Date(),
              asaasStatus: transfer.status,
              asaasResponse: transfer,
            },
          }
        );

        await Ledger.updateOne(
          {
            referenceId: withdraw.withdrawId,
            type: "debit",
          },
          {
            $set: {
              status: "confirmed",
            },
          }
        );

        await rebuildWallet(withdraw.userId);

        console.log("✅ TRANSFER_DONE");

        break;

      case "TRANSFER_FAILED":

        await Withdraw.updateOne(
          {
            _id: withdraw._id,
            status: { $in: ["sent", "processing"] },
          },
          {
            $set: {
              status: "failed",
              errorMessage: "Transferência recusada",
              asaasStatus: transfer.status,
              asaasResponse: transfer,
            },
          }
        );

        await Ledger.updateOne(
          {
            referenceId: withdraw.withdrawId,
            type: "debit",
          },
          {
            $set: {
              status: "failed",
            },
          }
        );

        await rebuildWallet(withdraw.userId);

        console.log("❌ TRANSFER_FAILED");

        break;

      default:
        console.log("Evento ignorado:", event);
    }

    return res.sendStatus(200);

  } catch (err) {

    console.error(err);

    return res.sendStatus(500);
  }
});

export default router;