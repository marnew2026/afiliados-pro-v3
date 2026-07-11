import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { router } from "expo-router";
import api from "../services/api";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Saque() {
    
  const [amount, setAmount] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 PEGAR DO LOGIN
  

  async function handleWithdraw() {
    try {
      setLoading(true);

      const value = parseFloat(
        amount.replace(/\s/g, "").replace(",", ".")
      );

      if (isNaN(value) || value <= 0) {
        Alert.alert("Erro", "Digite um valor válido");
        return;
      }

    const userId = await AsyncStorage.getItem("userId");

if (!userId) {
  Alert.alert("Erro", "Sessão inválida. Faça login novamente.");
  return;
}
console.log("ENVIANDO SAQUE", {
  userId,
  pixKey,
  amount: value,
  withdrawId: Crypto.randomUUID(),
});
const { data } = await api.post("/withdraw/create", {
  userId,
  pixKey,
  amount: value,
  withdrawId: Crypto.randomUUID()
});

Alert.alert(
  "Sucesso",
  data?.message || "Saque solicitado com sucesso"
);

      router.replace("/dashboard");
    } catch (err: any) {
      console.log("withdraw error:", err?.response?.data || err);

      Alert.alert(
        "Erro",
        err?.response?.data?.error || "Falha ao solicitar saque"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Text style={{ color: "#38bdf8", fontSize: 16 }}>
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        💸 Solicitar Saque PIX
      </Text>

      <TextInput
        placeholder="Valor"
        placeholderTextColor="#64748b"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          backgroundColor: "#1e293b",
          padding: 14,
          borderRadius: 10,
          color: "#fff",
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Chave PIX"
        placeholderTextColor="#64748b"
        value={pixKey}
        onChangeText={setPixKey}
        style={{
          backgroundColor: "#1e293b",
          padding: 14,
          borderRadius: 10,
          color: "#fff",
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleWithdraw}
        disabled={loading}
        style={{
          backgroundColor: "#16a34a",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
          {loading ? "Processando..." : "Solicitar Saque"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}