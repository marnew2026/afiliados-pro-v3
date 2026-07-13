import express from "express";
import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import { protect } from "../middlewares/authMiddleware.js";
import { registerClick } from "../services/clickService.js";
import { addCredit } from "../services/ledgerService.js";
 console.log("🔥🔥🔥 ENTROU NA ROTA CLICK");
const router = express.Router();

/**
 * Criar campanha
 */
router.post("/create", async (req, res) => {
  console.log("🔥🔥🔥 CAMPAIGN ROUTES NOVA 13/07");
   console.log("🔥🔥🔥 CREATE CHAMADO");
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
   console.log("========== CAMPANHA CRIADA ==========");
console.log(campaign);
console.log("createdAt:", campaign.createdAt);
console.log("updatedAt:", campaign.updatedAt);
console.log("=====================================");
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

/**
 * Tracking de clique
 */
router.get("/r/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).send("Campanha não encontrada");
    }

    // Incrementa os cliques
    campaign.clicks += 1;

    // Valor do clique (ajuste depois se desejar)
    const valorClique = 0.10;

    campaign.earnings += valorClique;

    await campaign.save();

    // Registra o clique
    await registerClick(
      campaign.userId.toString(),
      campaign._id.toString()
    );

    // Registra o crédito no Ledger
    await addCredit({
    userId: campaign.userId.toString(),
      amount: valorClique,
      referenceId: `click-${campaign._id}-${Date.now()}`,
      source: "campaign",
      description: "Clique em campanha",
      metadata: {
        campaignId: campaign._id,
      },
    });
console.log("✅ Clique registrado:", {
  campanha: campaign.nome,
  clicks: campaign.clicks,
  earnings: campaign.earnings,
  destino: campaign.link,
});
    return res.redirect(campaign.link);

  } catch (err) {
    console.error(err);

    return res.status(500).send("Erro interno");
  }
});

/**
 * Gerar clique (sem redirecionar)
 */
router.post("/:id/click", async (req, res) => {
    console.log("🔥🔥🔥 ENTROU NA ROTA CLICK");
  console.log("=================================");
  console.log("🔥 INICIOU CLICK");
  console.log("ID:", req.params.id);

  try {

    const campaign = await Campaign.findById(req.params.id);

    console.log("CAMPANHA:", campaign);

    if (!campaign) {
      console.log("❌ Campanha não encontrada");

      return res.status(404).json({
        success:false
      });
    }

    campaign.clicks += 1;

    campaign.earnings += 0.10;

    console.log("ANTES SAVE");

    await campaign.save();

    console.log("SAVE OK");

    console.log("ANTES registerClick");

    await registerClick(
      campaign.userId.toString(),
      campaign._id.toString()
    );

    console.log("registerClick OK");

    console.log("ANTES addCredit");

    await addCredit({
      userId: campaign.userId.toString(),
      amount:0.10,
      referenceId:`click-${campaign._id}-${Date.now()}`,
      source:"campaign",
      description:"Clique manual",
      metadata:{
        campaignId:campaign._id
      }
    });

    console.log("addCredit OK");

    return res.json({
      success:true
    });

  } catch(err){

    console.log("######### ERRO #########");

    console.log(err);

    console.log("########################");

    return res.status(500).json({
      success:false,
      error:err.message
    });

  }

});

export default router;