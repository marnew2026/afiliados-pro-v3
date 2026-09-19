const PRODUCTION_API_URL = "https://afiliados-pro-v3-2.onrender.com";

export const API_BASE_URL = String(
  process.env.EXPO_PUBLIC_API_URL || PRODUCTION_API_URL
).trim().replace(/\/+$/, "");

export function buildApiUrl(path) {
  const cleanPath = String(path || "").startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}
