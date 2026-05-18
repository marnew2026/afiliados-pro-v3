import { Link, useNavigate } from "react-router-dom";

export default function Home({ user, isPro }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Afiliados Pro</h1>
        <p>Você não está logado.</p>

        <button onClick={() => navigate("/login")}>
          Fazer login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Afiliados Pro</h1>

      <p>Bem-vindo, {user.email}</p>

      <p>
        Status:{" "}
        <b style={{ color: isPro ? "green" : "red" }}>
          {isPro ? "PRO" : "FREE"}
        </b>
      </p>

      <div style={{ marginTop: 20 }}>
        <Link to="/dashboard">
          <button>Ir para Dashboard</button>
        </Link>
      </div>

      {!isPro && (
        <div style={{ marginTop: 10 }}>
          <Link to="/checkout">
            <button>Comprar Plano PRO</button>
          </Link>
        </div>
      )}
    </div>
  );
}