import {
  Consumer,
  ConsumerSubscribeTopics,
  EachBatchPayload,
  Kafka,
  EachMessagePayload,
  logLevel,
} from "kafkajs";
import { v4 as uuidv4 } from "uuid";
import { kafka } from "./kafka";

export default class ConsumerFactory {
  private consumer: Consumer;

  public constructor() {
    this.consumer = kafka.consumer({
      groupId: `consumer-group-${uuidv4()}`,
    });
    this.start();
  }

  public async start(): Promise<void> {
    try {
      await this.consumer.connect();
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  }

  public async startConsumer(
    topic: string,
    eachMessage: (payload: EachMessagePayload) => Promise<void>
  ): Promise<void> {
    try {
      await this.consumer.subscribe({ topic, fromBeginning: false });

      await this.consumer.run({ eachMessage });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // public async startBatchConsumer(): Promise<void> {
  //   const topic: ConsumerSubscribeTopics = {
  //     topics: ["example-topic"],
  //     fromBeginning: false,
  //   };

  //   try {
  //     await this.consumer.connect();
  //     await this.consumer.subscribe(topic);
  //     await this.consumer.run({
  //       eachBatch: async (eachBatchPayload: EachBatchPayload) => {
  //         const { batch } = eachBatchPayload;
  //         for (const message of batch.messages) {
  //           const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`;
  //           console.log(`- ${prefix} ${message.key}#${message.value}`);
  //         }
  //       },
  //     });
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // }

  public async shutdown(): Promise<void> {
    await this.consumer.disconnect();
  }
}
