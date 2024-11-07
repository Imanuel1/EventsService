import {
  Kafka,
  Message,
  Producer,
  ProducerBatch,
  TopicMessages,
} from "kafkajs";
import { kafka } from "./kafka";

export default class ProducerFactory {
  private producer: Producer;

  constructor() {
    this.producer = kafka.producer();
    this.start();
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect();
  }

  // public async sendBatch(messages: Array<string>): Promise<void> {
  //   const kafkaMessages: Array<Message> = messages.map((message) => {
  //     return {
  //       value: JSON.stringify(message),
  //     };
  //   });

  //   const topicMessages: TopicMessages = {
  //     topic: "producer-topic",
  //     messages: kafkaMessages,
  //   };

  //   const batch: ProducerBatch = {
  //     topicMessages: [topicMessages],
  //   };

  //   await this.producer.sendBatch(batch);
  // }

  public async sendMessage(topic: string, message: string): Promise<void> {
    const topicMessages: TopicMessages = {
      topic,
      messages: [{ value: message }],
    };

    await this.producer.send(topicMessages);
  }
}
