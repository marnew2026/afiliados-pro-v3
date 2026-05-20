import { Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { auth } from "../../firebase";

export default function Dashboard() {
  const router = useRouter();
  const [isPro, setIsPro] = useState(false);

  async function verificarPlano() {
  try {
    const email = auth.currentUser?.email;

    if (!email) return;

    const url = "https://afiliados-pro-v3-2.onrender.com/user/" + email;

    const res = await fetch(url);
    const data = await res.json();

    setIsPro(data?.isPro || false);
  } catch (error) {
    console.log(error);
  }
}
  useFocusEffect(
    useCallback(() => {
      verificarPlano();
    }, [])
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#111827", padding: 20 }}>
      <Text
        style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        Painel Afiliados PRO
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/produto" as any)}
        style={{
          backgroundColor: "#2563EB",
          padding: 16,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Cadastrar Produto
        </Text>
      </TouchableOpacity>

      {!isPro && (
        <TouchableOpacity
         onPress={() => router.push("/checkout" as any)}
          style={{
            backgroundColor: "#F59E0B",
            padding: 16,
            borderRadius: 10,
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
            Virar PRO
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => router.push("/campanhas" as any)}
        style={{
          backgroundColor: "#059669",
          padding: 16,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Ver Minhas Campanhas
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}