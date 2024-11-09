import { EachMessagePayload, Kafka, logLevel } from "kafkajs";
import { v4 as uuidv4 } from "uuid";
import { eventTopic1, eventTopic2, hostIp, kafkaBrokers } from "../environment";
import ConsumerFactory from "./kafkaConsumer";
import ProducerFactory from "./kafkaProducer";
import { updateRedisData } from "../redis/redis";
import { parseEventMessage } from "../utils/utils";
import {
  GeneralEventSource,
  GeneralEventType,
} from "../types/generalEvent.type";
import { EventModel } from "../models/event";

export const kafka = new Kafka({
  logLevel: logLevel.INFO,
  clientId: `client-id-${uuidv4()}`,
  brokers: kafkaBrokers,
});

export const kafkaInit = async () => {
  const consumer = new ConsumerFactory();
  const producer = new ProducerFactory();

  //start consumers
  // event type - GeneralEventSource.ALERT_COMPANY
  await consumer.startConsumer(
    eventTopic1,
    async (payload: EachMessagePayload) => {
      const { topic, partition, message } = payload;
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);

      if (!message.value) return; // not save the data if empty

      //parse event data to general structure!!
      const { eventId, stringifyEvent } = parseEventMessage[
        GeneralEventSource.ALERT_COMPANY
      ](message.value.toString());

      //update Redis - key define by this logic - <subject>:<subjectId>
      updateRedisData(`event:${eventId}`, stringifyEvent);

      //update mongoDb
      await EventModel.findOneAndUpdate(
        { eventId },
        JSON.parse(stringifyEvent) as GeneralEventType,
        { upsert: true }
      );
    }
  );

  await consumer.startConsumer(
    eventTopic2,
    async (payload: EachMessagePayload) => {
      const { topic, partition, message } = payload;
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);

      if (!message.value) return; // not save the data if empty

      //parse event data to general structure!!
      const { eventId, stringifyEvent } = parseEventMessage[
        GeneralEventSource.ROCKET_COMPANY
      ](message.value.toString());

      //update Redis
      updateRedisData(`event:${eventId}`, stringifyEvent);

      //update mongoDb
      await EventModel.findOneAndUpdate(
        { eventId },
        JSON.parse(stringifyEvent) as GeneralEventType,
        { upsert: true }
      );
    }
  );

  process.once("SIGINT", async () => {
    await producer.shutdown();
    await consumer.shutdown();
    process.exit();
  });
};
