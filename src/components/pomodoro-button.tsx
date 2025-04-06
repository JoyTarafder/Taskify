"use client";

import { ClockIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PomodoroButton() {
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  // Initialize position from localStorage or default to bottom right
  useEffect(() => {
    const savedPosition = localStorage.getItem("pomodoroButtonPosition");
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    } else {
      // Default position - bottom right
      setPosition({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
    }
  }, []);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    if (position.x !== 0 && position.y !== 0) {
      localStorage.setItem("pomodoroButtonPosition", JSON.stringify(position));
    }
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartDragPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleClick = () => {
    if (!isDragging) {
      router.push("/pomodoro");
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - startDragPosition.x;
        const newY = e.clientY - startDragPosition.y;

        // Keep button within viewport bounds
        const buttonWidth = 56; // Button width in pixels
        const buttonHeight = 56; // Button height in pixels

        const boundedX = Math.max(
          0,
          Math.min(window.innerWidth - buttonWidth, newX)
        );
        const boundedY = Math.max(
          0,
          Math.min(window.innerHeight - buttonHeight, newY)
        );

        setPosition({ x: boundedX, y: boundedY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startDragPosition]);

  return (
    <div
      className={`fixed z-50 transition-transform duration-200 ${
        hover ? "scale-110" : "scale-100"
      } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(0, 0)`,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-sm opacity-70 group-hover:opacity-100"></div>
        <button
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
          title="Pomodoro Timer"
        >
          <ClockIcon className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
