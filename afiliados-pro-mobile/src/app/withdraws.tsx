import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../services/api";

type Withdraw = {
  _id: string;
  amount: number;
  pixKey: string;
  status: "pending" | "processing" | "paid" | "failed";
  createdAt: string;
};

export default function Withdraws() {
  const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 PEGAR DO LOGIN (exemplo correto depois você substitui)
  const userId = "PEGAR_DO_LOGIN";

  async function loadWithdraws() {
    try {
      setLoading(true);

      const { data } = await api.get(`/withdraw/${userId}`);

      setWithdraws(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) loadWithdraws();
  }, [userId]);

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 20 }}>
      <Text style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>
        📜 Histórico de Saques
      </Text>

      <FlatList
        data={withdraws}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "#1e293b", padding: 16, borderRadius: 12, marginBottom: 12 }}>
            <Text style={{ color: "#fff" }}>💰 R$ {item.amount}</Text>
            <Text style={{ color: "#94a3b8" }}>PIX: {item.pixKey}</Text>

            <Text
              style={{
                color:
                  item.status === "paid"
                    ? "#22c55e"
                    : item.status === "processing"
                    ? "#3b82f6"
                    : item.status === "pending"
                    ? "#facc15"
                    : "#ef4444",
                marginTop: 6,
                fontWeight: "bold",
              }}
            >
              {item.status === "pending"
                ? "⏳ Pendente"
                : item.status === "processing"
                ? "🔄 Processando"
                : item.status === "paid"
                ? "✅ Pago"
                : "❌ Falhou"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}