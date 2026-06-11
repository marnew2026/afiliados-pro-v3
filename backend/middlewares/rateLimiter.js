const attempts = new Map();

export function rateLimiter(userId) {
  const now = Date.now();

  const user = attempts.get(userId) || [];

  const recent = user.filter(t => now - t < 60000);

  if (recent.length >= 5) {
    throw new Error("Muitas requisições");
  }

  recent.push(now);
  attempts.set(userId, recent);
}