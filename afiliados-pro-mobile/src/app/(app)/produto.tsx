import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "expo-router";

export default function Produto() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const salvarCampanha = async () => {
    if (!name || !link) {
      Alert.alert("Erro", "Preencha nome e link");
      return;
    }

    try {
      const res = await fetch(
        "https://afiliados-pro-v3-2.onrender.com/campaigns",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            link,
            ownerId: auth.currentUser?.uid,
            email: auth.currentUser?.email,
          }),
        }
      );

      const data = await res.json();
      console.log("CAMPANHA SALVA:", data);

      if (!res.ok) {
        Alert.alert("Erro", data.error || "Falha ao criar campanha");
        return;
      }

      Alert.alert("Sucesso", "Campanha criada");
      router.push("/campanhas");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha ao salvar campanha");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#007ACC", padding: 20 }}>
      <Text style={{ color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Criar Campanha
      </Text>

      <Text style={{ color: "#fff", marginBottom: 5 }}>Nome da campanha</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ex: Promoção verão"
        placeholderTextColor="#666"
        style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 15 }}
      />

      <Text style={{ color: "#fff", marginBottom: 5 }}>Link do produto</Text>
      <TextInput
        value={link}
        onChangeText={setLink}
        placeholder="https://..."
        placeholderTextColor="#666"
        style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 20 }}
      />

      <TouchableOpacity
        onPress={salvarCampanha}
        style={{ backgroundColor: "#111827", padding: 15, borderRadius: 10 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Salvar Campanha
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 15 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          ← Voltar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}