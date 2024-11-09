import dotenv from "dotenv";
import ip from "ip";
dotenv.config();

export const port = process.env.PORT;

export const hostIp = process.env.HOST_IP ?? ip.address();

export const eventTopic1 = process.env.EVENT_TOPIC_1 ?? "event1";
export const eventTopic2 = process.env.EVENT_TOPIC_2 ?? "event2";

//the env should be like this "host:9090,host:9091,host:9092"
export const kafkaBrokers = process.env.KAFKA_BROKER?.split(",") ?? [
  "localhost:9090",
  "localhost:9091",
];

//the second - rocket event source - polling request
export const rocketEventUrl =
  process.env.ROCKET_EVENT_SOURCE_URL ?? "example url";

export const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";
export const redisPblishChannel =
  process.env.REDIS_PUBLISH_CHANNEL ?? "REDIS_TEST";
export const croneTime = process.env.CRONE_TIME ?? "*/5 * * * * *"; // cronTime every 5 second
