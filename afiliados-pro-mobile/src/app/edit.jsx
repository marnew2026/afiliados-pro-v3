import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useState } from "react";
import { useRouter } from "expo-router";



export default function Edit() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 async function login() {
  try {

    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("LOGIN MONGO:");
    console.log(data);


    if (!data.token) {
      throw new Error("Token não retornado");
    }


    await AsyncStorage.setItem(
      "token",
      data.token
    );


    await AsyncStorage.setItem(
      "userId",
      data.user._id
    );

    await AsyncStorage.setItem(
  "email",
  data.user.email
);


  
    console.log(
      await AsyncStorage.getItem("token")
    );


    console.log("USER ID SALVO:");
    console.log(
      await AsyncStorage.getItem("userId")
    );


    router.replace("/dashboard");


} catch (err) {

    console.log(
      "LOGIN ERROR:",
      err?.response?.data || err.message
    );

    Alert.alert(
      "Erro",
      err?.response?.data?.error ||
      "Falha no login"
    );
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