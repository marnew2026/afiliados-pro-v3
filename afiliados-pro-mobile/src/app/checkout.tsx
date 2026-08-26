import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

export default function Checkout() {
  const router = useRouter();

  async function abrirCheckout() {
    console.log("🔥 BOTÃO PRO");

    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      console.log("TOKEN EXISTE:", !!token);
      console.log("USER ID:", userId);

      if (!token || !userId) {
        Alert.alert(
          "Sessão expirada",
          "Faça login novamente."
        );
        router.replace("/");
        return;
      }

      const { data } = await api.post(
        "/checkout/create-checkout"
      );

      console.log("RESPOSTA CHECKOUT:", data);

      if (data.url) {
        await Linking.openURL(data.url);
      } else {
        Alert.alert(
          "Erro",
          "Checkout não encontrado"
        );
      }

    } catch (err: any) {
      console.log("========== CHECKOUT ERROR ==========");
      console.log("STATUS:", err.response?.status);
      console.log("URL:", err.config?.url);
      console.log("DATA:", err.response?.data);
      console.log("MESSAGE:", err.message);
      console.log("====================================");

      Alert.alert(
        "Erro",
        err.response?.data?.error ||
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
        onPress={() => router.replace("/dashboard")}
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