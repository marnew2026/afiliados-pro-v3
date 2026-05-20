import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { auth } from "../../firebase";

export default function Campanhas() {
  const router = useRouter();
  const [campanhas, setCampanhas] = useState<any[]>([]);

  const carregar = async () => {
    try {
      const email = auth.currentUser?.email;
      const res = await fetch(`https://afiliados-pro-v3-2.onrender.com/campaigns/${email}`);
      const data = await res.json();
      setCampanhas(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const registrarClique = async (id: string) => {
    try {
      await fetch(`https://afiliados-pro-v3-2.onrender.com/campaigns/${id}/click`, {
        method: "POST",
      });
      carregar();
    } catch (e) {
      console.log(e);
    }
  };

  const registrarVenda = async (id: string) => {
  try {
    const res = await fetch(
      `https://afiliados-pro-v3-2.onrender.com/campaigns/${id}/sale`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valor: 100 }),
      }
    );

    const data = await res.json();

    console.log("SALES:", data.sales);
    console.log("OBJ:", data);

    await carregar(); // força atualizar tela
  } catch (e) {
    console.log(e);
  }
};
    

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#111827" }}>
      <TouchableOpacity onPress={() => router.replace("/dashboard" as any)}>
        <Text style={{ color: "#60A5FA", marginBottom: 20 }}>
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>
        Minhas Campanhas
      </Text>

      {campanhas.map((item) => (
        <View
          key={item._id}
          style={{
            backgroundColor: "#374151",
            padding: 15,
            borderRadius: 10,
            marginBottom: 12,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {item.nome}
          </Text>

          <Text style={{ color: "#ddd", marginTop: 5 }}>
            Cliques: {item.clicks || 0}
          </Text>

          <Text style={{ color: "#10B981", marginTop: 5 }}>
            Ganhos: R$ {(item.earnings || 0).toFixed(2)}
          </Text>

          <Text style={{ color: "#fff", marginTop: 5 }}>
            Vendas: {item.sales || 0}
          </Text>
          <Text style={{ color: "#FACC15", marginTop: 5 }}>
            Conversão: {item.clicks ? ((item.sales || 0) / item.clicks * 100).toFixed(2) : 0}%
          </Text>
          
          <TouchableOpacity
            onPress={() => registrarClique(item._id)}
            style={{
              backgroundColor: "#059669",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Registrar Clique
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => registrarVenda(item._id)}
            style={{
              backgroundColor: "#2563EB",
              padding: 10,
              borderRadius: 8,
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Registrar Venda
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}