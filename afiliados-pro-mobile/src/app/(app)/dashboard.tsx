import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#111827",
        padding: 20,
      }}
    >
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
        onPress={() => router.push("/produto")}
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
<TouchableOpacity
  onPress={() => router.push("/checkout")}
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

      <TouchableOpacity
        onPress={() => router.push("/campanhas")}
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





