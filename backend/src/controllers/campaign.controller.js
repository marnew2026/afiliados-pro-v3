const Campaign = require("../models/Campaign");

exports.createCampaign = async (req, res) => {
  try {
    const { name, link } = req.body;

    const campaign = await Campaign.create({
      userId: req.userId,
      name,
      link,
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar campanha" });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.userId });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar campanhas" });
  }
};

exports.redirectCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).send("Campanha não encontrada");
    }

    campaign.clicks += 1;
    await campaign.save();

    return res.redirect(campaign.link);
  } catch (error) {
    return res.status(500).send("Erro ao redirecionar");
  }
};