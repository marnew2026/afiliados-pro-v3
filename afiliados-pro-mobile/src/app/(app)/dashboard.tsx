import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: auth.currentUser?.email || "teste@teste.com",
          }),
        }
      );

      const data = await res.json();

      if (data.url) {
        Linking.openURL(data.url);
      } else {
        Alert.alert("Erro", "Não foi possível abrir pagamento");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#007ACC",
      }}
    >
      <Text
        style={{
          fontSize: 26,
          marginBottom: 30,
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Dashboard PRO
      </Text>

      <TouchableOpacity
        onPress={comprarPro}
        style={{
          backgroundColor: "#1E1E1E",
          padding: 16,
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          {loading ? "Carregando..." : "Virar PRO"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/produto")}
        style={{
          backgroundColor: "#1E1E1E",
          padding: 16,
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Cadastrar Produto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/campanhas")}
        style={{
          backgroundColor: "#1E1E1E",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Minhas Campanhas
        </Text>
      </TouchableOpacity>
    </View>
  );
}