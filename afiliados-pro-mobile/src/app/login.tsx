import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useRouter } from "expo-router";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function entrar() {
    try {
      if (!email || !password) {
        Alert.alert("Erro", "Preencha todos os campos");
        return;
      }

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(
        "USUARIO:",
        userCredential.user.email
      );

      Alert.alert("Sucesso", "Login realizado");

      router.replace("/dashboard");

    } catch (err: any) {
      console.log(err);

      Alert.alert(
        "Erro",
        err.message || "Erro ao fazer login"
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        Login
      </Text>

      <TextInput
        placeholder="Seu email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#1e293b",
          color: "#fff",
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
        }}
      />

      <TextInput
        placeholder="Sua senha"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: "#1e293b",
          color: "#fff",
          padding: 16,
          borderRadius: 12,
          marginBottom: 30,
        }}
      />

      <TouchableOpacity
        onPress={entrar}
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
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}