import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCampaigns, createCampaign } from "../services/api";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  async function loadCampaigns() {
    const data = await getCampaigns(token);
    setCampaigns(data);
  }

  async function handleCreate(e) {
    e.preventDefault();
    await createCampaign(token, { name, link });
    setName("");
    setLink("");
    loadCampaigns();
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  const totalClicks = campaigns.reduce((acc, c) => acc + (c.clicks || 0), 0);
  const totalSales = campaigns.reduce((acc, c) => acc + (c.sales || 0), 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + (c.revenue || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard SaaS</h1>
            <p className="text-gray-600">Bem-vindo, {email}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold">Cliques</h2>
            <p className="text-2xl font-bold">{totalClicks}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold">Vendas</h2>
            <p className="text-2xl font-bold">{totalSales}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold">Receita</h2>
            <p className="text-2xl font-bold">R$ {totalRevenue}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Criar Campanha</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <input
              className="w-full border p-3 rounded-xl"
              placeholder="Nome da campanha"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border p-3 rounded-xl"
              placeholder="Link afiliado"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
              Criar
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Minhas Campanhas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((c) => (
              <div key={c._id} className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-xl font-bold">{c.name}</h3>
                <p className="text-sm text-gray-500 break-all">{c.link}</p>
                <div className="mt-4 space-y-1">
                  <p>Cliques: {c.clicks}</p>
                  <p>Vendas: {c.sales}</p>
                  <p>Receita: R$ {c.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
