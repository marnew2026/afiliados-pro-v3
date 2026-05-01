import { useEffect, useState } from "react";

export default function Panel() {
  const [data, setData] = useState(null);
  const [code] = useState("ABC123"); // depois vem do login
  const [pixKey, setPixKey] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch(`https://afiliados-pro-v3-production.up.railway.app/affiliate/${code}`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  const withdraw = async () => {
    await fetch("https://afiliados-pro-v3-production.up.railway.app/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        pixKey,
        amount: Number(amount),
      }),
    });

    alert("Saque solicitado!");
  };

  if (!data) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Painel Afiliado</h1>

      <h2>Saldo: R$ {data.affiliate.balance}</h2>
      <h3>Total ganho: R$ {data.affiliate.totalEarned}</h3>

      <h2>Conversões</h2>
      {data.conversions.map((c) => (
        <div key={c._id}>
          💰 R$ {c.commission}
        </div>
      ))}

      <hr />

      <h2>Saque PIX</h2>

      <input
        placeholder="Chave PIX"
        onChange={(e) => setPixKey(e.target.value)}
      />

      <input
        placeholder="Valor"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={withdraw}>Solicitar saque</button>
    </div>
  );
}