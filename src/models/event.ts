import mongoose, { Schema } from "mongoose";
import { GeneralEventSource } from "../types/generalEvent.type";

export const EventSchema = new Schema({
  eventId: { type: String, required: true, unique: true },
  timeStamp: { type: String, required: true },
  source: {
    type: String,
    enum: [
      GeneralEventSource.ALERT_COMPANY,
      GeneralEventSource.EVENT_COMPANY,
      GeneralEventSource.ROCKET_COMPANY,
    ],
    required: true,
  },
  message: { type: String, required: true },
});

export const EventModel = mongoose.model("Event", EventSchema);
