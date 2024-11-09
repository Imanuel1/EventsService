export const enum GeneralEventSource {
  ALERT_COMPANY = "alert company",
  EVENT_COMPANY = "event company",
  ROCKET_COMPANY = "rocket company",
}

export type GeneralEventType = {
  id: string;
  timestamp: string; //parsed Date as a string
  message: string;
  source: GeneralEventSource;
};
