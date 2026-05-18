import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { auth } from "../../firebase";

export default function Campanhas() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [link, setLink] = useState("");
  const [campanhas, setCampanhas] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarCampanhas();
    }, [])
  );

  async function carregarCampanhas() {
    try {
      const email = auth.currentUser?.email;

      const res = await fetch(
        `https://afiliados-pro-v3-2.onrender.com/campaigns/${email}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setCampanhas(data);
      } else {
        setCampanhas([]);
      }
    } catch (err) {
      console.log(err);
      setCampanhas([]);
    }
  }

  async function salvarCampanha() {
    try {
      const email = auth.currentUser?.email;

      const res = await fetch(
        `https://afiliados-pro-v3-2.onrender.com/campaigns/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: email,
            nome,
            link,
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        return Alert.alert("Erro", data.error);
      }

      setNome("");
      setLink("");
      carregarCampanhas();

      Alert.alert("Sucesso", "Campanha criada");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha ao salvar");
    }
  }

async function salvarCampanha() {
  console.log("EMAIL LOGADO:", auth.currentUser?.email);
  try {
    const email = auth.currentUser?.email;

    const res = await fetch(
      `https://afiliados-pro-v3-2.onrender.com/campaigns/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          nome,
          link,
        }),
      }
    );

    const texto = await res.text();
    console.log("RESPOSTA:", texto);

    const data = JSON.parse(texto);

    if (data.error) {
      Alert.alert("Erro", data.error);
      return;
    }

    setNome("");
    setLink("");
    carregarCampanhas();

    Alert.alert("Sucesso", "Campanha criada");
  } catch (err) {
    console.log("ERRO:", err);
    Alert.alert("Erro", "Falha ao salvar");
  }
}

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#111827", padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: "#60A5FA", marginBottom: 20 }}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
        Campanhas
      </Text>

      <TextInput
        placeholder="Nome da campanha"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
        style={{
          backgroundColor: "#1F2937",
          color: "#fff",
          padding: 12,
          borderRadius: 8,
          marginTop: 20,
        }}
      />

      <TextInput
        placeholder="Link do produto"
        placeholderTextColor="#999"
        value={link}
        onChangeText={setLink}
        style={{
          backgroundColor: "#1F2937",
          color: "#fff",
          padding: 12,
          borderRadius: 8,
          marginTop: 10,
        }}
      />

      <TouchableOpacity
        onPress={salvarCampanha}
        style={{
          backgroundColor: "#2563EB",
          padding: 14,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Salvar campanha
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 30,
          marginBottom: 15,
        }}
      >
        Minhas campanhas
      </Text>

      {campanhas.map((item) => (
        <View
          key={item._id}
          style={{
            backgroundColor: "#1F2937",
            padding: 15,
            borderRadius: 10,
            marginBottom: 12,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            {item.nome}
          </Text>

          <Text style={{ color: "#9CA3AF", marginTop: 4 }}>
            Cliques: {item.clicks || 0}
          </Text>

          <Text style={{ color: "#10B981", marginTop: 4 }}>
            Ganhos: R$ {(item.earnings || 0).toFixed(2)}
          </Text>

          <TouchableOpacity
            onPress={() => registrarClique(item)}
            style={{
              backgroundColor: "#059669",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Testar clique
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => excluir(item._id)}
            style={{
              backgroundColor: "#DC2626",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Excluir
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}