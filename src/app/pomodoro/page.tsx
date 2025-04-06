"use client";

import { ArrowLeftIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function PomodoroTimer() {
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  // Timer durations in seconds
  const durations = useMemo(
    () => ({
      work: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
    }),
    []
  );

  // Handle mode change
  useEffect(() => {
    setTimeLeft(durations[mode]);
    setIsRunning(false);
  }, [mode, durations]);

  // Create audio context for notification sound
  const playNotificationSound = () => {
    try {
      // Define AudioContext type properly to avoid circular reference
      type AudioContextType = typeof window.AudioContext;
      // Define the WebkitAudioContext type properly
      interface WindowWithWebkitAudio extends Window {
        webkitAudioContext?: AudioContextType;
      }

      const AudioCtx: AudioContextType =
        window.AudioContext ||
        ((window as WindowWithWebkitAudio)
          .webkitAudioContext as AudioContextType);
      const audioContext = new AudioCtx();

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(830, audioContext.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.5,
        audioContext.currentTime + 0.01
      );
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);

      // Vibrate the device if supported
      if ("vibrate" in navigator) {
        navigator.vibrate(500);
      }
    } catch (e) {
      console.error("Error playing notification sound:", e);
    }
  };

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);

      // Play notification sound
      playNotificationSound();

      // Switch modes
      if (mode === "work") {
        // After work session, check if it's time for a long break
        const newCycles = cycles + 1;
        setCycles(newCycles);

        if (newCycles % 4 === 0) {
          setMode("longBreak");
        } else {
          setMode("shortBreak");
        }
      } else {
        // After any break, go back to work mode
        setMode("work");
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, cycles]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(durations[mode]);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-accent/30 dark:from-background dark:via-background dark:to-accent/10">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 dark:opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative max-w-4xl w-full pt-16 pb-6 sm:pt-20 sm:pb-8 z-10">
        <Link href="/" className="absolute top-0 left-4 group">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm bg-white/20 dark:bg-gray-900/30 border border-white/20 dark:border-gray-800/30 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <ArrowLeftIcon className="w-4 h-4 relative z-10 text-primary" />
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary dark:group-hover:text-primary transition-colors">
              Back to Tasks
            </span>
          </div>
        </Link>

        <div className="rounded-2xl border border-border/50 shadow-lg backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 p-6 sm:p-8 animate-slide-in">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary animate-gradient-x">
              Pomodoro Timer
            </h1>

            {/* Mode toggle */}
            <div className="flex space-x-2 mb-8">
              <button
                onClick={() => setMode("work")}
                className={`px-4 py-2 rounded-full text-sm ${
                  mode === "work"
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                Work
              </button>
              <button
                onClick={() => setMode("shortBreak")}
                className={`px-4 py-2 rounded-full text-sm ${
                  mode === "shortBreak"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                Short Break
              </button>
              <button
                onClick={() => setMode("longBreak")}
                className={`px-4 py-2 rounded-full text-sm ${
                  mode === "longBreak"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                Long Break
              </button>
            </div>

            {/* Timer display */}
            <div className="mb-8">
              <div
                className={`text-8xl font-bold text-center ${
                  mode === "work"
                    ? "text-primary"
                    : mode === "shortBreak"
                    ? "text-green-500"
                    : "text-blue-500"
                }`}
              >
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                {mode === "work"
                  ? "Focus Time"
                  : mode === "shortBreak"
                  ? "Short Break"
                  : "Long Break"}
              </div>
            </div>

            {/* Controls */}
            <div className="flex space-x-4">
              <button
                onClick={toggleTimer}
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  isRunning
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-primary hover:bg-primary/90"
                } text-white transition-colors`}
              >
                {isRunning ? (
                  <PauseIcon className="w-6 h-6" />
                ) : (
                  <PlayIcon className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={resetTimer}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Session counter */}
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              Completed work sessions: {cycles}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
