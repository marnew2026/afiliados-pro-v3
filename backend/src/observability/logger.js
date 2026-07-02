export function logEvent(type, data) {
  console.log(JSON.stringify({
    type,
    data,
    time: new Date()
  }));
}
export function log(level, message, meta = {}) {
  console.log(`[${level}] ${message}`, meta);
}

export const logger = {
  info: (msg, meta) => log("INFO", msg, meta),
  warn: (msg, meta) => log("WARN", msg, meta),
  error: (msg, meta) => log("ERROR", msg, meta),
};