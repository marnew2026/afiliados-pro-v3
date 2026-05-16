import { View, Text, TouchableOpacity, Linking } from "react-native";
import { useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const comprarPro = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://afiliados-pro-v3-2.onrender.com/stripe/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: auth.currentUser?.email || "teste@teste.com",
          }),
        }
      );

      const data = await res.json();

      console.log("CHECKOUT:", data);

      if (data.url) {
        Linking.openURL(data.url);
      }
    } catch (err) {
      console.log("ERRO:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Dashboard PRO
      </Text>

      <TouchableOpacity
        onPress={comprarPro}
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          {loading ? "Carregando..." : "Virar PRO"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/produto")}
        style={{
          backgroundColor: "#2563eb",
          padding: 15,
          borderRadius: 10,
          marginTop: 15,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Cadastrar Produto
        </Text>
      </TouchableOpacity>
    </View>
  );
}