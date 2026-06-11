import express from "express";
import Withdraw from "../models/Withdraw.js";

console.log("🚀 ADMIN WITHDRAW ROUTES CARREGADA");

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const { status } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const withdrawals = await Withdraw.find(filter)
      .sort({ createdAt: -1 })
      .limit(200);

    res.json({
      success: true,
      withdrawals,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/stats", async (req, res) => {
  console.log("🔥 STATS CHAMADO");

  try {

    const paid = await Withdraw.countDocuments({
      status: "paid",
    });

    const sent = await Withdraw.countDocuments({
      status: "sent",
    });

    const processing = await Withdraw.countDocuments({
      status: "processing",
    });

    const failed = await Withdraw.countDocuments({
      status: "failed",
    });

    const totalAmount = await Withdraw.aggregate([
      {
        $match: {
          status: "paid",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    res.json({
      paid,
      sent,
      processing,
      failed,
      totalPaid: totalAmount[0]?.total || 0,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;