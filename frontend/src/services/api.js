const API_URL = "https://afiliados-pro-v3-2.onrender.com";

/* ==============================
   📦 LISTAR CAMPANHAS
============================== */
export async function getCampaigns(userId) {
  try {
    const res = await fetch(
      `${API_URL}/campaigns?ownerId=${userId}`
    );

    if (!res.ok) {
      throw new Error("Erro ao buscar campanhas");
    }

    return await res.json();
  } catch (err) {
    console.log("Erro getCampaigns:", err);
    return [];
  }
}

/* ==============================
   ➕ CRIAR CAMPANHA
============================== */
export async function createCampaign(data) {
  try {
    const res = await fetch(`${API_URL}/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Erro ao criar campanha");
    }

    return await res.json();
  } catch (err) {
    console.log("Erro createCampaign:", err);
    return null;
  }
}