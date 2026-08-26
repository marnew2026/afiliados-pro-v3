import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import api from "../services/api";

export default function EditCampaign() {
  const { id, nome, link } = useLocalSearchParams();

  const [novoNome, setNovoNome] = useState(String(nome));
  const [novoLink, setNovoLink] = useState(String(link));

  async function salvar() {
    try {
      const response = await api.put(`/campaigns/${id}`, {
  nome: novoNome,
  link: novoLink,
});

console.log("========== RESPOSTA UPDATE ==========");
console.log(JSON.stringify(response.data, null, 2));
console.log("=====================================");

      Alert.alert("Sucesso", "Campanha atualizada.");

      router.back();
    } catch (err: any) {
      Alert.alert(
        "Erro",
        err?.response?.data?.error || "Erro ao atualizar campanha."
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        ✏️ Editar Campanha
      </Text>

      <Text style={{ color: "#94a3b8" }}>Nome</Text>

      <TextInput
        value={novoNome}
        onChangeText={setNovoNome}
        style={{
          backgroundColor: "#1e293b",
          color: "#fff",
          padding: 14,
          borderRadius: 12,
          marginBottom: 20,
        }}
      />

      <Text style={{ color: "#94a3b8" }}>Link</Text>

      <TextInput
        value={novoLink}
        onChangeText={setNovoLink}
        style={{
          backgroundColor: "#1e293b",
          color: "#fff",
          padding: 14,
          borderRadius: 12,
          marginBottom: 30,
        }}
      />

      <TouchableOpacity
        onPress={salvar}
        style={{
          backgroundColor: "#22c55e",
          padding: 18,
          borderRadius: 16,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          💾 Salvar Alterações
        </Text>
      </TouchableOpacity>
    </View>
  );
}