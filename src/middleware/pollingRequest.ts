import axios from "axios";
import { CronJob } from "cron";
import { rocketEventUrl } from "../environment";

const getEvent = async () => {
  try {
    const event = await axios.get(rocketEventUrl, { method: "GET"});

    //TODO:save the data in Redis Db

    //TODO:save the data in mongoDb
  } catch (error) {
    console.error("getEvent error :", error);
  }
};

export const pollingRequestsSetUp = () => {
    const job = new CronJob(
        "*/5 * * * * *", // cronTime every 5 second
        () => {
            console.log("sending polling get request");
            getEvent();
        }, // onTick
        null, // onComplete
        true, // start
        "Asia/Jerusalem" // timeZone
    );
    
    job.start(); // is optional here because of the fourth parameter set to true.
}