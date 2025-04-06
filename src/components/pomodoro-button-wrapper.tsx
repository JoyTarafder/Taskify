"use client";

import { usePathname } from "next/navigation";
import { PomodoroButton } from "./pomodoro-button";

export function PomodoroButtonWrapper() {
  const pathname = usePathname();

  // Don't show the button on the pomodoro page itself
  if (pathname === "/pomodoro") {
    return null;
  }

  return <PomodoroButton />;
}
