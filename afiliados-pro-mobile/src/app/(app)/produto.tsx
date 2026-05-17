import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "expo-router";

export default function Produto() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [link, setLink] = useState("");
  const [imagem, setImagem] = useState("");

  const salvarProduto = async () => {
    if (!nome || !preco || !link) {
      Alert.alert("Preencha nome, preço e link");
      return;
    }

    try {
      const res = await fetch(
        "https://afiliados-pro-v3-2.onrender.com/products/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: auth.currentUser?.email,
            nome,
            preco,
            link,
            imagem,
          }),
        }
      );

      const data = await res.json();
      console.log("PRODUTO SALVO:", data);

      Alert.alert("Sucesso", "Produto cadastrado");
      router.push("/campanhas");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro ao salvar");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#007ACC", padding: 20 }}>
      <Text style={{ color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Cadastrar Produto
      </Text>

      <Text style={{ color: "#fff", marginBottom: 5 }}>Nome do produto</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Capa de chuva"
        placeholderTextColor="#666"
        style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 15 }}
      />

      <Text style={{ color: "#fff", marginBottom: 5 }}>Preço</Text>
      <TextInput
        value={preco}
        onChangeText={setPreco}
        placeholder="Ex: 65"
        placeholderTextColor="#666"
        style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 15 }}
      />

      <Text style={{ color: "#fff", marginBottom: 5 }}>Link do produto</Text>
      <TextInput
        value={link}
        onChangeText={setLink}
        placeholder="https://..."
        placeholderTextColor="#666"
        style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 15 }}
      />

      <Text style={{ color: "#fff", marginBottom: 5 }}>Link da imagem</Text>
      <TextInput
        value={imagem}
        onChangeText={setImagem}
        placeholder="https://imagem.jpg"
        placeholderTextColor="#666"
        style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 20 }}
      />

      <TouchableOpacity
        onPress={salvarProduto}
        style={{ backgroundColor: "#111827", padding: 15, borderRadius: 10 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Salvar Produto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 15 }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          ← Voltar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}