import axios from "axios";
import AsyncStorage from "./sessionStorage";
import { router } from "expo-router";
import { API_BASE_URL } from "./apiEnvironment";

const isLoginRequest = (url) => /\/auth\/(login|register|signup)(?:[/?]|$)/.test(url || "");

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = isLoginRequest(config.url)
    ? null
    : await AsyncStorage.getItem("token");

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
    const authorization = error?.config?.headers?.Authorization
      || error?.config?.headers?.get?.("Authorization");
    const currentToken = error?.response?.status === 401
      ? await AsyncStorage.getItem("token")
      : null;
    if (
      error?.response?.status === 401 &&
      !isLoginRequest(error?.config?.url) &&
      currentToken && authorization === `Bearer ${currentToken}` &&
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
