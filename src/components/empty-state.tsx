"use client";

import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface EmptyStateProps {
  filter: "all" | "active" | "completed";
}

export function EmptyState({ filter }: EmptyStateProps) {
  const messages = {
    all: "No tasks yet. Add your first task to get started!",
    active: "No active tasks. All your tasks are completed!",
    completed: "No completed tasks yet. Complete some tasks to see them here!",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{
          delay: 0.2,
          rotate: {
            delay: 0.5,
            duration: 0.5,
            repeat: 2,
            ease: "easeInOut",
          },
        }}
        className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/80 to-blue-600/80 p-0.5 shadow-lg shadow-primary/20 mb-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 opacity-50 rounded-2xl blur-lg"></div>
        <div className="relative h-full w-full bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center">
          <ClipboardDocumentListIcon className="w-10 h-10 text-primary" />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-medium text-gray-700 dark:text-gray-300 max-w-sm"
      >
        {messages[filter]}
      </motion.p>

      {filter === "all" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-accent/50 to-accent/30 rounded-xl text-sm text-gray-600 dark:text-gray-400 shadow-sm border border-border/30"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
              +
            </span>
            <span>Click the + button above to add a new task</span>
          </div>
        </motion.div>
      )}

      <motion.div
        className="w-40 h-1 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-full mt-8"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 160, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </motion.div>
  );
}
