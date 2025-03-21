"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
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

interface TimeReportProps {
  todos: Todo[];
  onClose: () => void;
}

export function TimeReport({ todos, onClose }: TimeReportProps) {
  const [groupBy, setGroupBy] = useState<"task" | "category" | "tag">("task");
  const [timeFrame, setTimeFrame] = useState<
    "all" | "today" | "week" | "month"
  >("all");

  // Format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  // Filter todos based on the selected time frame
  const getFilteredTodos = () => {
    if (timeFrame === "all") return todos;

    const now = new Date();
    const startDate = new Date();

    if (timeFrame === "today") {
      startDate.setHours(0, 0, 0, 0);
    } else if (timeFrame === "week") {
      startDate.setDate(now.getDate() - 7);
    } else if (timeFrame === "month") {
      startDate.setMonth(now.getMonth() - 1);
    }

    return todos.filter((todo) => {
      // For completed todos, check createdAt
      return todo.createdAt >= startDate.getTime();
    });
  };

  // Get data grouped according to the selection
  const getGroupedData = () => {
    const filteredTodos = getFilteredTodos();

    if (groupBy === "task") {
      return filteredTodos
        .filter((todo) => todo.timeTracking.totalSeconds > 0)
        .sort(
          (a, b) => b.timeTracking.totalSeconds - a.timeTracking.totalSeconds
        );
    }

    if (groupBy === "category") {
      const categoryData: Record<string, number> = {};

      filteredTodos.forEach((todo) => {
        if (todo.timeTracking.totalSeconds > 0) {
          const category = todo.category || "Uncategorized";
          if (!categoryData[category]) categoryData[category] = 0;
          categoryData[category] += todo.timeTracking.totalSeconds;
        }
      });

      return Object.entries(categoryData)
        .map(([name, seconds]) => ({ name, seconds }))
        .sort((a, b) => b.seconds - a.seconds);
    }

    if (groupBy === "tag") {
      const tagData: Record<string, number> = {};

      filteredTodos.forEach((todo) => {
        if (todo.timeTracking.totalSeconds > 0) {
          if (todo.tags && todo.tags.length > 0) {
            todo.tags.forEach((tag) => {
              if (!tagData[tag]) tagData[tag] = 0;
              tagData[tag] += todo.timeTracking.totalSeconds;
            });
          } else {
            const untagged = "Untagged";
            if (!tagData[untagged]) tagData[untagged] = 0;
            tagData[untagged] += todo.timeTracking.totalSeconds;
          }
        }
      });

      return Object.entries(tagData)
        .map(([name, seconds]) => ({ name, seconds }))
        .sort((a, b) => b.seconds - a.seconds);
    }

    return [];
  };

  const groupedData = getGroupedData();
  const totalTrackedTime = getFilteredTodos().reduce(
    (total, todo) => total + todo.timeTracking.totalSeconds,
    0
  );

  // Calculate the max value for the progress bars
  const maxSeconds =
    groupedData.length > 0
      ? Math.max(
          ...groupedData.map((item) => ("seconds" in item ? item.seconds : 0))
        )
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Time Tracking Report
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Group by
              </label>
              <select
                value={groupBy}
                onChange={(e) =>
                  setGroupBy(e.target.value as "task" | "category" | "tag")
                }
                className="rounded-lg text-sm px-3 py-2 bg-background border border-border/50 focus:ring-1 focus:ring-primary/20"
              >
                <option value="task">Task</option>
                <option value="category">Category</option>
                <option value="tag">Tag</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Time frame
              </label>
              <select
                value={timeFrame}
                onChange={(e) =>
                  setTimeFrame(
                    e.target.value as "all" | "today" | "week" | "month"
                  )
                }
                className="rounded-lg text-sm px-3 py-2 bg-background border border-border/50 focus:ring-1 focus:ring-primary/20"
              >
                <option value="all">All time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
              </select>
            </div>
          </div>

          {/* Total time summary */}
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
            <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
              Total tracked time
            </h3>
            <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
              {formatTime(totalTrackedTime)}
            </p>
          </div>

          {/* Time distribution */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Time distribution by {groupBy}
            </h3>

            {groupedData.length === 0 ? (
              <p className="text-center py-6 text-gray-500 dark:text-gray-400">
                No time tracking data available for the selected filters.
              </p>
            ) : (
              <div className="space-y-4">
                {groupedData.map((item, index) => {
                  // For task grouping
                  if ("id" in item) {
                    return (
                      <div key={item.id} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium truncate max-w-[70%]">
                            {item.text}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatTime(item.timeTracking.totalSeconds)}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (item.timeTracking.totalSeconds / maxSeconds) *
                                100
                              }%`,
                            }}
                            className="h-full bg-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  }

                  // For category and tag grouping
                  return (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500">
                          {formatTime(item.seconds)}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(item.seconds / maxSeconds) * 100}%`,
                          }}
                          className="h-full bg-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-border/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
