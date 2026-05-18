import { useEffect, useState } from "react";

const API = "https://afiliados-pro-v3-2.onrender.com";

export default function Dashboard() {
  const [data, setData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const affiliateCode =
      user?.affiliateCode || user?.user?.affiliateCode;

    const res = await fetch(`${API}/dashboard/${affiliateCode}`);
    const json = await res.json();
    setData(json);
  }

  if (!data) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Dashboard Afiliado</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <Card title="Cliques" value={data.clicks} />
        <Card title="Vendas" value={data.sales} />
        <Card title="Comissão" value={`R$ ${data.totalCommission}`} />
        <Card
          title="Conversão"
          value={`${data.conversionRate?.toFixed(2) || 0}%`}
        />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        padding: 20,
        background: "#111",
        color: "#fff",
        borderRadius: 10,
        minWidth: 150,
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}