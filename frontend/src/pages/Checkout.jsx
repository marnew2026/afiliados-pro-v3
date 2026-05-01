import React from "react";

export default function Checkout() {
  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:8081/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ref: "afiliado123" }),
      });

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

  return (
    <div style={{ padding: 30 }}>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Comprar Agora</button>
    </div>
  );
}