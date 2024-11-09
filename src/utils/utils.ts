import { AlertEventType } from "../types/alertEvent.type";
import {
  GeneralEventSource,
  GeneralEventType,
} from "../types/generalEvent.type";
import { RegularEventType } from "../types/regularEvent.type";
import { RocketEventType } from "../types/rocketEvent.type";

export const parseEventMessage = {
  [GeneralEventSource.ALERT_COMPANY]: (
    eventMessage: string
  ): { stringifyEvent: string; eventId: string } => {
    const event: AlertEventType = JSON.parse(eventMessage);
    const parsedEvent: GeneralEventType = {
      id: event.id,
      source: GeneralEventSource.ALERT_COMPANY,
      timestamp: new Date().toLocaleDateString("en-GB"),
      message: `התראת צופרים - בתאריך ${event.timestamp} הושמעה אזעקה במקומות: ${event.cities}, אזעקה מסוג ${event.alertType}`,
    };
    return {
      eventId: parsedEvent.id,
      stringifyEvent: JSON.stringify(parsedEvent),
    };
  },
  [GeneralEventSource.EVENT_COMPANY]: (
    eventMessage: string
  ): { stringifyEvent: string; eventId: string } => {
    const event: RegularEventType = JSON.parse(eventMessage);
    const parsedEvent: GeneralEventType = {
      id: event.id,
      source: GeneralEventSource.ALERT_COMPANY,
      timestamp: new Date().toLocaleDateString("en-GB"),
      message: `התראה - בתאריך ${event.timestamp}  במקום: ${event.location}, סוג האירוע ${event.description}, ${event.description}`,
    };
    return {
      eventId: parsedEvent.id,
      stringifyEvent: JSON.stringify(parsedEvent),
    };
  },
  [GeneralEventSource.ROCKET_COMPANY]: (
    eventMessage: string
  ): { stringifyEvent: string; eventId: string } => {
    const event: RocketEventType = JSON.parse(eventMessage);
    const parsedEvent: GeneralEventType = {
      id: event.id,
      source: GeneralEventSource.ALERT_COMPANY,
      timestamp: new Date().toLocaleDateString("en-GB"),
      message: `התראת טילים - בתאריך ${event.timestamp}, טילים מסוג ${event.rocketType}, שיורו לעבר המקומות: ${event.targetCity}`,
    };
    return {
      eventId: parsedEvent.id,
      stringifyEvent: JSON.stringify(parsedEvent),
    };
  },
};
