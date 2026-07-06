import express from "express";
import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

/**
 * Criar campanha
 */
router.post("/create", protect, async (req, res) => {
  try {
    console.log("🔥 CREATE CAMPAIGN");

    const { nome, link } = req.body;

    const userId = req.user.id;

    const campaign = await Campaign.create({
      userId,
      nome,
      link,
      active: true,
      clicks: 0,
      sales: 0,
      earnings: 0,
    });

    return res.json(campaign);

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

/**
 * Listar campanhas do usuário
 */
router.get("/user/:userId", async (req, res) => {
  try {

   const { userId } = req.params;

const campaigns = await Campaign.find({
  userId,
  active: true,
}).sort({ createdAt: -1 });

return res.json(campaigns);

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

/**
 * Atualizar campanha
 */
router.put("/:id", protect, async (req, res) => {
  try {

    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json(campaign);

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

/**
 * Excluir campanha
 */
router.delete("/:id", protect, async (req, res) => {
  try {

    await Campaign.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;