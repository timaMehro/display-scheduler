import { PowerTimer } from "../../../../types/types";

export const INITIAL_TIMERS: PowerTimer[] = [
  {
    timerNumber: 1,
    enabled: true,
    powerOffTime: "19:30",
    powerOnTime: "07:30",
    daysOfWeek: ["Mon", "Wed", "Fri"],
  },
  {
    timerNumber: 2,
    enabled: false,
    powerOffTime: "22:00",
    powerOnTime: "06:00",
    daysOfWeek: ["Tue", "Thu"],
  },
  {
    timerNumber: 3,
    enabled: true,
    powerOffTime: "20:15",
    powerOnTime: "08:00",
    daysOfWeek: ["Sat", "Sun"],
  },
  {
    timerNumber: 4,
    enabled: false,
    powerOffTime: "21:00",
    powerOnTime: "07:00",
    daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    timerNumber: 5,
    enabled: true,
    powerOffTime: "23:00",
    powerOnTime: "05:30",
    daysOfWeek: ["Sun"],
  },
  {
    timerNumber: 6,
    enabled: false,
    powerOffTime: "18:45",
    powerOnTime: "09:00",
    daysOfWeek: ["Sat"],
  },
  {
    timerNumber: 7,
    enabled: true,
    powerOffTime: "20:30",
    powerOnTime: "06:30",
    daysOfWeek: ["Fri"],
  },

];
