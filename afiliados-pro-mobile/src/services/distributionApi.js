import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const distributionApi = axios.create({
  baseURL: "https://afiliados-pro-v4-staging.onrender.com",
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
