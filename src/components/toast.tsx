"use client";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ToastProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export function Toast({ show, message, type, onClose }: ToastProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      if (show) onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  // Only render on client side
  if (!mounted) return null;

  const container = document.getElementById("notifications-container");

  // If the container element doesn't exist yet, don't render
  if (!container) return null;

  // Create portal to the notification container
  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, x: 20, scale: 0.9 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 300,
            mass: 0.8,
          }}
          className="pointer-events-auto"
          style={{ pointerEvents: "auto" }}
        >
          <motion.div
            initial={{ rotateX: -90 }}
            animate={{ rotateX: 0 }}
            transition={{
              delay: 0.1,
              type: "spring",
              damping: 15,
              stiffness: 300,
            }}
            className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border transform-gpu overflow-hidden ${
              type === "success"
                ? "bg-gradient-to-br from-green-500/95 via-green-600/95 to-green-700/95 text-white border-green-400/50"
                : type === "error"
                ? "bg-gradient-to-br from-red-500/95 via-red-600/95 to-red-700/95 text-white border-red-400/50"
                : "bg-gradient-to-br from-blue-500/95 via-blue-600/95 to-blue-700/95 text-white border-blue-400/50"
            }`}
          >
            {/* Progress Bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-2xl"
            />

            {/* Icon Container */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                damping: 15,
                stiffness: 300,
              }}
              className={`p-2.5 rounded-full ${
                type === "success"
                  ? "bg-green-400/20 ring-2 ring-green-400/30"
                  : type === "error"
                  ? "bg-red-400/20 ring-2 ring-red-400/30"
                  : "bg-blue-400/20 ring-2 ring-blue-400/30"
              }`}
            >
              {type === "success" ? (
                <CheckCircleIcon className="w-6 h-6" />
              ) : type === "error" ? (
                <ExclamationCircleIcon className="w-6 h-6" />
              ) : (
                <InformationCircleIcon className="w-6 h-6" />
              )}
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3,
                type: "spring",
                damping: 15,
                stiffness: 300,
              }}
              className="flex flex-col"
            >
              <span className="font-semibold text-lg tracking-tight">
                {message}
              </span>
              <span className="text-sm opacity-80 font-medium">
                {type === "success"
                  ? "Task completed successfully"
                  : type === "error"
                  ? "Task removed from list"
                  : "Task updated successfully"}
              </span>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                delay: 0.4,
                type: "spring",
                damping: 15,
                stiffness: 300,
              }}
              onClick={onClose}
              className="absolute top-2 right-2 p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </motion.button>

            {/* Shine Effect */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            />

            {/* Glow Effect */}
            <div
              className={`absolute inset-0 opacity-20 blur-xl pointer-events-none ${
                type === "success"
                  ? "bg-green-500"
                  : type === "error"
                  ? "bg-red-500"
                  : "bg-blue-500"
              }`}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    container
  );
}
