import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./apiEnvironment";

const api = axios.create({
  baseURL: API_BASE_URL,
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
