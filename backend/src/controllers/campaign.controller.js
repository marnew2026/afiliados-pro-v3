import Campaign from "../models/Campaign.js";

export const createCampaign = async (req, res) => {
  try {
    const { name, link } = req.body;

    const campaign = await Campaign.create({
      name,
      link,
      ownerId: req.user.id,
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      ownerId: req.user.id,
    });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};