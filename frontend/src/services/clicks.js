const API_URL = "https://afiliados-pro-v3-2.onrender.com";

// 👆 registrar clique (BACKEND)
export async function registerClick(campaignId) {
  try {
    const res = await fetch(`${API_URL}/clicks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        campaignId,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao registrar clique:", error);
    return { success: false };
  }
}

// 📊 pegar cliques de uma campanha
export async function getClicksByCampaign(campaignId) {
  try {
    const res = await fetch(
      `${API_URL}/clicks?campaignId=${campaignId}`
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar cliques:", error);
    return [];
  }
}