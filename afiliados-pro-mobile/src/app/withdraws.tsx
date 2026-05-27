import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import api from "../services/api";
export default function Withdraws() {
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    loadWithdraws();
  }, []);

  async function loadWithdraws() {
    try {
      const email = "marielsantana@bol.com.br";

      const response = await api.get(`/withdraw/${email}`);

      setWithdraws(response.data);
    } catch (err) {
      console.log(err);
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
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Histórico de Saques
        </Text>

        <TouchableOpacity
  onPress={() => router.push("../saque")}
  style={{
    marginTop: 20,
    alignItems: "center",
  }}
>
  <Text
    style={{
      color: "#38bdf8",
      fontSize: 16,
      fontWeight: "bold",
    }}
  >
    Voltar para saque
  </Text>
</TouchableOpacity>

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
              {item.pixKey}
            </Text>

            <Text
              style={{
                color:
                  item.status === "paid"
                    ? "#22c55e"
                    : "#facc15",
                marginTop: 8,
              }}
            >
              {item.status}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}