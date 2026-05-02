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

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard SaaS</h1>
      <p>Bem-vindo, {email}</p>

      <h2>Criar campanha</h2>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Nome da campanha"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Link afiliado"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <br /><br />

        <button type="submit">Criar</button>
      </form>

      <h2>Minhas campanhas</h2>

      {campaigns.map((c) => (
        <div key={c._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{c.name}</h3>
          <p>{c.link}</p>
          <p>Cliques: {c.clicks}</p>
          <p>Vendas: {c.sales}</p>
          <p>Receita: R$ {c.revenue}</p>
        </div>
      ))}

      <button onClick={logout}>Sair</button>
    </div>
  );
}