import { Kafka } from "kafkajs";
import { addEarning } from "../src/services/walletService.js";

const kafka = new Kafka({
  clientId: "worker",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "commission-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "SALE_CREATED" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());

      console.log("💰 processando comissão:", data);

      await addEarning(data.userId, data.commission);
    },
  });
}

run();