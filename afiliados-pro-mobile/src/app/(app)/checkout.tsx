import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";

export default function Checkout() {
  const router = useRouter();

  const abrirCheckout = async () => {
    try {
      const url =
        "https://afiliados-pro-v3-2.onrender.com/stripe/create-checkout-session";

      await Linking.openURL(url);
    } catch {
      Alert.alert("Erro", "Falha ao abrir pagamento");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#111827",
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Plano PRO
      </Text>

      <TouchableOpacity
        onPress={abrirCheckout}
        style={{
          backgroundColor: "#F59E0B",
          padding: 16,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Assinar agora
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/dashboard")}>
        <Text style={{ color: "#60A5FA", textAlign: "center" }}>
          ← Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}