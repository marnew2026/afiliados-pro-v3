import { View, Text, TextInput, Button, Alert } from "react-native";
import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";


import api from "../services/api";
import { useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSignup = async () => {
  if (!email || !password) {
    Alert.alert("Preencha todos os campos");
    return;
  }

  try {
    setLoading(true);



    // 2) Registra/Login no backend
    const { data } = await api.post("/auth/register", {
      name,
  email,
  password,
     
    });

    // 3) Salva sessão
   await AsyncStorage.multiSet([
  ["token", data.token],
  ["userId", data.user._id],
  ["email", data.user.email],
]);

    // 4) Vai para o dashboard
    router.replace("/dashboard");

  } catch (error: any) {

    console.log(
      "SIGNUP ERROR:",
      error?.response?.data || error.message
    );

    Alert.alert(
      "Erro",
      error?.response?.data?.error ||
      error.message
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Criar conta
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />

      <Button
        title={loading ? "Criando..." : "Cadastrar"}
        onPress={handleSignup}
      />
    </View>
  );
}