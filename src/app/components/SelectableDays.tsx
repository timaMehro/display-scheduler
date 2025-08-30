import React, { useState } from "react";

interface Props {
  onChange?: (selectedDays: string[]) => void;
}

export const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SelectableDays = ({ onChange }: Props) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setSelectedDays(updated);
    onChange?.(updated);
  };

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {allDays.map((day) => {
        const selected = selectedDays.includes(day);
        return (
          <button
            key={day}
            type="button"
            onClick={() => toggleDay(day)}
            aria-pressed={selected}
            className={`inline-flex items-center justify-center rounded-xl border px-3 py-1.5 text-sm font-medium ${
              selected
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
};

export default SelectableDays;
