import express from "express";
import User from "../models/User.js";

const router = express.Router();

/**
 * STATUS PRO DO USUÁRIO (PADRÃO USERID)
 * GET /user-pro/:userId
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        isPro: false,
      });
    }

    return res.json({
      isPro: user.isPro || false,
      userId: user._id,
    });

  } catch (error) {
    console.log("USER-PRO ERROR:", error);
    return res.status(500).json({
      error: "Erro ao buscar status do usuário",
    });
  }
});

export default router;