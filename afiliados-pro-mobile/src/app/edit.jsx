import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useState } from "react";
import { useRouter } from "expo-router";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Edit() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

     router.replace("/dashboard");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro login");
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          marginBottom: 10,
        }}
      />

      <Text>Senha</Text>

      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity onPress={login}>
        <Text>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}