import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "expo-router";
import express from "express";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { nome, preco, link, imagem, userEmail } = req.body;

    console.log("📦 PRODUTO RECEBIDO:", req.body);

    return res.json({
      ok: true,
      produto: { nome, preco, link, imagem, userEmail },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "erro salvar" });
  }
});
export default router;
export default function Produto() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [link, setLink] = useState("");
  const [imagem, setImagem] = useState("");

  const salvarProduto = async () => {
    try {
      Alert.alert("Teste", "clicou");

      const res = await fetch(
        "https://afiliados-pro-v3-2.onrender.com/products/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: auth.currentUser?.email || "teste@teste.com",
            nome,
            preco,
            link,
            imagem,
          }),
        }
      );

      const txt = await res.text();
      Alert.alert("Resposta", txt);
    } catch (e) {
      Alert.alert("Erro", "erro fetch");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 15 }}>
        <Text style={{ color: "#2563eb", fontSize: 16 }}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#000" }}>
        Cadastrar Produto
      </Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#666"
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 12, color: "#000" }}
      />

      <TextInput
        placeholder="Preço"
        placeholderTextColor="#666"
        value={preco}
        onChangeText={setPreco}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 12, color: "#000" }}
      />

      <TextInput
        placeholder="Link"
        placeholderTextColor="#666"
        value={link}
        onChangeText={setLink}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 12, color: "#000" }}
      />

      <TextInput
        placeholder="Imagem"
        placeholderTextColor="#666"
        value={imagem}
        onChangeText={setImagem}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 20, color: "#000" }}
      />

      <TouchableOpacity
        onPress={salvarProduto}
        style={{ backgroundColor: "#000", padding: 16, borderRadius: 10 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
          Salvar Produto
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}




