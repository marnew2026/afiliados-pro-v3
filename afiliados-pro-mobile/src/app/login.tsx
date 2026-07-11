import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

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

    // 1) Login no Firebase
    const result = await signInWithEmailAndPassword(
  auth,
  email,
  password
);


// 🔥 PEGA UID DO FIREBASE
const firebaseUid = result.user.uid;


// 🔥 BUSCA USUÁRIO NO MONGO
// 🔥 BUSCA USUÁRIO NO MONGO
const response = await api.get(
  `/users/firebase/${firebaseUid}`
);

console.log("🔥 RESPOSTA USUARIO MONGO:");
console.log(response.data);


// 🔥 SALVA O ID DO MONGO NO CELULAR
await AsyncStorage.setItem(
  "userId",
  response.data._id
);

console.log(
  "USER ID GRAVADO:",
  await AsyncStorage.getItem("userId")
);

// 🔥 SALVA O ID DO MONGO NO CELULAR



console.log("Firebase UID:", firebaseUid);
console.log("Mongo UserId salvo:", response.data._id);

    const firebaseUser = result.user;

// 2) Login no backend
const { data } = await api.post("/auth/firebase-login", {
  email: firebaseUser.email,
  firebaseUid: firebaseUser.uid,
});

    console.log("LOGIN BACKEND:", data);

    // 3) Salva sessão
    await AsyncStorage.multiSet([
      ["token", data.token],
      ["userId", data.user._id],
    ]);
    console.log("USER ID SALVO:", await AsyncStorage.getItem("userId"));
    console.log("TOKEN SALVO:", await AsyncStorage.getItem("token"));
    const token = await AsyncStorage.getItem("token");
console.log("TOKEN:", token);
    // 4) Dashboard
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