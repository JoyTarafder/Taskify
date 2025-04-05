"use client";

import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  status: string;
  createdAt: number;
  category: string;
  priority: "low" | "medium" | "high" | "none";
  dueDate: string | null;
  dueTime: string | null;
  reminder: boolean;
  tags: string[];
  timeTracking: {
    totalSeconds: number;
    isRunning: boolean;
    lastStartTime: number | null;
  };
}

interface DashboardStatsProps {
  todos: Todo[];
  visible: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  todos,
  visible,
}) => {
  if (!visible) return null;

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.filter((todo) => !todo.completed).length;
  const highPriorityCount = todos.filter(
    (todo) => todo.priority === "high" && !todo.completed
  ).length;

  // Get due soon count (tasks due within 24 hours)
  const dueSoonCount = todos.filter((todo) => {
    if (!todo.dueDate || todo.completed) return false;

    const now = new Date();
    const dueDate = new Date(todo.dueDate);

    if (todo.dueTime) {
      const [hours, minutes] = todo.dueTime.split(":").map(Number);
      dueDate.setHours(hours, minutes, 0, 0);
    } else {
      dueDate.setHours(23, 59, 59, 999);
    }

    const diffMs = dueDate.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours >= 0 && diffHours <= 24;
  }).length;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 shadow-sm border border-green-100 dark:border-emerald-800/30">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
                Completed
              </h3>
              <CheckCircleIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mt-2">
              {completedCount}
              <span className="text-sm font-normal text-emerald-700 dark:text-emerald-400 ml-1">
                / {todos.length}
              </span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900/20 dark:to-sky-800/20 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400">
                Pending
              </h3>
              <ClockIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-300 mt-2">
              {pendingCount}
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-800/20 rounded-xl p-4 shadow-sm border border-red-100 dark:border-red-800/30">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                High Priority
              </h3>
              <ExclamationCircleIcon className="w-5 h-5 text-red-600 dark:text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-900 dark:text-red-300 mt-2">
              {highPriorityCount}
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20 rounded-xl p-4 shadow-sm border border-amber-100 dark:border-amber-800/30">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400">
                Due Soon
              </h3>
              <CalendarIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-amber-900 dark:text-amber-300 mt-2">
              {dueSoonCount}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
