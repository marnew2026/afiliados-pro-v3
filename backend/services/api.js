import axios from "axios";

const api = axios.create({
  baseURL: "https://afiliados-pro-v3-2.onrender.com",
  timeout: 15000,
});

export default api;