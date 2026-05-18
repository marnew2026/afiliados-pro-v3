import { useEffect, useState } from "react";

const API = "https://afiliados-pro-v3-2.onrender.com";

export default function ProducerDashboard() {
  const [data, setData] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch(`${API}/dashboard/producer/${userId}`);
    const json = await res.json();
    setData(json);
  }

  if (!data) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🏪 Dashboard Produtor</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <Card title="Vendas" value={data.sales} />
        <Card title="Receita Total" value={`R$ ${data.revenue}`} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      padding: 20,
      background: "#0f172a",
      color: "#fff",
      borderRadius: 10
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}