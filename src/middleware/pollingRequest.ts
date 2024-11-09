import axios from "axios";
import { CronJob } from "cron";
import { croneTime, rocketEventUrl } from "../environment";
import { updateRedisData } from "../redis/redis";
import { GeneralEventSource } from "../types/generalEvent.type";
import { parseEventMessage } from "../utils/utils";

// event type - GeneralEventSource.ALERT_COMPANY
const getEvent = async () => {
  try {
    const { data } = await axios.get(rocketEventUrl, { method: "GET" });

    console.log(`polling response with data - ${data}`);

    if (!data) return; // not save the data if empty

    //parse event data to general structure!!
    const { eventId, stringifyEvent } = parseEventMessage[
      GeneralEventSource.ALERT_COMPANY
    ](JSON.stringify(data));

    //update Redis - key define by this logic - <subject>:<subjectId>
    updateRedisData(`event:${eventId}`, stringifyEvent);

    //TODO:save the data in mongoDb
  } catch (error) {
    console.error("getEvent error :", error);
  }
};

export const pollingRequestsSetUp = () => {
  const job = new CronJob(
    croneTime,
    () => {
      console.log("sending polling get request");
      getEvent();
    }, // onTick
    null, // onComplete
    true, // start
    "Asia/Jerusalem" // timeZone
  );

  job.start(); // is optional here because of the fourth parameter set to true.
};
