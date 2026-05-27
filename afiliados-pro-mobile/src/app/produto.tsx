import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { auth } from "../firebase";

export default function Produto() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const salvarCampanha = async () => {
  try {
    const email = auth?.currentUser?.email;

    console.log("EMAIL LOGADO:", email);

    if (!email) {
      Alert.alert(
        "Erro",
        "Usuário não autenticado. Faça login novamente."
      );
      return;
    }

    if (!name.trim() || !link.trim()) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);

    const response = await fetch(
      "https://afiliados-pro-v3-2.onrender.com/campaigns/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          nome: name.trim(),
          link: link.trim(),
        }),
      }
    );

    const data = await response.json();

    console.log("CREATE RESPONSE:", data);

    if (!response.ok) {
      Alert.alert(
        "Erro",
        data?.message || data?.error || "Erro ao criar campanha"
      );
      return;
    }

    Alert.alert("Sucesso", "Campanha criada");

    setName("");
    setLink("");

    router.push("/campanhas" as any);

  } catch (error) {
    console.log("ERRO:", error);

    Alert.alert(
      "Erro",
      "Falha ao conectar com servidor"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0F172A",
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#38BDF8",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 25,
        }}
      >
        Criar Campanha
      </Text>

      <Text
        style={{
          color: "#CBD5E1",
          marginBottom: 8,
          fontSize: 15,
        }}
      >
        Nome da campanha
      </Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ex: Promoção Verão"
        placeholderTextColor="#64748B"
        style={{
          backgroundColor: "#1E293B",
          color: "#FFFFFF",
          padding: 15,
          borderRadius: 12,
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      <Text
        style={{
          color: "#CBD5E1",
          marginBottom: 8,
          fontSize: 15,
        }}
      >
        Link do produto
      </Text>

      <TextInput
        value={link}
        onChangeText={setLink}
        placeholder="https://..."
        placeholderTextColor="#64748B"
        autoCapitalize="none"
        style={{
          backgroundColor: "#1E293B",
          color: "#FFFFFF",
          padding: 15,
          borderRadius: 12,
          marginBottom: 30,
          fontSize: 16,
        }}
      />

      <TouchableOpacity
        onPress={salvarCampanha}
        disabled={loading}
        style={{
          backgroundColor: "#2563EB",
          padding: 18,
          borderRadius: 14,
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Salvar Campanha
          </Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          marginTop: 40,
          padding: 20,
          borderRadius: 14,
          backgroundColor: "#111827",
        }}
      >
        <Text
          style={{
            color: "#38BDF8",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Dicas
        </Text>

        <Text style={{ color: "#CBD5E1", marginBottom: 8 }}>
          • Use links válidos do Mercado Livre
        </Text>

        <Text style={{ color: "#CBD5E1", marginBottom: 8 }}>
          • Coloque nomes curtos e chamativos
        </Text>

        <Text style={{ color: "#CBD5E1" }}>
          • Compartilhe seu link afiliado para gerar vendas
        </Text>
      </View>
    </ScrollView>
  );
}