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
      className="relative overflow-hidden rounded-full p-3 glass shadow-sm hover:shadow-glow-sm transition-all duration-300"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
        }}
        transition={{
          duration: 0.7,
          type: "spring",
          stiffness: 100,
        }}
        className="relative z-10"
      >
        {theme === "dark" ? (
          <SunIcon className="h-5 w-5 text-amber-500" />
        ) : (
          <MoonIcon className="h-5 w-5 text-indigo-600" />
        )}
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0"
        initial={false}
        animate={{ opacity: theme === "dark" ? 0.3 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}
