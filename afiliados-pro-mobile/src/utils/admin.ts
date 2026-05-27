export const ADMIN_EMAIL = "marielsantana@bol.com.br";

export function isAdmin(email?: string | null) {
  return email === ADMIN_EMAIL;
}