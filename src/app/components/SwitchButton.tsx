"use client";
import clsx from "clsx";
import React from "react";

interface Props {
  enabled: boolean;
  onToggle: () => void;
}

export default function SwitchButton({ enabled, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        "relative h-6 w-11 rounded-full transition-colors",
        enabled ? "bg-green-500" : "bg-gray-200"
      )}
      aria-pressed={enabled}
      aria-label="Enable timer"
      title="Enable timer"
    >
      <div
        className={clsx(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          enabled ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
