import express from "express";
import Withdraw from "../models/Withdraw.js";
import User from "../models/User.js";

console.log("🚀 ADMIN WITHDRAW ROUTES CARREGADA");

const router = express.Router();

/**
 * LISTAR SAQUES
 */
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const withdrawals = await Withdraw.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    for (const item of withdrawals) {
      const user = await User.findById(item.userId).lean();

console.log("USUARIO COMPLETO:");
console.log(JSON.stringify(user, null, 2));
        console.log("USER ENCONTRADO:");
console.log(user);

      item.user = user;
    }
const totalUsers = await User.countDocuments();

const totalWithdraws = await Withdraw.countDocuments();


res.json({
  success: true,
  withdrawals,
  totalUsers,
  totalWithdraws,
});

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/**
 * ESTATÍSTICAS
 */
router.get("/stats", async (req, res) => {
   console.log("🔥🔥🔥 NOVA ROTA /stats EXECUTANDO 🔥🔥🔥");
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

const totalUsers = await User.countDocuments();

const totalWithdraws = await Withdraw.countDocuments();

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
console.log({
  paid,
  sent,
  processing,
  failed,
  totalUsers,
  totalWithdraws,
  totalPaid: totalAmount[0]?.total || 0,
});
res.json({
  paid,
  sent,
  processing,
  failed,
  totalPaid: totalAmount[0]?.total || 0,
  totalUsers,
  totalWithdraws,
});

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;