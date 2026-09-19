import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./apiEnvironment";

const distributionApi = axios.create({
  baseURL: API_BASE_URL,
});

distributionApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("distributionToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(
    "📣 DISTRIBUTION API:",
    config.method?.toUpperCase(),
    config.url,
    "| JWT:",
    token ? "SIM" : "NÃO"
  );

  return config;
});

export default distributionApi;
