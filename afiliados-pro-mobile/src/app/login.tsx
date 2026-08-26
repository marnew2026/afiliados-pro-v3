import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function entrar() {


  try {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

  

    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("========== DEBUG LOGIN JWT ==========");

    

    if (!data?.token) {
      throw new Error("Backend não retornou token");
    }

   

    
   console.log("LOGIN USUÁRIO RECEBIDO: SIM");
   console.log("====================================");

 // 💾 SALVAR TOKEN
await AsyncStorage.setItem("token", data.token);

// 💾 SALVAR MONGO USER ID
await AsyncStorage.setItem("userId", data.user._id);

console.log("========== LOGIN PERSISTENTE ==========");

console.log(
  "TOKEN SALVO:",
  (await AsyncStorage.getItem("token")) ? "SIM" : "NÃO"
);

console.log(
  "USER ID SALVO:",
  await AsyncStorage.getItem("userId")
);

console.log("=======================================");
    router.replace("/dashboard");

  } catch (err: any) {

    console.log(
      "LOGIN ERROR:",
      err?.response?.data || err.message
    );

    Alert.alert(
      "Erro",
      err?.response?.data?.error ||
      err.message ||
      "Falha no login"
    );
  }
}

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity onPress={entrar}>
        <Text>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}