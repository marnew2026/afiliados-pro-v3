import express from "express";
import Campaign from "../models/Campaign.js";
import Withdrawal from "../models/Withdraw.js";

const router = express.Router();

/* LISTAR CAMPANHAS */
router.get("/user/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    // campanhas
    const campaigns = await Campaign.find({
      userEmail,
    });

    // total ganhos
    const totalEarnings = campaigns.reduce(
      (acc, c) => acc + (c.earnings || 0),
      0
    );

    // saques
    const withdrawals = await Withdrawal.find({
      userEmail,
      status: { $in: ["pending", "approved"] },
    });

    // total sacado
    const totalWithdrawn = withdrawals.reduce(
      (acc, w) => acc + (w.amount || 0),
      0
    );

    // saldo disponível
    const availableBalance =
      totalEarnings - totalWithdrawn;

    res.json({
      campaigns,
      totalEarnings,
      totalWithdrawn,
      availableBalance,
      withdrawals,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
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

    const codigo = Math.random()
      .toString(36)
      .substring(2, 10);
    console.log({
  nome,
  link,
  userEmail,
});
    const campaign = await Campaign.create({
      userEmail,
      nome,
      link,
      affiliateLink:
        `https://afiliados-pro-v3-2.onrender.com/r/${codigo}`,
      commission: 0.1,
      clicks: 0,
      earnings: 0,
      sales: 0,
    });

    res.json(campaign);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

/* REGISTRAR CLIQUE */
router.post("/:id/click", async (req, res) => {
  try {
    const campaign = await Campaign.findById(
      req.params.id
    );

    if (!campaign) {
      return res.status(404).json({
        error: "Campanha não encontrada",
      });
    }

   if (!campaign.clicks) campaign.clicks = 0;

campaign.clicks += 1;

await campaign.save();

res.json({
  clicks: campaign.clicks,
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

/* REGISTRAR VENDA */
router.post("/:id/sale", async (req, res) => {
  try {
    const campaign = await Campaign.findById(
      req.params.id
    );

    if (!campaign) {
      return res.status(404).json({
        error: "Campanha não encontrada",
      });
    }

    if (campaign.sales == null)
      campaign.sales = 0;

    if (campaign.earnings == null)
      campaign.earnings = 0;

    campaign.sales += 1;

    // ganha R$10 por venda
    campaign.earnings += 10;

    await campaign.save();

    res.json(campaign);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

/* EXCLUIR CAMPANHA */
router.delete("/:id", async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(
      req.params.id
    );

    res.json({
      ok: true,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;