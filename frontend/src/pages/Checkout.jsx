import React from "react";

export default function Checkout() {
  const handleCheckout = async () => {
    try {
      const res = await fetch(
  "http://192.168.0.9:3001/checkout/create-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ref: "afiliado123",
          }),
        }
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erro ao gerar checkout");
        console.log(data);
      }
    } catch (error) {
      console.error(error);
      alert("Erro na conexão com backend");
    }
  };
async function handleCheckout(offerId) {
  try {
    const res = await fetch(`http://localhost:3001/checkout/test/${offerId}`);

    const data = await res.json();

    if (!data.url) {
      alert("Erro ao gerar checkout");
      return;
    }

    // 🔥 redireciona corretamente para Stripe
    window.location.href = data.url;

  } catch (err) {
    console.error("Erro checkout:", err);
    alert("Erro no checkout");
  }
} 
<button onclick="handleCheckout('SEU_OFFER_ID_REAL')">
  Comprar agora
</button>
  return (
    <div style={{ padding: 30 }}>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>
        Comprar Agora
      </button>
    </div>
  );
}