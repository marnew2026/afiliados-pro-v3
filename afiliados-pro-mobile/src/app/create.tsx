import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
export default function CreateCampaign() {
  const [nome, setNome] = useState("");
  const [link, setLink] = useState("");

 async function handleCreate() {
  try {
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      Alert.alert("Erro", "Sessão inválida");
      return;
    }

    console.log("🚀 ENVIANDO CAMPANHA:", {
  userId,
  nome,
  link,
});

const { data } = await api.post("/campaigns/create", {
  userId,
  nome,
  link,
});

    Alert.alert("Sucesso", "Campanha criada com sucesso");

    router.replace("/dashboard");

  } catch (err: any) {

    console.log(
      "CREATE ERROR:",
      err?.response?.data || err
    );

    Alert.alert(
      "Erro",
      err?.response?.data?.error || "Falha ao criar campanha"
    );
  }
}

   
  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 20 }}>
      <Text style={{ color: "#fff", fontSize: 28, marginBottom: 20 }}>
        🚀 Nova Campanha
      </Text>

      <TextInput
        placeholder="Nome da campanha"
        placeholderTextColor="#64748b"
        value={nome}
        onChangeText={setNome}
        style={{
          backgroundColor: "#1e293b",
          padding: 14,
          borderRadius: 10,
          color: "#fff",
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Link afiliado"
        placeholderTextColor="#64748b"
        value={link}
        onChangeText={setLink}
        style={{
          backgroundColor: "#1e293b",
          padding: 14,
          borderRadius: 10,
          color: "#fff",
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleCreate}
        style={{
          backgroundColor: "#2563eb",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
          Criar campanha
        </Text>
      </TouchableOpacity>
    </View>
  );
}