import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [link, setLink] = useState("");
  const [imagem, setImagem] = useState("");

  const salvarCampanha = async () => {
    try {
      const res = await fetch("https://afiliados-pro-v3-2.onrender.com/campaigns/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: auth.currentUser?.email,
          nome,
          preco,
          link,
          imagem,
        }),
      });

      const data = await res.json();

      if (data.error) {
        Alert.alert("Erro", data.error);
        return;
      }

      Alert.alert("Sucesso", "Campanha criada");
      router.push("/campanhas");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#111827", padding: 20 }}>
      <Text style={{ color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Criar Campanha
      </Text>

      <TextInput value={nome} onChangeText={setNome} placeholder="Nome" style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 }} />
      <TextInput value={preco} onChangeText={setPreco} placeholder="Preço" style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 }} />
      <TextInput value={link} onChangeText={setLink} placeholder="Link" style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 }} />
      <TextInput value={imagem} onChangeText={setImagem} placeholder="Imagem" style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 20 }} />

      <TouchableOpacity onPress={salvarCampanha} style={{ backgroundColor: "#2563EB", padding: 15, borderRadius: 10 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Salvar campanha</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}