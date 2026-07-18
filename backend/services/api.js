import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: "https://afiliados-pro-v3-2.onrender.com",
});

api.interceptors.request.use(async (config) => {
  console.log("🚀 REQUEST:", config.baseURL + config.url);

  const user = getAuth().currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  
  }

  return config;
});

export default api;