import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "worker",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "payments" });

await consumer.connect();
await consumer.subscribe({ topic: "SALE_CREATED" });

await consumer.run({
  eachMessage: async ({ message }) => {
    const data = JSON.parse(message.value.toString());
    console.log("PROCESSANDO:", data);
  },
});