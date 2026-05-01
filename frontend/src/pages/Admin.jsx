import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const usersList = usersSnap.docs.map((d) => d.data());

        const salesSnap = await getDocs(collection(db, "referrals"));
        const salesList = salesSnap.docs.map((d) => d.data());

        setUsers(usersList);
        setSales(salesList);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    load();
  }, []);

  const totalPro = users.filter((u) => u.isPro).length;
  const totalSales = sales.length;
  const totalRevenue = sales.reduce(
    (acc, s) => acc + (s.commission || 0),
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <h3>Resumo</h3>
        <p>Usuários: {users.length}</p>
        <p>PRO: {totalPro}</p>
        <p>Vendas: {totalSales}</p>
        <p>Receita afiliados: R$ {totalRevenue}</p>
      </div>

      <h3>Usuários</h3>
      {users.map((u, i) => (
        <div key={i} style={{ marginBottom: 5 }}>
          {u.email} - {u.isPro ? "PRO" : "FREE"}
        </div>
      ))}

      <h3>Vendas recentes</h3>
      {sales.map((s, i) => (
        <div key={i} style={{ marginBottom: 5 }}>
          {s.buyerEmail} → R$ {s.commission}
        </div>
      ))}
    </div>
  );
}