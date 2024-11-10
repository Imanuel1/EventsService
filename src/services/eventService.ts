import { RegularEventType } from "./../types/regularEvent.type";
import { RocketEventType } from "./../types/rocketEvent.type";
import { AlertEventType } from "../types/alertEvent.type";
import {
  GeneralEventSource,
  GeneralEventType,
} from "../types/generalEvent.type";
import { parseEventMessage } from "../utils/utils";
import { updateRedisData } from "../redis/redis";
import { EventModel } from "../models/event";

//HAS TO DEFINE IN POST REQUEST WHICH EVENT SOURCE IT IS!!!
export const insertEvent = async (body: {
  source: GeneralEventSource;
  value: AlertEventType | RocketEventType | RegularEventType;
}) => {
  //construct the data
  console.log(
    `insertEvent :${body}, source ${body.source}, with data ${body.value}`
  );
// not save the data if empty
  if (!body.value) return; 

  //handle array of event and single event - using upsert
  const eventArray = Array.isArray(body.value) ? body.value : [body.value];

  await Promise.all(
    eventArray.map(async (event) => {
      //parse event data to general structure!!
      const { eventId, stringifyEvent } = parseEventMessage[body.source]?.(
        JSON.stringify(event)
      );

      //unidentify event source
      if (!eventId) {
        console.log(
          `this event source - ${body.source}, is not recognize in this sysytem`
        );
        return;
      }

      //update Redis - key define by this logic - <subject>:<subjectId>
      await updateRedisData(`event:${eventId}`, stringifyEvent);

      //save the data in mongoDb
      await EventModel.findOneAndUpdate(
        { eventId },
        event as GeneralEventType,
        { upsert: true }
      );
    })
  );
};
