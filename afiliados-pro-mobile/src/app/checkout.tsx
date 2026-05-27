import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useRouter } from "expo-router";

import * as Linking from "expo-linking";

export default function Checkout() {
  const router = useRouter();

  async function abrirCheckout() {
    try {
      const response = await fetch(
        "https://afiliados-pro-v3-2.onrender.com/stripe/create-checkout-session"
      );

      const data = await response.json();

      console.log("STRIPE:", data);

      if (data.url) {
        await Linking.openURL(data.url);
      } else {
        Alert.alert("Erro", "Checkout não encontrado");
      }

    } catch (err) {
      console.log(err);

      Alert.alert(
        "Erro",
        "Falha ao abrir pagamento"
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#111827",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: "bold",
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
          padding: 18,
          borderRadius: 14,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Assinar agora
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.replace("/dashboard")
        }
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#60A5FA",
            textAlign: "center",
          }}
        >
          ← Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}