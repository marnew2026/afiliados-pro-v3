import express from "express";
import Wallet from "../models/Wallet.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

   const mongoUserId = user._id.toString();

let wallet = await Wallet.findOne({
  userId: mongoUserId,
});

if (!wallet) {
  wallet = await Wallet.create({
    userId: mongoUserId,
    availableBalance: 0,
    lockedBalance: 0,
    totalEarned: 0,
  });
}

    return res.json({
      wallet,
    });

  } catch (err) {
    console.log("🔥 WALLET ERROR:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;