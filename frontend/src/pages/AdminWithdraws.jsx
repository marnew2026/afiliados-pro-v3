import { useEffect, useState } from "react";

export default function AdminWithdraws() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(
      "https://afiliados-pro-v3-2.onrender.com/admin/withdraws/stats"
    )
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <h2>Carregando...</h2>;

  return (
    <div>

      <h1>💰 Painel Financeiro</h1>

      <h2>✅ Pagos: {stats.paid}</h2>

      <h2>🟡 Enviados: {stats.sent}</h2>

      <h2>🔵 Processando: {stats.processing}</h2>

      <h2>🔴 Falharam: {stats.failed}</h2>

      <h2>
        💵 Total Pago:
        R$ {stats.totalPaid}
      </h2>

    </div>
  );
}