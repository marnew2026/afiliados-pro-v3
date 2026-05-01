import axios from "axios";

export const api = axios.create({
  baseURL: "https://afiliados-pro-v3-production.up.railway.app",
});