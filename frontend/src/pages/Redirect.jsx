import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Redirect() {
  const { id } = useParams();

  useEffect(() => {
    // 🔥 salva afiliado (igual Hotmart cookie)
    localStorage.setItem("ref", id);

    // 🔥 registra clique no backend
    fetch("https://SEU-BACKEND.onrender.com/click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref: id,
        timestamp: new Date().toISOString(),
      }),
    });

    // redireciona
    window.location.href = "/";
  }, [id]);

  return <h2>🔁 Redirecionando...</h2>;
}