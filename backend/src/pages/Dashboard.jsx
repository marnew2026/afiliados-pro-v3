import React, { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [nome, setNome] = useState("");
  const [link, setLink] = useState("");

  // carregar campanhas
  const fetchCampaigns = async () => {
    try {
      const res = await fetch("http://localhost:3001/campaigns");
      const data = await res.json();
      setCampaigns(data);
    } catch (error) {
      console.error("Erro ao carregar campanhas:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // criar campanha
  const handleCreate = async () => {
    if (!nome || !link) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
          link: link.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Erro ao criar campanha");
        return;
      }

      setCampaigns((prev) => [...prev, data]);

      setNome("");
      setLink("");
    } catch (error) {
      console.error("Erro:", error);
      alert("Falha ao conectar com backend");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🚀 SaaS Afiliados Pro V3</h1>

      <h2>Criar campanha</h2>

      <input
        type="text"
        placeholder="Nome da campanha"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        type="text"
        placeholder="Link de afiliado"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={handleCreate}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Criar campanha
      </button>

      <h2>Minhas campanhas</h2>

      {campaigns.length === 0 ? (
        <p>Nenhuma campanha ainda</p>
      ) : (
        campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))
      )}
    </div>
  );
}