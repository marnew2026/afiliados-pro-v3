export const criarCampanha = async (req, res) => {
  try {
    const { nome, link, userEmail } = req.body;

    const affiliateLink =
      "https://afiliados-pro-v3-2.onrender.com/r/" +
      Math.random().toString(36).substring(2, 10);

    const campaign = new Campaign({
      nome,
      link,
      userEmail,
      affiliateLink,
      commission: 0.1,
      clicks: 0,
      sales: 0,
      earnings: 0,
    });

    await campaign.save();

    console.log("✅ CAMPANHA SALVA:");
    console.log(campaign);

    res.status(201).json({
      success: true,
      campaign,
    });
  } catch (err) {
    console.log("❌ ERRO AO SALVAR CAMPANHA");
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
};