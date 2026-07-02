export function maskToken(token) {
  if (!token) return null;

  return token.slice(0, 8) + "****" + token.slice(-6);
}