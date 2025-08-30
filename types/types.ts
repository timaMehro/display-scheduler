export type PowerTimer = {
  timerNumber: number;
  enabled: boolean;
  powerOffTime: string; // hh:mm
  powerOnTime: string; // hh:mm
  daysOfWeek: string[]; // "MONDAY" | ... | "SUNDAY"
};
