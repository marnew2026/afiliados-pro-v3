const API_URL = "https://afiliados-pro-v3-2.onrender.com";

// 💳 CHECKOUT / VIRAR PRO
export const criarCheckout = async (user) => {
  try {
    const res = await fetch(`${API_URL}/checkout/create-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
      }),
    });

    const data = await res.json();

    if (!data.url) {
      throw new Error("URL do checkout não retornada");
    }

    return data.url;
  } catch (error) {
    console.log("Erro checkout:", error.message);
    throw error;
  }
};

// 🚀 CRIAR CAMPANHA (BACKEND NODE)
export const createCampaign = async (data, user) => {
  if (!user) throw new Error("Usuário não logado");

  const res = await fetch(`${API_URL}/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      link: data.link,
      ownerId: user.uid,
      email: user.email,
    }),
  });

  const response = await res.json();

  if (res.status === 403) {
    throw new Error("PRO necessário");
  }

  return response;
};

// 📦 LISTAR CAMPANHAS (BACKEND NODE)
export const getCampaigns = async (user) => {
  if (!user) return [];

  const res = await fetch(
    `${API_URL}/campaigns?ownerId=${user.uid}`
  );

  const data = await res.json();

  return data;
};