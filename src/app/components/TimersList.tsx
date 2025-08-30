"use client";

import React, { useEffect, useState } from "react";
import { PowerTimer } from "../../../types/types";
import SelectableDays from "./SelectableDays";
import SwitchButton from "./SwitchButton";
import { INITIAL_TIMERS } from "./data/timerData";

interface Props {
  onTimersCountChange?: (count: number) => void;
}

export default function TimersListEditable({ onTimersCountChange }: Props) {
  const [timers, setTimers] = useState<PowerTimer[]>(INITIAL_TIMERS);

  // // update a specific time field for a timer
  const updateTime = (
    id: number,
    which: "powerOffTime" | "powerOnTime",
    value: string
  ) => {
    setTimers((prev) =>
      prev.map((t) => (t.timerNumber === id ? { ...t, [which]: value } : t))
    );
  };

  // // delete a timer by id
  const deleteTimer = (id: number) => {
    setTimers((prev) => prev.filter((t) => t.timerNumber !== id));
  };

  // // toggle enabled state for a timer
  const toggleEnabled = (id: number) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.timerNumber === id ? { ...t, enabled: !t.enabled } : t
      )
    );
  };

  useEffect(() => {
    onTimersCountChange?.(timers.length);
  }, [timers.length, onTimersCountChange]);

  // // edit timer (placeholder action)
  const editTimer = (id: number) => {
    alert(`Edit Timer #${id}`);
    // Implement actual edit logic here
  };

  return (
    <div className="w-full mt-6 py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-2 text-2xl font-semibold text-slate-900 tracking-tight">
          Timers
        </h2>

        <p className="mb-6  mx-auto max-w-6xl text-sm leading-6 text-slate-600">
          Each timer defines a schedule for selected days (e.g., Sunday–Monday).
          The device will stay{" "}
          <span className="font-semibold text-slate-800">OFF</span> from
          <span className="mx-1 font-mono text-slate-800">{`Off`}</span> time
          until
          <span className="mx-1 font-mono text-slate-800">{`On`}</span> time on
          those days. Use the toggle on the right to enable or disable the
          entire schedule without changing the times or day selections.
        </p>

        <ul className="rounded-2xl  bg-white shadow-sm divide-y divide-slate-100">
          {timers.map((t) => (
            <li
              key={t.timerNumber}
              className="flex justify-between px-5 py-4 hover:bg-slate-50/60 transition-colors border-b-8 border-gray-50 last:border-0"
            >
              {/* Left: main content */}
              <div className="min-w-0 pr-4 flex-1">
                <div className="flex items-center gap-2 rounded-lg px-2 py-1">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                    {t.timerNumber}
                  </span>

                  <span className="text-slate-600 text-sm font-medium">
                    Timer {t.timerNumber}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-6 text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <span className="whitespace-nowrap">Off</span>
                    <input
                      type="time"
                      value={t.powerOffTime}
                      onChange={(e) =>
                        updateTime(
                          t.timerNumber,
                          "powerOffTime",
                          e.target.value
                        )
                      }
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition"
                    />
                  </label>

                  <label className="flex items-center gap-2 text-slate-600">
                    <span className="whitespace-nowrap">On</span>
                    <input
                      type="time"
                      value={t.powerOnTime}
                      onChange={(e) =>
                        updateTime(t.timerNumber, "powerOnTime", e.target.value)
                      }
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition"
                    />
                  </label>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <SelectableDays />
                </div>
              </div>

              {/* Right column with Switch (top) + Buttons (bottom) */}
              <div className="flex flex-col justify-between items-end pl-4 border-l border-slate-100">
                <div>
                  <SwitchButton
                    enabled={t.enabled}
                    onToggle={() => toggleEnabled(t.timerNumber)}
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => editTimer(t.timerNumber)}
                    className="rounded-full px-6 py-3 text-base font-medium disabled: disabled:bg-gray-300 text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTimer(t.timerNumber)}
                    className="rounded-full px-6 py-3 text-base font-medium disabled: disabled:bg-gray-300 text-rose-700 bg-rose-50 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
