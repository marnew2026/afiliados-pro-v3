import { useNavigate } from "react-router-dom";

export default function Cancelado() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>❌ Pagamento cancelado</h1>

      <p>Você não foi cobrado.</p>

      <button
        onClick={() => navigate("/checkout")}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "#000",
          color: "#fff",
          borderRadius: 8,
        }}
      >
        Tentar novamente
      </button>
    </div>
  );
}