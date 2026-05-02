const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const controller = require("../controllers/campaign.controller");

router.post("/", authMiddleware, controller.createCampaign);
router.get("/", authMiddleware, controller.getCampaigns);

router.get("/r/:id", controller.redirectCampaign);
router.get("/r/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).send("Campanha não encontrada");
    }

    campaign.clicks = (campaign.clicks || 0) + 1;
    await campaign.save();

    return res.redirect(campaign.link);
  } catch (error) {
    return res.status(500).send("Erro no rastreamento");
  }
});
module.exports = router;