// SinglePowerTimerDesktop.tsx
import React, { useState } from "react";
import { PowerTimer } from "../../../types/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SwitchButton from "./SwitchButton";
import SelectableDays from "./SelectableDays";
import { useSavePowerTimers } from "../hooks/useSwrHook";

interface Props {
  onCloseCreatePanel: () => void;
}

export default function SinglePowerTimerDesktop({ onCloseCreatePanel }: Props) {
  const [enabled, setEnabled] = useState(true);
  const [powerOffTime, setPowerOffTime] = useState("18:00");
  const [powerOnTime, setPowerOnTime] = useState("06:00");
  const [days, setDays] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const { trigger, isMutating, error: swrError } = useSavePowerTimers();

  const onSave = async () => {
    const payload: PowerTimer = {
      timerNumber: 1,
      enabled,
      powerOffTime,
      powerOnTime,
      daysOfWeek: days,
    };

    console.log("Payload:", payload);

    if (days.length === 0) {
      setMessage("Please select at least one day.");
      return;
    } else {
      try {
        const result = await trigger([payload], { throwOnError: true });
        setMessage(result?.message ?? "Saved");
      } catch (e: unknown) {
        if (e instanceof Error) {
          setMessage(e.message);
        } else {
          setMessage("Failed");
        }
      }
    }
  };

  function toggleEnabled() {
    setEnabled((enabled) => !enabled);
  }

  function onChangePowerOff(time: string) {
    setPowerOffTime(time);
  }

  function onChangePowerOn(time: string) {
    setPowerOnTime(time);
  }

  function onChangeDays(selectedDays: string[]) {
    setDays(selectedDays);
  }

  return (
    <div className="w-full mb-50 y-14">
      <div className="mx-auto max-w-6xl px-4 ">
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm relative">
          <button
            type="button"
            onClick={onCloseCreatePanel}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Close"
            title="Close"
          >
            <XMarkIcon className="text-gray-400 w-5" />
          </button>

          <div className="px-8 py-6">
            <div className="flex items-center gap-3">
              <SwitchButton
                enabled={enabled}
                onToggle={() => toggleEnabled()}
              />
              <div className="text-2xl font-semibold text-gray-800">
                Timer 1
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor={powerOffTime}
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Power Off
                </label>
                <div className="relative">
                  <input
                    id={powerOffTime}
                    type="time"
                    value={powerOffTime}
                    onChange={(e) => onChangePowerOff(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-5 text-[16px] text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor={powerOnTime}
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Power On
                </label>
                <div className="relative">
                  <input
                    id={powerOnTime}
                    type="time"
                    value={powerOnTime}
                    onChange={(e) => onChangePowerOn(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-5 text-[16px] text-gray-800"
                  />
                  {/* (icon removed as requested) */}
                </div>
              </div>
            </div>
            <SelectableDays onChange={onChangeDays} />
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onSave}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium text-white bg-blue-950 hover:bg-blue-900 "
              >
                Save Timer
              </button>
            </div>
            {/* TODO: This can be used to trigger skeleton-style loading, showing
            only a message for demonstration purposes */}
            {isMutating && <p className="text-blue-600">Saving… please wait</p>}
            {swrError && <p className="text-red-600">{message}</p>}
            {!swrError && <p className="text-green-600">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
