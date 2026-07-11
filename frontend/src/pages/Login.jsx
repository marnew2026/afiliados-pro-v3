import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../src/services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.email);

        navigate("/dashboard");
      } else {
        setErro(data?.message || "Erro no login");
      }
    } catch (err) {
      setErro("Erro ao conectar com servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {erro && (
        <p style={{ color: "red", marginTop: 10 }}>
          {erro}
        </p>
      )}
    </div>
  );
}