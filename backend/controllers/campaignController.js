exports.redirectCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).send("Campanha não encontrada");
    }

    // 🔥 garante valores
    campaign.clicks = campaign.clicks || 0;

    // 📊 registra clique
    campaign.clicks += 1;

    await campaign.save();

    // 👉 redireciona
    return res.redirect(campaign.link);

  } catch (error) {
    return res.status(500).send("Erro ao redirecionar");
  }
};