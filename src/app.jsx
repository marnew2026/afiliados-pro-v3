import React, { useEffect, useState } from "react";
import { addCampaign, getCampaigns, deleteCampaign } from "./campaigns";

export default function App() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    const data = await getCampaigns();
    setCampaigns(data.reverse());
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const generateDescription = () => {
    if (!title) return;
    setDesc(`Oferta especial: ${title}. Produto de alta qualidade, ideal para quem busca praticidade, tecnologia e ótimo custo-benefício.`);
  };

  const handleAdd = async () => {
    if (!title || !url) return;

    await addCampaign({
      title,
      url,
      desc,
      image,
      category: "Casa",
      platform: "Mercado Livre",
      status: "ativo",
      createdAt: Date.now()
    });

    setTitle("");
    setUrl("");
    setDesc("");
    setImage("");
    loadCampaigns();
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "42px" }}>🚀 Afiliados Pro</h1>
        <p style={{ marginBottom: "30px" }}>
          Plataforma inteligente para campanhas e vendas online
        </p>

        <div style={cardStyle}>
          <h2>✨ Nova Campanha</h2>

          <input
            placeholder="Título do produto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Link de afiliado"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="URL da imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Descrição estratégica"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{ ...inputStyle, minHeight: "100px" }}
          />

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={generateDescription} style={secondaryBtn}>
              ✨ Gerar Copy
            </button>

            <button onClick={handleAdd} style={buttonStyle}>
              Criar Campanha
            </button>
          </div>
        </div>

        <h2 style={{ margin: "25px 0" }}>
          📊 Campanhas Ativas ({campaigns.length})
        </h2>

        <div style={gridStyle}>
          {campaigns.map((item) => (
            <div key={item.id} style={cardStyle}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  style={imgStyle}
                />
              )}

              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <div>
                <span style={tagStyle}>{item.category}</span>
                <span style={tagStyle}>{item.platform}</span>
                <span style={tagStyle}>{item.status}</span>
              </div>

              <div style={{ marginTop: "15px" }}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  🔗 Abrir
                </a>
              </div>

              <button
                onClick={() => deleteCampaign(item.id).then(loadCampaigns)}
                style={{ ...secondaryBtn, marginTop: "12px" }}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f172a,#1e293b)",
  color: "#fff",
  padding: "30px",
  fontFamily: "Arial"
};

const cardStyle = {
  background: "#fff",
  color: "#111",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd"
};

const buttonStyle = {
  background: "#111827",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer"
};

const secondaryBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
  gap: "20px"
};

const imgStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "14px",
  marginBottom: "15px"
};

const tagStyle = {
  display: "inline-block",
  background: "#e5e7eb",
  padding: "6px 10px",
  borderRadius: "999px",
  marginRight: "8px",
  fontSize: "12px"
};