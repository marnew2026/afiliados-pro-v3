const ws = new WebSocket("ws://localhost:3001");

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  console.log("EVENT:", data);

  if (data.type === "job_started") {
    console.log("🚀 Job iniciou", data);
  }

  if (data.type === "job_completed") {
    console.log("✅ Job finalizado", data);
  }
};