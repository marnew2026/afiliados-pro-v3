import express from "express";
import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

/**
 * Criar campanha
 */
router.post("/create", async (req, res) => {
    console.log("🔥 CREATE CAMPANHA");
  console.log(req.body);
  console.log("🔥 CAMPAIGNS ROUTE CARREGADA");

 console.log("🔥 CREATE CAMPANHA NOVA");

 console.log("BODY:", req.body);

 console.log("AUTH:", req.headers.authorization);
    console.log("🔥 CREATE CAMPANHA ENTROU");
 
  
  try {

    const { nome, link, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

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
    console.error("ERRO CREATE CAMPAIGN:", err);

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