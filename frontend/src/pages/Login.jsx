import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado!");
    } catch (error) {
      alert(error.message);
    }
  };

  const cadastrar = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("Conta criada!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 SaaS Afiliados - Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: 300 }}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: 300 }}
      />

      <button onClick={entrar} style={{ marginRight: 10 }}>
        Entrar
      </button>

      <button onClick={cadastrar}>
        Criar conta
      </button>
    </div>
  );
}