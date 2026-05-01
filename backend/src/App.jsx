import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function App() {
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const [campanhas, setCampanhas] = useState([]);
  const [qr, setQr] = useState("");

  // 🔄 buscar campanhas
  const carregarCampanhas = async () => {
    try {
      const res = await fetch("http://localhost:3001/campanhas");
      const data = await res.json();
      setCampanhas(data);
    } catch (err) {
      console.log("Erro ao carregar campanhas", err);
    }
  };

  useEffect(() => {
    carregarCampanhas();
  }, []);

  // ➕ criar campanha
  const criarCampanha = async () => {
    if (!titulo || !link) return alert("Preencha todos os campos");

    try {
      const res = await fetch("http://localhost:3001/campanha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          linkAfiliado: link,
        }),
      });

      const data = await res.json();

      setQr(data.linkAfiliado);
      setTitulo("");
      setLink("");

      carregarCampanhas();
    } catch (err) {
      console.log("Erro ao criar campanha", err);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🚀 SaaS Afiliados V3</h1>

      {/* CRIAR CAMPANHA */}
      <div style={{ marginBottom: 20 }}>
        <h2>Criar campanha</h2>

        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ display: "block", marginBottom: 10, padding: 8 }}
        />

        <input
          placeholder="Link de afiliado"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ display: "block", marginBottom: 10, padding: 8 }}
        />

        <button onClick={criarCampanha}>Criar</button>
      </div>

      {/* QR CODE */}
      {qr && (
        <div style={{ marginBottom: 30 }}>
          <h3>📲 QR Code da campanha</h3>
          <QRCode value={qr} />
          <p>{qr}</p>
        </div>
      )}

      {/* LISTA */}
      <div>
        <h2>📋 Minhas campanhas</h2>

        {campanhas.length === 0 && <p>Nenhuma campanha ainda</p>}

        {campanhas.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <strong>{c.titulo}</strong>
            <p>{c.linkAfiliado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}