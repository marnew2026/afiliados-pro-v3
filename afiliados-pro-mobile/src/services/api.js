import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://afiliados-pro-v3-2.onrender.com",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(
    "📡 API:",
    config.method?.toUpperCase(),
    config.url,
    "| JWT:",
    token ? "SIM" : "NÃO"
  );

  return config;
});

export default api;