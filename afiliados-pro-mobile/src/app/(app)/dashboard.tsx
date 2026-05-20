import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { auth } from "../../firebase";

export default function Dashboard() {
  const router = useRouter();

  const [isPro, setIsPro] = useState(false);
  const [campanhas, setCampanhas] = useState<any[]>([]);

  const totalCliques = campanhas.reduce(
    (acc, item) => acc + (item.clicks || 0),
    0
  );

  const totalVendas = campanhas.reduce(
    (acc, item) => acc + (item.sales || 0),
    0
  );

  const totalGanhos = campanhas.reduce(
    (acc, item) => acc + (item.earnings || 0),
    0
  );

  async function verificarPlano() {
    try {
      const email = auth.currentUser?.email;
      if (!email) return;

      const url = `https://afiliados-pro-v3-2.onrender.com/user/${email}`;

      const res = await fetch(url);
      const texto = await res.text();

      console.log("USER RAW:", texto);

      const data = JSON.parse(texto);

      setIsPro(data?.isPro || false);
    } catch (error) {
      console.log("ERRO USER:", error);
    }
  }

  async function carregarCampanhas() {
    try {
      const email = auth.currentUser?.email;
      if (!email) return;

      const url = `https://afiliados-pro-v3-2.onrender.com/campaigns/${email}`;

      const res = await fetch(url);
      const texto = await res.text();

      console.log("CAMPAIGNS RAW:", texto);

      if (texto.startsWith("<")) {
  console.log("ERRO HTML:", texto);
  return;
}

const data = JSON.parse(texto);
setCampanhas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("ERRO CAMPANHAS:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      verificarPlano();
      carregarCampanhas();
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

      <View
        style={{
          backgroundColor: "#1F2937",
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Resumo geral
        </Text>

        <Text style={{ color: "#60A5FA", marginTop: 8 }}>
          Cliques: {totalCliques}
        </Text>

        <Text style={{ color: "#10B981", marginTop: 8 }}>
          Vendas: {totalVendas}
        </Text>

        <Text style={{ color: "#FACC15", marginTop: 8 }}>
          Ganhos: R$ {totalGanhos.toFixed(2)}
        </Text>

        <Text style={{ color: "#A78BFA", marginTop: 8 }}>
          Conversão:{" "}
          {totalCliques
            ? ((totalVendas / totalCliques) * 100).toFixed(2)
            : 0}
          %
        </Text>
      </View>

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

      <TouchableOpacity
        onPress={() => router.push("/admin" as any)}
        style={{
          backgroundColor: "#DC2626",
          padding: 16,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Painel Admin
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}