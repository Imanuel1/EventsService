const enum GeneralEventSource {
  ALERT_COMPANY = "alert company",
  EVENT_COMPANY = "event company",
  ROCKET_COMPANY = "rocket company",
}

export type GeneralEventType = {
  timestamp: Date;
  message: string;
  source: GeneralEventSource;
};
