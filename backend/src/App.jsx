import { useEffect, useState } from "react";

export default function App() {
  const [nome, setNome] = useState("");
  const [link, setLink] = useState("");
  const [campanhas, setCampanhas] = useState([]);

  const criarCampanha = async () => {
    await fetch("https://afiliados-pro-v3-2.onrender.com ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, link }),
    });

    carregarCampanhas();
  };

  const carregarCampanhas = async () => {
    const res = await fetch("http://https://afiliados-pro-v3-2.onrender.com ");
    const data = await res.json();
    setCampanhas(data);
  };

  useEffect(() => {
    carregarCampanhas();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 SaaS Afiliados</h1>

      <input
        placeholder="Nome da campanha"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <br /><br />

      <button onClick={criarCampanha}>
        Criar campanha
      </button>

      <h2>Minhas campanhas</h2>

      {campanhas.map((c) => (
        <div key={c.id}>
          <p>{c.nome}</p>
          <a href={c.link} target="_blank">{c.link}</a>
        </div>
      ))}
    </div>
  );
}