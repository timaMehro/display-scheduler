"use client";

import useSWRMutation from "swr/mutation";
import { PowerTimer } from "../../../types/types";

async function send(url: string, { arg }: { arg: PowerTimer[] }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ timers: arg }),
  });

  if (!res.ok) {
    let msg = "Failed to save timers";
    try {
      msg = (await res.json()).error ?? msg;
    } catch {}
    throw new Error(msg);
  } else {
    return res.json();
  }
}

export function useSavePowerTimers() {
  return useSWRMutation("/api/display-scheduler", send);
}
