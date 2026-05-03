import API_URL from "../services/api";



const API_URL = import.meta.env.VITE_API_URL;

export default API_URL;
const 
API_URL = "https://afiliados-pro-v3-2.onrender.com";

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return await res.json();
}
export const API_URL = "https://afiliados-pro-v3-2.onrender.com";
export async function getCampaigns(token) {
  const res = await fetch(`${API_URL}/campaigns`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
fetch(`${API_URL}/campaigns`)
  return await res.json();
}

export async function createCampaign(token, data) {
  const res = await fetch(`${API_URL}/campaigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
console.log("API_URL:", API_URL);
  return await res.json();
}