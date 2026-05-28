import express from "express";
import Campaign from "../models/Campaign.js";
import Click from "../models/Click.js";

const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress;

    // 🔎 encontra campanha pelo código
    const campaign = await Campaign.findOne({
      affiliateLink: { $regex: code },
    });

    if (!campaign) {
      return res.status(404).json({ error: "Link inválido" });
    }

    // 🛡 anti-spam (5 min)
    const lastClick = await Click.findOne({
      campaignId: campaign._id,
      ip,
    });

    const FIVE_MIN = 5 * 60 * 1000;

    if (lastClick) {
      const diff =
        Date.now() - new Date(lastClick.createdAt).getTime();

      if (diff < FIVE_MIN) {
        return res.redirect(campaign.link);
      }
    }

    // 📌 registra clique
    await Click.create({
      campaignId: campaign._id,
      ip,
    });

    campaign.clicks = (campaign.clicks || 0) + 1;

    await campaign.save();

    // 🔥 redireciona
    return res.redirect(campaign.link);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;