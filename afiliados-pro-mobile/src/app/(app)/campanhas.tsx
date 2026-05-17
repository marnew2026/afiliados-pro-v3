import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { auth } from "../../firebase";

export default function Campanhas() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, [])
  );

  const carregarProdutos = async () => {
    try {
      const email = auth.currentUser?.email;

      const res = await fetch(
        `https://afiliados-pro-v3-2.onrender.com/products/${email}`
      );

      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const verLink = async (item) => {
    console.log("ID:", item._id);

    try {
      await fetch(
        `https://afiliados-pro-v3-3.onrender.com/products/${item._id}/click`,
        {
          method: "POST",
        }
      );

      const { Clipboard } = require("react-native");
      Clipboard.setString(item.affiliateLink || item.link);

      carregarProdutos();

      Alert.alert("OK", "Clique registrado e link copiado");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Falha ao registrar clique");
    }
  };

  const excluirProduto = async (id: string) => {
    try {
      await fetch(
        `https://afiliados-pro-v3-2.onrender.com/products/${id}`,
        { method: "DELETE" }
      );

      carregarProdutos();
      Alert.alert("Sucesso", "Produto excluído");
    } catch {
      Alert.alert("Erro", "Falha ao excluir");
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#1F2937",
        padding: 20,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: "#60A5FA", fontSize: 16, marginBottom: 20 }}>
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Minhas Campanhas
      </Text>

      {produtos.length === 0 ? (
        <Text style={{ color: "#fff" }}>
          Produtos cadastrados aparecerão aqui.
        </Text>
      ) : (
        produtos
          .filter((item) => item.nome && item.preco)
          .map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#374151",
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                {item.nome}
              </Text>

              <Text style={{ color: "#ddd", marginTop: 4 }}>
                R$ {item.preco}
              </Text>

              <Text style={{ color: "#FBBF24", marginTop: 4 }}>
                Cliques: {item.clicks || 0}
              </Text>

              <Text style={{ color: "#60A5FA", marginTop: 4 }}>
                {item.link}
              </Text>

              <Text style={{ color: "#10B981", marginTop: 6 }}>
                Afiliado: {item.affiliateLink || item.link}
              </Text>

              <TouchableOpacity
                onPress={() => verLink(item)}
                style={{
                  backgroundColor: "#2563EB",
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 8,
                }}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Ver Link
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => excluirProduto(item._id)}
                style={{
                  backgroundColor: "#DC2626",
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 8,
                }}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          ))
      )}
    </ScrollView>
  );
}