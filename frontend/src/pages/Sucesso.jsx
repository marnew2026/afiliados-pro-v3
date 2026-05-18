import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Sucesso() {
  const navigate = useNavigate();

  useEffect(() => {
    // só feedback visual
    console.log("Pagamento concluído");
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🎉 Pagamento realizado com sucesso!</h1>

      <p>Seu plano PRO foi ativado.</p>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "green",
          color: "#fff",
          borderRadius: 8,
        }}
      >
        Ir para Dashboard
      </button>
    </div>
  );
}