import { RegularEventType } from "./../types/regularEvent.type";
import { RocketEventType } from "./../types/rocketEvent.type";
import { Request } from "express";
import { AlertEventType } from "../types/alertEvent.type";
import { GeneralEventSource } from "../types/generalEvent.type";
import { parseEventMessage } from "../utils/utils";
import { updateRedisData } from "../redis/redis";

//HAS TO DEFINE IN POST REQUEST WHICH EVENT SOURCE IT IS!!!
export const insertEvent = async (body: {
  source: GeneralEventSource;
  value: AlertEventType | RocketEventType | RegularEventType;
}) => {
  //construct the data
  console.log(
    `insertEvent :${body}, source ${body.source}, with data ${body.value}`
  );

  if (!body.value) return; // not save the data if empty

  //parse event data to general structure!!
  const { eventId, stringifyEvent } = parseEventMessage[body.source]?.(
    JSON.stringify(body.value)
  );

  //unidentify event source
  if (eventId) {
    console.log(
      `this event source - ${body.source}, is not recognize in this sysytem`
    );
    return;
  }

  //update Redis - key define by this logic - <subject>:<subjectId>
  updateRedisData(`event:${eventId}`, stringifyEvent);

  //TODO:save the data in mongoDb
};
