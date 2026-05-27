import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { router } from "expo-router";

export default function Admin() {
  const [withdraws, setWithdraws] = useState<any[]>([]);

  useEffect(() => {
    loadWithdraws();
  }, []);

  async function loadWithdraws() {
    try {
      const response = await fetch("https://afiliados-pro-v3-2.onrender.com/admin/withdraws"
      );

      const data = await response.json();

      console.log("ADMIN:", data);

      setWithdraws(data);
    } catch (error) {
      console.log(error);

      Alert.alert("Erro ao carregar saques");
    }
  }

  async function aprovar(id: string) {
    try {
      await fetch(
  `https://afiliados-pro-v3-2.onrender.com/withdraws/${id}/approve`,
  {
    method: "PUT",
  }
);

      Alert.alert("Saque aprovado");

      loadWithdraws();
    } catch (error) {
      console.log(error);

      Alert.alert("Erro ao aprovar");
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
      }}
    >
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          onPress={() => router.replace("/dashboard" as any)}
        >
          <Text
            style={{
              color: "#38bdf8",
              marginBottom: 20,
            }}
          >
            ← Voltar
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Painel Admin
        </Text>

        {withdraws.map((item: any) => (
          <View
            key={item._id}
            style={{
              backgroundColor: "#1e293b",
              padding: 16,
              borderRadius: 14,
              marginBottom: 14,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>
              R$ {item.amount}
            </Text>

            <Text style={{ color: "#94a3b8" }}>
              {item.userEmail}
            </Text>

            <Text style={{ color: "#94a3b8" }}>
              {item.pixKey}
            </Text>

            <Text
              style={{
                color:
                  item.status === "paid"
                    ? "#22c55e"
                    : "#facc15",
                marginTop: 8,
                marginBottom: 12,
              }}
            >
              {item.status}
            </Text>
  
            {item.status !== "paid" && (
              <TouchableOpacity
                onPress={() => aprovar(item._id)}
                style={{
                  backgroundColor: "#22c55e",
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Aprovar Saque
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}