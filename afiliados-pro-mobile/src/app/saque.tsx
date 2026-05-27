import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Saque() {
  const [pixKey, setPixKey] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [saldo, setSaldo] = useState(0);

  const currentUser = {
    email: "marielsantana@bol.com.br",
  };

  useEffect(() => {
    carregarSaldo();
  }, []);

  async function carregarSaldo() {
    try {
      const response = await fetch(
        `https://afiliados-pro-v3-2.onrender.com/campaigns/${currentUser.email}`
      );

      const data = await response.json();

      console.log("CAMPAIGNS RAW:", data);

      if (!Array.isArray(data)) {
        setSaldo(0);
        return;
      }

      let total = 0;

      data.forEach((item: any) => {
        total += Number(item?.earnings || 0);
      });

      console.log("TOTAL:", total);

      setSaldo(total);
    } catch (err) {
      console.log("ERRO SALDO:", err);
      setSaldo(0);
    }
  }

  async function solicitarSaque() {
    try {
      setLoading(true);

      console.log("EMAIL:", currentUser?.email);
      console.log("PIX:", pixKey);
      console.log("AMOUNT:", amount);

      const response = await fetch(
        "https://afiliados-pro-v3-2.onrender.com/withdraw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: currentUser?.email,
            pixKey,
            amount: Number(amount.replace(",", ".")),
          }),
        }
      );

      const data = await response.json();

      console.log("SAQUE RESPONSE:", data);

      if (data?.success || data?._id) {
        alert("Saque solicitado com sucesso!");

        setAmount("");
        setPixKey("");
      } else {
        alert(data?.message || "Erro ao solicitar saque");
      }
    } catch (error) {
      console.log("ERRO SAQUE:", error);
      alert("Erro no saque");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
      }}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Saque Pix
        </Text>

        <View
          style={{
            backgroundColor: "#1e293b",
            padding: 20,
            borderRadius: 16,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "#94a3b8",
              fontSize: 16,
            }}
          >
            Saldo disponível
          </Text>

          <Text
            style={{
              color: "#22c55e",
              fontSize: 34,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            R$ {saldo.toFixed(2)}
          </Text>
        </View>

        <Text
          style={{
            color: "#fff",
            marginBottom: 8,
            fontSize: 16,
          }}
        >
          Chave Pix
        </Text>

        <TextInput
          placeholder="Digite sua chave Pix"
          placeholderTextColor="#94a3b8"
          value={pixKey}
          onChangeText={setPixKey}
          style={{
            backgroundColor: "#1e293b",
            color: "#fff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 20,
          }}
        />

        <Text
          style={{
            color: "#fff",
            marginBottom: 8,
            fontSize: 16,
          }}
        >
          Valor do saque
        </Text>

        <TextInput
          placeholder="Digite o valor"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={{
            backgroundColor: "#1e293b",
            color: "#fff",
            padding: 16,
            borderRadius: 12,
            marginBottom: 30,
          }}
        />

        <TouchableOpacity
          onPress={solicitarSaque}
          disabled={loading}
          style={{
            backgroundColor: "#22c55e",
            padding: 18,
            borderRadius: 14,
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
            {loading ? "Enviando..." : "Solicitar Saque"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}