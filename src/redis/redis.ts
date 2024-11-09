import { EventType } from "./../../node_modules/@redis/client/dist/lib/commands/LATENCY_HISTORY.d";
import { createClient } from "redis";
import express, { NextFunction, Request, Response } from "express";
import { redisPblishChannel, redisUrl } from "../environment";
import { v4 } from "uuid";
import { GeneralEventType } from "../types/generalEvent.type";

export const redisClient = createClient({ url: redisUrl });

export const redisSetUp = async () => {
  await redisClient.connect();
  redisClient.on("error", (err) => console.log("Redis client error: ", err));

  redisClient.on("connect", async () => {
    console.log("Redis connected");
    try {
      //set commands set and expired to be notify
      await redisClient.sendCommand([
        "CONFIG",
        "SET",
        "notify-keyspace-events",
        "Kxg",
      ]);
      console.log(
        "Keyspace notifications configured for set and expired events."
      );
    } catch (error) {
      console.log("configuration command failed!");
    }
  });
};

// generic publish changes data - add/ update/ delete
export const publishDataChanges = (channel: string, message: string) => {
  redisClient.publish(channel, JSON.stringify(message));
};

//key define by this logic - <subject>:<subjectId>
export const updateRedisData = async (key: string, data: string) => {
  try {
    const cacheData = await redisClient.get(key);
    if (cacheData) {
      await redisClient.set(key, data, {
        KEEPTTL: true,
      });
    } else {
      await redisClient.setEx(key, 86400, data);
    }
  } catch (error) {
    console.log(`error update redis data - id ${key} :`, error);
  }
};

// const getAllData = async (): Promise<string[]> => {
//   const allData: string[] = [];
//   let cursor = 0;
//   do {
//     //get every time 100
//     const res = await redisClient.scan(cursor, { MATCH: "*11*", COUNT: 100 });
//     cursor = res.cursor;
//     const keys = res.keys;
//     if (keys.length > 0) {
//       const values = await redisClient.mGet(keys);
//       values.forEach((value, index) => {
//         allData.push(JSON.stringify({ key: keys[index], value }));
//       });
//     }
//   } while (cursor !== 0); //until cursor is "0"
//   return allData;
// };

// export const publishAllData = async (channel: string) => {
//   try {
//     const messages = await getAllData();
//     console.log("Data published successfully");
//     redisClient.publish(channel, JSON.stringify(messages));
//   } catch (error) {
//     console.error("Error publishing all data:", error);
//   }
// };

//only for test!!!
export const redisRouter = express.Router();

const postRequest = (req: Request, res: Response): any => {
  try {
    if (!req.body?.message) {
      return res
        .status(400)
        .json({ error: 400, message: "The message is mandatory" });
    }
    const message = {
      id: v4(),
      message: req.body.message,
      date: new Date().toLocaleDateString("en-GB"),
    };

    redisClient.publish(redisPblishChannel, JSON.stringify(message));
    console.log(`Publish an event redis to: ${req.body.message}`);
    return res.json({ detail: "Publish a redis event successfuly" });
  } catch (error) {
    return res.status(500).json({ detail: `error: ${error}` });
  }
};

redisRouter.route("/testRedis").post(postRequest);
