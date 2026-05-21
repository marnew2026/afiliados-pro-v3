import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

/* LISTAR CAMPANHAS */
router.get("/:email", async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* CRIAR CAMPANHA */
router.post("/create", async (req, res) => {
  try {
    const { userEmail, nome, link } = req.body;

    if (!nome || !link) {
      return res.status(400).json({
        msg: "Nome e link obrigatórios",
      });
    }

    const codigo = Math.random().toString(36).substring(2, 10);

    const campaign = await Campaign.create({
      userEmail,
      nome,
      link,
      affiliateLink: `https://afiliados-pro-v3-2.onrender.com/r/${codigo}`,
      commission: 0.1,
      clicks: 0,
      earnings: 0,
      sales: 0,
    });

    res.json(campaign);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

/* REGISTRAR CLIQUE */
router.post("/:id/click", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        error: "Campanha não encontrada",
      });
    }

   

    campaign.earnings =
     

    await campaign.save();

    res.json({
      clicks: campaign.clicks,
      earnings: campaign.earnings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* REGISTRAR VENDA */
router.post("/:id/sale", async (req, res) => {
  try {
    const { valor } = req.body;

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        msg: "Campanha não encontrada",
      });
    }

    if (campaign.sales == null) campaign.sales = 0;
    if (campaign.earnings == null) campaign.earnings = 0;
    if (campaign.commission == null)
      campaign.commission = 0.1;

    const ganho =
      Number(valor || 100) *
      Number(campaign.commission);

   campaign.sales += 1;
campaign.earnings += 10;

    await campaign.save();

    const atualizado = await Campaign.findById(
      req.params.id
    );

    res.json(atualizado);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Erro ao registrar venda",
    });
  }
});

/* EXCLUIR CAMPANHA */
router.delete("/:id", async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);

    res.json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;