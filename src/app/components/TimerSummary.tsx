"use client";

import React, { useState } from "react";
import TimerForm from "./CreateTimer";
import TimersList from "./TimersList";
import Modal from "./modal/Modal";

export default function TimerSummary() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [timersCount, setTimersCount] = useState<number>(0);

  function onclick() {
    setModalOpen(true);
  }

  function onCloseCreatePanel() {
     setModalOpen(false);
  }

  function onTimersCountChange(count: number) {
    setTimersCount(count);
  }

  return (
    <>
      <section aria-labelledby="timer-summary-heading" className="w-full">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-5xl leading-none font-bold text-blue-900 text-center">
            Set Power Timers
          </h1>
          <p className="mt-4 text-lg text-gray-500 text-center">
            Control when your digital displays turn off and on
          </p>

          <div className="mt-6 rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-5 sm:p-7">
              <div className="flex flex-wrap items-baseline space-x-1">
                <span className="text-base text-gray-800 font-medium">
                  You currently have
                </span>
                <span className="text-blue-900 font-semibold text-lg">{timersCount}</span>
                <span className="text-base text-gray-800 font-medium">
                  timer
                </span>
                <span className="text-sm text-gray-500">
                  (out of a maximum of 7)
                </span>
              </div>

              <button
                type="button"
                className="rounded-full px-6 py-3 text-base font-medium disabled: disabled:bg-gray-300 text-white bg-blue-950 hover:bg-blue-900"
                onClick={() => onclick()}
                disabled={timersCount >= 7}
              >
                +Add Timer
              </button>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <TimerForm onCloseCreatePanel={() => onCloseCreatePanel()} />
      </Modal>
      <TimersList  onTimersCountChange={(value) => onTimersCountChange(value) }/>
    </>
  );
}
