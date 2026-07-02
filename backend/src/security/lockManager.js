const locks = new Map();

export function acquireLock(userId) {
  const key = String(userId);

  if (locks.has(key)) return false;

  locks.set(key, Date.now());
  return true;
}

export function releaseLock(userId) {
  locks.delete(String(userId));
}