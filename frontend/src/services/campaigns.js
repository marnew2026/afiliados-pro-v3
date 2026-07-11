const API_URL = "https://afiliados-pro-v3-2.onrender.com";

// 💳 CHECKOUT / VIRAR PRO
export const criarCheckout = async (user) => {
  try {
    console.log("BODY RECEBIDO:", req.body);
    const res = await fetch(
  `${API_URL}/stripe/create-checkout-session`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
    }),
  }
);

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
export async function handleConversion(userId, amount, metadata = {}) {
  try {
    const click = await getLastClick(userId);

    if (!click) {
      console.log("⚠️ Nenhum clique encontrado para atribuição");
      return;
    }

    const commissionRate = 0.1;
    const commission = amount * commissionRate;

    await eventBus.add("conversion-event", {
      name: EVENTS.CONVERSION_CREATED,
      data: {
        userId, // 🔥 SEMPRE o user original
        campaignId: click.campaignId,
        commission,
        amount,
        metadata,
      },
    });

    console.log("💰 Conversão enviada para fila:", commission);
  } catch (err) {
    console.error("❌ erro na conversão:", err.message);
  }
}