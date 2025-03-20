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
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
      >
        <ClipboardDocumentListIcon className="w-8 h-8 text-primary" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-muted-foreground max-w-sm"
      >
        {messages[filter]}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-sm text-muted-foreground/60"
      >
        {filter === "all" && "Click the + button above to add a new task"}
      </motion.div>
    </motion.div>
  );
}
