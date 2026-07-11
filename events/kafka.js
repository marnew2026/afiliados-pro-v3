import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "saas-api",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

export async function sendEvent(topic, data) {
  await producer.connect();

  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(data),
      },
    ],
  });
}