import { containsOperation } from './../node_modules/sift/src/core';
import { ConnectionOptions } from "./../node_modules/mongodb/src/cmap/connection";
import dotenv from "dotenv";
import ip from "ip";
import mongoose from "mongoose";
dotenv.config();

export const port = process.env.PORT;

export const hostIp = process.env.HOST_IP ?? ip.address();

export const eventTopic1 = process.env.EVENT_TOPIC_1 ?? "event1";
export const eventTopic2 = process.env.EVENT_TOPIC_2 ?? "event2";

//the env should be like this "host:9090,host:9091,host:9092"
export const kafkaBrokers = process.env.KAFKA_BROKERS?.split(",") ?? [
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

export const mongoUser = process.env.MONGO_USER || "";
export const mongoPass = process.env.MONGO_PASS || "";
export const mongoUrl = process.env.MONGO_URL || "";
export const mongoDb = process.env.MONGO_DB || "";
export const mongoOption: mongoose.ConnectOptions = {
  retryWrites: true,
  w: "majority",
};

export const mongo = {
  mongoUser,
  mongoPass,
  mongoDb,
  mongoUrl,
  mongoOption,
  mongoConnection: `mongodb+srv://${mongoUser}:${mongoPass}@${mongoUrl}/${mongoDb}`,
};

export const connectToMongo = async () => {
  try {
    const connection = await mongoose.connect(
      mongo.mongoConnection,
      mongoOption
    );
    console.log("connect to mongo db: ", connection.version);
  } catch (error) {
    console.error("Error connect to mongo :", error);
  }
};


// build container
// docker-compose build

//run container
// docker-compose up

//build and up
//docker-compose up --build

//logs
//docker-compose logs -f

// rebuild containers after changes
// docker-compose up --build

// stop containers
// docker-compose down

//remove docker cache issue
//docker build --no-cache -t your-image-name .


