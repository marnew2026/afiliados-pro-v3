import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const API = "https://afiliados-pro-v3-2.onrender.com";

export default function AdminDashboard() {
  const [ranking, setRanking] = useState([]);
  const [chart, setChart] = useState([]);

  useEffect(() => {
  const interval = setInterval(() => {
    load();
  }, 5000); // atualiza a cada 5s

  return () => clearInterval(interval);
}, []);
  async function load() {
    const rankRes = await fetch(`${API}/ranking`);
    setRanking(await rankRes.json());

    const chartRes = await fetch(`${API}/dashboard/admin`);
    setChart(await chartRes.json());
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🔥 SaaS Admin (Hotmart Level)</h1>

      {/* 📈 GRÁFICO */}
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chart}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey="revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🏆 RANKING */}
      <h2>🏆 Top Afiliados</h2>

      {ranking.map((r, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          #{i + 1} | Afiliado: {r.affiliateId} | 💰 R$ {r.revenue}
        </div>
      ))}
    </div>
  );
}