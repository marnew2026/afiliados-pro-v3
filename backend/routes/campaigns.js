import express from "express";
console.log("🔥🔥🔥 CAMPAIGNS ROUTE NOVA CARREGADA");
import Campaign from "../models/Campaign.js";
import User from "../models/User.js";
import { protect } from "../middlewares/authMiddleware.js";
import { registerClick } from "../services/clickService.js";
import { addCredit } from "../services/ledgerService.js";
import { rebuildWallet } from "../src/services/rebuildWallet.js";
import axios from "axios";
import ClickLog from "../models/ClickLog.js";
import { toCents, toReais, fixMoney } from "../utils/money.js";
const router = express.Router();

/**
 * Criar campanha
 */
router.post("/create", async (req, res) => {
  
  try {

    let { nome, link, userId } = req.body;

// Remove espaços e quebras de linha
nome = (nome || "").trim();
link = (link || "").trim();

// Validação do nome
if (!nome) {
  return res.status(400).json({
    success: false,
    error: "Nome da campanha é obrigatório."
  });
}

// Validação do link
if (!link) {
  return res.status(400).json({
    success: false,
    error: "Link da campanha é obrigatório."
  });
}


// Aceita apenas URLs HTTP/HTTPS
if (!/^https?:\/\/.+/i.test(link)) {
    return res.status(400).json({
        success: false,
        error: "Link inválido"
    });
}
    const user = await User.findById(userId);

   if (!user) {
  return res.status(404).json({
    success: false,
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
  success: false,
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

const campaignsFixed = campaigns.map((campaign) => {
  const data = campaign.toObject();

  return {
    ...data,
    earnings: fixMoney(data.earnings || 0),
  };
});

return res.json(campaignsFixed);

  } catch (err) {
    return res.status(500).json({
  success: false,
  error: err.message,
});
  }
});

/**
 * Atualizar campanha
 */
router.put("/:id", protect, async (req, res) => {
  try {

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: "Campanha não encontrada",
      });
    }

    if (campaign.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Sem permissão",
      });
    }

    if(req.body.nome !== undefined){

  const novoNome = req.body.nome.trim();

  if(!novoNome){
    return res.status(400).json({
      success:false,
      error:"Nome não pode ficar vazio"
    });
  }

  campaign.nome = novoNome;
}


if(req.body.link !== undefined){

  const novoLink = req.body.link.trim();

  if(!novoLink){
    return res.status(400).json({
      success:false,
      error:"Link não pode ficar vazio"
    });
  }

  campaign.link = novoLink;
}

    await campaign.save();

    return res.json({
      success: true,
      campaign,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message,
    });

  }
});
/**
 * Excluir campanha
 */
router.delete("/:id", protect, async (req, res) => {
  try {

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: "Campanha não encontrada",
      });
    }

    if (campaign.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Sem permissão",
      });
    }

    await campaign.deleteOne();

    return res.json({
      success: true,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message,
    });

  }
});
/**
 * Tracking de clique
 */
router.get("/r/:id", async (req, res) => {
console.time("CLICK_TOTAL");
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress;

  console.log("==================================");
  console.log("VERSAO NOVA 19/07 - ROUTA R");
  console.log("==================================");
  console.log("🔥 ENTROU NA ROTA /campaigns/r");
  console.log("ID:", req.params.id);
  console.log("IP:", ip);

  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    return res.status(404).send("Campanha não encontrada");
  }


const agora = Date.now();

if (
    campaign.lastClickIp === ip &&
    campaign.lastClickAt &&
    agora - new Date(campaign.lastClickAt).getTime() < 300000
) {
    console.log("Clique repetido ignorado.");

    return res.redirect(campaign.link);
}


// últimos 30 minutos
const limite = new Date(Date.now() - 30 * 60 * 1000);

const repetido = await Campaign.findOne({
  _id: campaign._id,
  lastClicks: {
    $elemMatch: {
      ip,
      date: { $gte: limite }
    }
  }
});

if (repetido) {
  console.log("⚠️ Clique repetido:", ip);
  return res.redirect(campaign.link);
}
  try {


    // Incrementa os cliques
    campaign.clicks += 1;

    // Valor do clique (ajuste depois se desejar)
    const valorClique = 0.10;
  console.log("Salvando campanha...");
 const earningsCents =
  toCents(campaign.earnings || 0) +
  toCents(valorClique);

campaign.earnings = toReais(earningsCents);
    if (!campaign.lastClicks) {
  campaign.lastClicks = [];
}

campaign.lastClicks.push({
  ip,
  date: new Date(),
});

// mantém somente os últimos 100 registros
campaign.lastClicks = campaign.lastClicks.slice(-100);
campaign.lastClickIp = ip;
campaign.lastClickAt = new Date();
  console.time("campaignSave");
  console.log("ANTES DO SAVE");
console.log(fixMoney(campaign.earnings || 0));
await campaign.save();
const campanhaBanco = await Campaign.findById(campaign._id);

console.log("MEMÓRIA:", campaign.earnings);
console.log("BANCO:", campanhaBanco.earnings);
console.log("DEPOIS DO SAVE");
console.log(fixMoney(campaign.earnings || 0));
const teste = await Campaign.findById(campaign._id);

console.log("MONGO:");
console.log(teste.earnings);
console.timeEnd("campaignSave");

console.log("===== CAMPANHA APÓS SAVE =====");
console.log({
  id: campaign._id,
  clicks: campaign.clicks,
  earnings: fixMoney(campaign.earnings || 0),
})
console.log({
  clicksDepois: campaign.clicks,
  ganhosDepois: campaign.earnings,
});
console.log("===============================");

console.log("===== CAMPANHA APÓS SAVE =====");
console.log("Clicks:", campaign.clicks);
console.log("Ganhos:", fixMoney(campaign.earnings || 0));
console.log("==============================");

console.log("Chamando registerClick...");

    // Registra o clique
    console.time("registerClick");
await registerClick(
  campaign.userId.toString(),
  campaign._id.toString()
);
console.timeEnd("registerClick");
  console.log("registerClick OK");

console.time("clickLog");
await ClickLog.create({
  campaignId: campaign._id,
  userId: campaign.userId,
  ip,
  userAgent: req.headers["user-agent"] || "",
  referer: req.headers.referer || "",
});
console.timeEnd("clickLog");

console.log("✅ ClickLog salvo");

 console.log("➡️ Chamando addCredit...");

const referenceId = `click-${campaign._id}-${Date.now()}`;

console.log("💰 ADD CREDIT INICIO");

console.log({
  userId: campaign.userId.toString(),
  amount: valorClique,
  referenceId
});

console.time("addCredit");
await addCredit({
  userId: campaign.userId.toString(),
  amount: valorClique,
  referenceId,
  source: "campaign",
  description: "Clique em campanha",
  metadata: {
    campaignId: campaign._id,
  },
});
console.timeEnd("addCredit");


   console.log("✅ ADD CREDIT FINALIZADO");
console.log({
 userId: campaign.userId.toString(),
 valorCreditado: valorClique,
 referencia: referenceId
});
    console.log("3️⃣ Vai chamar rebuildWallet");
console.log("🚨 ANTES DO REBUILD WALLET");
console.time("rebuildWallet");
const wallet = await rebuildWallet(
  campaign.userId.toString()
);
console.log("🚨 DEPOIS DO REBUILD WALLET");
console.log("4️⃣ RebuildWallet terminou");

console.log("===== WALLET FINAL DO CLICK =====");
console.log(wallet);
console.log("===============================");
console.timeEnd("CLICK_TOTAL");

    return res.redirect(campaign.link);

  } catch (err) {
   console.error("Erro no redirecionamento da campanha:", err);

    return res.status(500).send("Erro interno");
  }
});

/**
 * Registrar clique sem redirecionar
 */
router.post("/:id/click", async (req, res) => {
  console.log("⚠️ POST /:id/click DESATIVADO — use GET /r/:id");

  return res.status(410).json({
    success: false,
    error: "Rota antiga de clique desativada. Use /campaigns/r/:id",
  });
});
/**
 * Gerar clique (sem redirecionar)
 */
router.post("/title", async (req, res) => {
   console.log("🔥🔥🔥 ROTA /campaigns/title EXECUTOU");

  try {

    const { link } = req.body;

    console.log("================================");
    console.log("LINK RECEBIDO:");
    console.log(link);
    console.log("================================");

    if (!link) {
      return res.status(400).json({
        success:false,
        error:"Link não informado"
      });
    }

    const response = await axios.get(link);

    const html = response.data;

    const match = html.match(/<title>(.*?)<\/title>/i);

    let titulo = "";

    if(match){

      titulo = match[1]
        .replace(" | Mercado Livre","")
        .replace(" | MercadoLivre","")
        .replace("Mercado Livre","")
        .replace("Brasil","")
        .trim();

    }

    console.log("TÍTULO:");
    console.log(titulo);

    res.json({
      success:true,
      title:titulo
    });

  } catch(err){

    console.log("ERRO TITLE");

    console.log(err.message);

    res.status(500).json({
      success:false
    });

  }

});
export default router;