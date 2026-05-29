const express = require("express");
const router = express.Router();

const Campaign = require("../models/Campaign");

router.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;

    const campaign = await Campaign.findOne({
      affiliateLink: {
        $regex: code,
      },
    });

    if (!campaign) {
      return res
        .status(404)
        .send("Link não encontrado");
    }

    campaign.clicks += 1;

    await campaign.save();

    return res.redirect(campaign.link);

  } catch (err) {
    console.log(err);

    res.status(500).send("Erro");
  }
});

module.exports = router;