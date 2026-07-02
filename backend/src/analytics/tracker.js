export async function trackPost(userId) {
  await Stats.create({
    userId,
    postsSent: 1,
    date: new Date()
  });
}
export function trackEvent(type, data = {}) {
  console.log("📊 EVENT:", type, data);

  // futuro: salvar no Mongo ou Redis
}