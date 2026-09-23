import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
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


let clearingInvalidSession = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error?.response?.status === 401 &&
      !clearingInvalidSession
    ) {
      clearingInvalidSession = true;

      try {
        await AsyncStorage.multiRemove([
          "token",
          "userId",
          "email",
        ]);

        router.replace("/login");
      } finally {
        setTimeout(() => {
          clearingInvalidSession = false;
        }, 500);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
