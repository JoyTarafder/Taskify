"use client";

import { BookOpenIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

interface DocumentationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Documentation({ isOpen, onClose }: DocumentationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm z-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpenIcon className="w-7 h-7 text-primary" />
                Taskify Documentation
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Getting Started
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Taskify is a powerful yet simple task management app designed
                  to help you organize and track your tasks efficiently. With
                  features like time tracking, priority management, and focus
                  mode, it helps you stay productive and organized.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Adding Tasks
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    There are two ways to add tasks:
                  </p>
                  <ol className="list-decimal pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>
                      <strong>Quick Add:</strong> Simply type your task in the
                      input field and press Enter or click the + button.
                    </li>
                    <li>
                      <strong>Advanced Add:</strong> Click the tag icon to
                      access additional options:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Category: Organize tasks by project or area</li>
                        <li>
                          Priority: Set task importance (High, Medium, Low)
                        </li>
                        <li>Due Date & Time: Set deadlines</li>
                        <li>Reminder: Get notified about upcoming tasks</li>
                        <li>Tags: Add custom labels for better organization</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Task Management
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    Each task card provides several management options:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>
                      <strong>Complete Task:</strong> Click the circle to mark a
                      task as done
                    </li>
                    <li>
                      <strong>Edit Task:</strong> Click the pencil icon to
                      modify task details
                    </li>
                    <li>
                      <strong>Delete Task:</strong> Click the trash icon to
                      remove a task
                    </li>
                    <li>
                      <strong>Time Tracking:</strong>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Click the play button to start tracking time</li>
                        <li>Click the pause button to stop tracking</li>
                        <li>Click the reset button to clear tracked time</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Filtering & Sorting
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    Taskify offers powerful filtering and sorting options:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>
                      <strong>Status Filter:</strong> View All, Active, or
                      Completed tasks
                    </li>
                    <li>
                      <strong>Category Filter:</strong> Filter tasks by their
                      assigned category
                    </li>
                    <li>
                      <strong>Priority Filter:</strong> Show tasks by priority
                      level
                    </li>
                    <li>
                      <strong>Sort Options:</strong>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Default: Original order</li>
                        <li>Due Date: Sort by deadline</li>
                        <li>Priority: Sort by importance</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Focus Mode
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    Focus Mode helps you concentrate on important tasks:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>
                      Shows only high-priority tasks and tasks due within 24
                      hours
                    </li>
                    <li>Activates a clean, distraction-free interface</li>
                    <li>
                      Tasks are highlighted with a red border for emphasis
                    </li>
                    <li>
                      Can be toggled with the Focus Mode button or keyboard
                      shortcut
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Keyboard Shortcuts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      General
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          Ctrl+F
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Toggle Focus Mode
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          Enter
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Add/Edit task
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          Escape
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Cancel editing
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Task Management
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          Space
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Toggle task completion
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          Delete
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Delete selected task
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Time Tracking
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    Track time spent on tasks with built-in timer functionality:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Start/stop timer with play/pause buttons</li>
                    <li>Reset timer to zero when needed</li>
                    <li>View total time spent on each task</li>
                    <li>See cumulative time tracking in the footer</li>
                    <li>
                      Timer continues running even when switching between tasks
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Detailed Documentation Section */}
            <div className="px-8 pb-8 pt-4 space-y-8 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 flex-grow"></div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Tips for using Taskify
                </h2>
                <div className="h-0.5 bg-gradient-to-r from-purple-600 to-indigo-500 flex-grow"></div>
              </div>

              <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Advanced Task Properties
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Categories
                  </h4>
                  <p>
                    Categories help you organize tasks by project, area of
                    responsibility, or any grouping that makes sense for your
                    workflow. Consider using categories like:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Work:</strong> Professional tasks and projects
                    </li>
                    <li>
                      <strong>Personal:</strong> Non-work related items
                    </li>
                    <li>
                      <strong>Health:</strong> Exercise, nutrition, medical
                      appointments
                    </li>
                    <li>
                      <strong>Finance:</strong> Bills, budgeting, investments
                    </li>
                    <li>
                      <strong>Learning:</strong> Educational activities and
                      courses
                    </li>
                  </ul>
                  <p className="mt-2">
                    You can filter your tasks by category using the category
                    dropdown in the filter section.
                  </p>
                </div>
              </div>

              <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Time Management Techniques
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    Taskify&apos;s time tracking features can be combined with
                    popular time management techniques:
                  </p>
                  <h4 className="font-medium text-gray-900 dark:text-white mt-3">
                    Pomodoro Technique
                  </h4>
                  <p>
                    Work in focused 25-minute intervals (pomodoros) with
                    5-minute breaks between them:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Choose a task and start the timer</li>
                    <li>Work on the task until the timer rings (25 minutes)</li>
                    <li>Take a short break (5 minutes)</li>
                    <li>
                      After 4 pomodoros, take a longer break (15-30 minutes)
                    </li>
                  </ol>

                  <h4 className="font-medium text-gray-900 dark:text-white mt-3">
                    Time Blocking
                  </h4>
                  <p>Dedicate specific time blocks to categories of work:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Group similar tasks together by category</li>
                    <li>
                      Assign specific time blocks to work on each category
                    </li>
                    <li>
                      Use the time tracking feature to ensure you&apos;re
                      sticking to your blocks
                    </li>
                  </ol>
                </div>
              </div>

              <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Productivity Tips
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    Here are some tips to maximize your productivity with
                    Taskify:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>2-Minute Rule:</strong> If a task takes less than
                      2 minutes, do it immediately rather than adding it to your
                      list
                    </li>
                    <li>
                      <strong>Task Batching:</strong> Group similar tasks
                      together and complete them in one session to reduce
                      context switching
                    </li>
                    <li>
                      <strong>Most Important Task (MIT):</strong> Identify 1-3
                      MITs each day and complete them before moving to less
                      important tasks
                    </li>
                    <li>
                      <strong>ABCDE Method:</strong> Prioritize tasks by
                      assigning letters:
                      <ul className="list-disc pl-5 mt-1">
                        <li>A: Tasks that are urgent and important</li>
                        <li>B: Tasks that are important but not urgent</li>
                        <li>C: Tasks that are nice to do but not important</li>
                        <li>D: Tasks that can be delegated</li>
                        <li>E: Tasks that can be eliminated</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  Advanced Filtering Strategies
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    Create your own custom workflows by combining Taskify&apos;s
                    filtering and sorting options:
                  </p>
                  <h4 className="font-medium text-gray-900 dark:text-white mt-3">
                    Morning Planning Routine
                  </h4>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Sort by due date to see what&apos;s due today</li>
                    <li>Filter by high priority to identify critical tasks</li>
                    <li>Plan your day based on these insights</li>
                  </ol>

                  <h4 className="font-medium text-gray-900 dark:text-white mt-3">
                    Weekly Review
                  </h4>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>View all tasks (completed and active)</li>
                    <li>
                      Check time reports for insights on how you spent your time
                    </li>
                    <li>
                      Plan the upcoming week based on remaining and new tasks
                    </li>
                    <li>Clear completed tasks after review</li>
                  </ol>
                </div>
              </div>
              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
