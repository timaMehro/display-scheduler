import { NextResponse } from "next/server";
import type { PowerTimer } from "../../../../types/types";

let __flip = false;

// Stubbed function. Do not implement or modify.
function savePowerTimers(powerTimers: PowerTimer[]): Promise<void> {
  // Server-side save (mock)
  console.log("Saving power timers:", powerTimers);
  return Promise.resolve();
}

export async function POST(req: Request) {
  const { timers } = (await req.json()) as { timers: PowerTimer[] };

  if (!Array.isArray(timers)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  __flip = !__flip;

  if (!__flip) {
    return NextResponse.json(
      { error: "Random failure occurred" },
      { status: 500 }
    );
  }

  try {
    await savePowerTimers(timers);
  } catch (err) {
    console.error("savePowerTimers failed (ignored):", err);
  }

  return NextResponse.json(
    { message: "Timers saved successfully" },
    { status: 200 }
  );
}
