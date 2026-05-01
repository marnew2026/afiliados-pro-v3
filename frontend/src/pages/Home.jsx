import { Link } from "react-router-dom";

export default function Home({ user, isPro }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Afiliados Pro</h1>

      <p>Bem-vindo, {user?.email}</p>
      <p>Status: {isPro ? "PRO" : "FREE"}</p>

      <div style={{ marginTop: 20 }}>
        <Link to="/dashboard">
          <button>Ir para Dashboard</button>
        </Link>
      </div>

      <div style={{ marginTop: 10 }}>
        <Link to="/checkout">
          <button>Comprar Plano PRO</button>
        </Link>
      </div>
    </div>
  );
}