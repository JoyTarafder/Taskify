"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative overflow-hidden rounded-full p-2.5 glass border border-gray-200/50 dark:border-gray-700/50 shadow-md transition-all duration-300"
      aria-label="Toggle theme"
    >
      <div className="relative w-7 h-7 flex items-center justify-center">
        {/* Sun Icon */}
        <motion.div
          initial={{
            y: theme === "dark" ? 0 : -30,
            opacity: theme === "dark" ? 1 : 0,
          }}
          animate={{
            y: theme === "dark" ? 0 : -30,
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 180,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          }}
          className="absolute"
        >
          <SunIcon className="h-6 w-6 text-amber-500" />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          initial={{
            y: theme === "dark" ? 30 : 0,
            opacity: theme === "dark" ? 0 : 1,
          }}
          animate={{
            y: theme === "dark" ? 30 : 0,
            opacity: theme === "dark" ? 0 : 1,
            rotate: theme === "dark" ? -180 : 0,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          }}
          className="absolute"
        >
          <MoonIcon className="h-6 w-6 text-indigo-600" />
        </motion.div>
      </div>

      {/* Background gradients */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-100 dark:from-transparent dark:to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: theme === "dark" ? 0 : 0.3 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-blue-800/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: theme === "dark" ? 0.3 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 blur-md rounded-full"
        animate={{
          opacity: [0, 0.5, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          backgroundColor: theme === "dark" ? "#818cf8" : "#fcd34d",
        }}
      />
    </motion.button>
  );
}
