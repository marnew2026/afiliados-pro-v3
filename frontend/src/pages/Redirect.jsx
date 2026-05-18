import { useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://afiliados-pro-v3-2.onrender.com";

export default function Redirect() {
  const { id } = useParams();

  useEffect(() => {
    async function trackAndRedirect() {
      try {
        // 🔥 salva afiliado local
        localStorage.setItem("ref", id);

        // 🔥 registra clique no backend
        await fetch(`${API_URL}/click`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ref: id,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.log("Erro tracking clique:", err);
      }

      // 🔁 redireciona depois
      window.location.href = "/";
    }

    trackAndRedirect();
  }, [id]);

  return <h2>🔁 Redirecionando...</h2>;
}