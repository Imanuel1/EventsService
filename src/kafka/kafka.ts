import { EachMessagePayload, Kafka, logLevel } from "kafkajs";
import { v4 as uuidv4 } from "uuid";
import { eventTopic1, eventTopic2, hostIp, kafkaBrokers } from "../environment";
import ConsumerFactory from "./kafkaConsumer";
import ProducerFactory from "./kafkaProducer";

export const kafka = new Kafka({
  logLevel: logLevel.INFO,
  clientId: `client-id-${uuidv4()}`,
  brokers: kafkaBrokers,
});

export const kafkaInit = async () => {
  const consumer = new ConsumerFactory();
  const producer = new ProducerFactory();

  //start consumers
  await consumer.startConsumer(
    eventTopic1,
    async (payload: EachMessagePayload) => {
      const { topic, partition, message } = payload;
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);

      //update Redis
      //update mongoDb
    }
  );

  await consumer.startConsumer(
    eventTopic2,
    async (payload: EachMessagePayload) => {
      const { topic, partition, message } = payload;
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);

      //update Redis
      //update mongoDb
    }
  );

  process.once("SIGINT", async () => {
    await producer.shutdown();
    await consumer.shutdown();
    process.exit();
  });
};
