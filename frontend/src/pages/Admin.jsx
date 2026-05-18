import { useEffect, useState } from "react";

const API = "https://afiliados-pro-v3-2.onrender.com";

export default function Admin() {
  const [ranking, setRanking] = useState([]);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const r1 = await fetch(`${API}/admin/users-ranking`);
    const r2 = await fetch(`${API}/admin/metrics`);

    setRanking(await r1.json());
    setMetrics(await r2.json());
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>📊 Admin Dashboard (Stripe Style)</h1>

      {/* MÉTRICAS */}
      {metrics && (
        <div style={{ display: "flex", gap: 20 }}>
          <Card title="Usuários" value={metrics.users} />
          <Card title="Vendas" value={metrics.sales} />
          <Card title="Receita" value={`R$ ${metrics.revenue}`} />
        </div>
      )}

      {/* RANKING */}
      <h2 style={{ marginTop: 30 }}>🏆 Ranking de Usuários</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Score</th>
            <th>Nível</th>
          </tr>
        </thead>

        <tbody>
          {ranking.map((u) => (
            <tr key={u.email}>
              <td>{u.position}</td>
              <td>{u.email}</td>
              <td>{u.riskScore}</td>
              <td>{u.trustLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      padding: 15,
      background: "#111",
      color: "#fff",
      borderRadius: 8
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}