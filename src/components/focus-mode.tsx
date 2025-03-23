"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface FocusModeProps {
  isActive: boolean;
  onToggle: () => void;
}

export const FocusMode: React.FC<FocusModeProps> = ({ isActive, onToggle }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-x-0 top-0 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BoltIcon className="w-6 h-6 text-yellow-300" />
              <span className="font-medium">Focus Mode Active</span>
              <span className="hidden sm:inline text-sm text-white/80">
                Showing only urgent and high priority tasks
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <kbd className="hidden sm:inline-flex px-2 py-1 text-xs font-semibold text-gray-800 bg-white rounded shadow">
                Alt+F
              </kbd>
              <button
                onClick={onToggle}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const FocusModeToggle: React.FC<FocusModeProps> = ({
  isActive,
  onToggle,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            : "bg-secondary hover:bg-secondary/80 text-foreground"
        }`}
      >
        <BoltIcon className={`w-4 h-4 ${isActive ? "text-yellow-300" : ""}`} />
        <span>Focus Mode</span>
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-50"
          >
            Press Alt+F to toggle
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
