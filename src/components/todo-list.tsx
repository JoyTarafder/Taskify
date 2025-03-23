"use client";

import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  CalendarIcon,
  FlagIcon,
  PencilSquareIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DashboardStats } from "./dashboard-stats";
import { EmptyState } from "./empty-state";
import { FocusMode, FocusModeToggle } from "./focus-mode";
import { TimeReport } from "./time-report";
import { Toast } from "./toast";

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

interface Toast {
  message: string;
  type: "success" | "error" | "info";
  show: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [toast, setToast] = useState<Toast>({
    message: "",
    type: "success",
    show: false,
  });
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"default" | "dueDate" | "priority">(
    "default"
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPriority, setEditPriority] = useState<
    "low" | "medium" | "high" | "none"
  >("none");
  const [editDueDate, setEditDueDate] = useState<string>("");
  const [editDueTime, setEditDueTime] = useState<string>("");
  const [editTags, setEditTags] = useState<string>("");
  const [editReminder, setEditReminder] = useState(false);
  const [showAdvancedAdd, setShowAdvancedAdd] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newPriority, setNewPriority] = useState<
    "low" | "medium" | "high" | "none"
  >("none");
  const [newDueDate, setNewDueDate] = useState("");
  const [newDueTime, setNewDueTime] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newReminder, setNewReminder] = useState(false);
  const [showTimeReport, setShowTimeReport] = useState(false);
  const [focusModeActive, setFocusModeActive] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add keyboard shortcut for focus mode (F key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+F for focus mode toggle
      if (e.altKey && e.key === "f") {
        toggleFocusMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Don't include toggleFocusMode in dependencies to avoid circular reference

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type, show: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      status: "todo",
      createdAt: Date.now(),
      category: newCategory,
      priority: newPriority,
      dueDate: newDueDate || null,
      dueTime: newDueTime || null,
      reminder: newReminder,
      tags: newTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      timeTracking: {
        totalSeconds: 0,
        isRunning: false,
        lastStartTime: null,
      },
    };

    setTodos((prev) => [...prev, todo]);
    setNewTodo("");
    // Don't reset advanced fields if the user wants to add multiple tasks with similar properties
    showToast("Added successfully", "success");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              status: !todo.completed ? "done" : "todo",
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    showToast("Deleted successfully", "error");
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditCategory(todo.category || "");
    setEditPriority(todo.priority || "none");
    setEditDueDate(todo.dueDate || "");
    setEditDueTime(todo.dueTime || "");
    setEditTags(todo.tags?.join(", ") || "");
    setEditReminder(todo.reminder || false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditCategory("");
    setEditPriority("none");
    setEditDueDate("");
    setEditDueTime("");
    setEditTags("");
    setEditReminder(false);
  };

  const saveEdit = () => {
    if (!editText.trim() || !editingId) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId
          ? {
              ...todo,
              text: editText.trim(),
              category: editCategory,
              priority: editPriority,
              dueDate: editDueDate || null,
              dueTime: editDueTime || null,
              tags: editTags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== ""),
              reminder: editReminder,
              status: todo.completed ? "done" : "todo",
            }
          : todo
      )
    );

    setEditingId(null);
    setEditText("");
    setEditCategory("");
    setEditPriority("none");
    setEditDueDate("");
    setEditDueTime("");
    setEditTags("");
    setEditReminder(false);
    showToast("Edited successfully", "info");
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const clearCompleted = () => {
    // Count based on completed status or status==="done"
    const completedCount = todos.filter(
      (todo) => todo.completed || todo.status === "done"
    ).length;

    // Filter out completed todos
    setTodos(todos.filter((todo) => !todo.completed && todo.status !== "done"));

    if (completedCount > 0) {
      showToast(`${completedCount} task(s) cleared successfully`, "success");
    }
  };

  // Get all unique categories from todos
  const categories = [
    "all",
    ...new Set(todos.map((todo) => todo.category).filter(Boolean)),
  ];

  // Sort and filter todos
  const getFilteredAndSortedTodos = () => {
    // First filter the todos
    const filtered = todos.filter((todo) => {
      // Status filter (all, active, completed)
      const statusMatch =
        filter === "all"
          ? true
          : filter === "active"
          ? !todo.completed && todo.status !== "done"
          : todo.completed || todo.status === "done";

      // Category filter
      const categoryMatch =
        categoryFilter === "all" ? true : todo.category === categoryFilter;

      // Priority filter
      const priorityMatch =
        priorityFilter === "all" ? true : todo.priority === priorityFilter;

      // Focus mode filter (if active, only show high priority tasks and tasks due soon)
      const focusModeMatch = focusModeActive
        ? todo.priority === "high" || isDueSoon(todo.dueDate, todo.dueTime)
        : true;

      return statusMatch && categoryMatch && priorityMatch && focusModeMatch;
    });

    // Then sort the filtered results
    if (sortBy === "dueDate") {
      return [...filtered].sort((a, b) => {
        // Todos without due dates go at the end
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);

        // Set time if available
        if (a.dueTime) {
          const [hoursA, minutesA] = a.dueTime.split(":").map(Number);
          dateA.setHours(hoursA, minutesA, 0, 0);
        }
        if (b.dueTime) {
          const [hoursB, minutesB] = b.dueTime.split(":").map(Number);
          dateB.setHours(hoursB, minutesB, 0, 0);
        }

        return dateA.getTime() - dateB.getTime();
      });
    } else if (sortBy === "priority") {
      // Priority sort: high -> medium -> low -> none
      return [...filtered].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }

    // Default sort: as is
    return filtered;
  };

  const filteredTodos = getFilteredAndSortedTodos();

  const activeTodoCount = todos.filter(
    (todo) => !todo.completed && todo.status !== "done"
  ).length;
  const completedTodoCount = todos.length - activeTodoCount;

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-50 dark:bg-red-900/20";
      case "medium":
        return "text-orange-500 bg-orange-50 dark:bg-orange-900/20";
      case "low":
        return "text-blue-500 bg-blue-50 dark:bg-blue-900/20";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-800/40";
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to format combined date and time
  const formatDateTime = (
    dateString: string | null,
    timeString: string | null
  ) => {
    if (!dateString) return timeString || null;
    if (!timeString) return formatDate(dateString);

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });

    return `${formattedDate} at ${timeString}`;
  };

  // Helper function to get due status
  const getDueStatus = (
    dateString: string | null,
    timeString: string | null = null
  ) => {
    if (!dateString) return "none";

    const now = new Date();
    const dueDate = new Date(dateString);

    // Set time if available
    if (timeString) {
      const [hours, minutes] = timeString.split(":").map(Number);
      dueDate.setHours(hours, minutes, 0, 0);
    } else {
      // If no time, set to end of day
      dueDate.setHours(23, 59, 59, 999);
    }

    // Check if it's already overdue
    if (dueDate < now) return "overdue";

    // Check if it's due today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (dueDate >= today && dueDate < tomorrow) return "today";

    // Check if it's due within the next 3 days
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    if (dueDate < threeDaysFromNow) return "upcoming";

    return "future";
  };

  // Helper to check if a task is due soon (within 24 hours)
  const isDueSoon = (dateString: string | null, timeString: string | null) => {
    if (!dateString) return false;

    const now = new Date();
    const dueDate = new Date(dateString);

    if (timeString) {
      const [hours, minutes] = timeString.split(":").map(Number);
      dueDate.setHours(hours, minutes, 0, 0);
    } else {
      dueDate.setHours(23, 59, 59, 999); // End of day
    }

    // Calculate difference in hours
    const diffMs = dueDate.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours >= 0 && diffHours <= 24;
  };

  // Function to start tracking time for a task
  const startTimeTracking = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              timeTracking: {
                ...todo.timeTracking,
                isRunning: true,
                lastStartTime: Date.now(),
              },
            }
          : todo
      )
    );
    showToast("Timer started", "info");
  };

  // Function to stop tracking time for a task
  const stopTimeTracking = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (
          todo.id === id &&
          todo.timeTracking.isRunning &&
          todo.timeTracking.lastStartTime
        ) {
          const elapsedSeconds = Math.floor(
            (Date.now() - todo.timeTracking.lastStartTime) / 1000
          );
          return {
            ...todo,
            timeTracking: {
              totalSeconds: todo.timeTracking.totalSeconds + elapsedSeconds,
              isRunning: false,
              lastStartTime: null,
            },
          };
        }
        return todo;
      })
    );
    showToast("Timer stopped", "info");
  };

  // Function to reset time tracking for a task
  const resetTimeTracking = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              timeTracking: {
                totalSeconds: 0,
                isRunning: false,
                lastStartTime: null,
              },
            }
          : todo
      )
    );
    showToast("Timer reset", "info");
  };

  // Update running timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.timeTracking.isRunning && todo.timeTracking.lastStartTime) {
            const elapsedSeconds = Math.floor(
              (Date.now() - todo.timeTracking.lastStartTime) / 1000
            );
            return {
              ...todo,
              timeTracking: {
                totalSeconds: todo.timeTracking.totalSeconds + elapsedSeconds,
                isRunning: true,
                lastStartTime: Date.now(),
              },
            };
          }
          return todo;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  // Toggle focus mode
  const toggleFocusMode = () => {
    setFocusModeActive(!focusModeActive);

    if (!focusModeActive) {
      showToast(
        "Focus mode activated (Alt+F to toggle) - showing only urgent tasks",
        "info"
      );
    } else {
      showToast("Focus mode deactivated", "info");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Taskify
      </h1> */}

      <FocusMode isActive={focusModeActive} onToggle={toggleFocusMode} />

      <Toast
        message={toast.message}
        show={toast.show}
        type={toast.type}
        onClose={hideToast}
      />

      {/* Dashboard stats - hidden in focus mode */}
      <DashboardStats todos={todos} visible={!focusModeActive} />

      <form onSubmit={addTodo} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 transition-all shadow-sm placeholder:text-gray-400 text-sm sm:text-base"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setShowAdvancedAdd(!showAdvancedAdd)}
            className="rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors shadow-sm"
          >
            <TagIcon className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn-primary rounded-xl px-3 sm:px-5 aspect-square sm:aspect-auto"
          >
            <PlusIcon className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Advanced options */}
        <AnimatePresence>
          {showAdvancedAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2"
            >
              {/* Category */}
              <div className="space-y-1">
                <label
                  htmlFor="category"
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  list="category-options"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add category"
                  className="w-full px-3 py-2 rounded-lg border border-border/50 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-primary/20 text-sm"
                />
                <datalist id="category-options">
                  {categories
                    .filter((c) => c !== "all")
                    .map((category) => (
                      <option key={category} value={category} />
                    ))}
                </datalist>
              </div>

              {/* Priority */}
              <div className="space-y-1">
                <label
                  htmlFor="priority"
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  value={newPriority}
                  onChange={(e) =>
                    setNewPriority(
                      e.target.value as "low" | "medium" | "high" | "none"
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border/50 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-primary/20 text-sm"
                >
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Due Date */}
              <div className="space-y-1">
                <label
                  htmlFor="dueDate"
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 rounded-lg border border-border/50 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-primary/20 text-sm"
                />
              </div>

              {/* Due Time */}
              <div className="space-y-1">
                <label
                  htmlFor="dueTime"
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  Due Time
                </label>
                <input
                  type="time"
                  id="dueTime"
                  value={newDueTime}
                  onChange={(e) => setNewDueTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border/50 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-primary/20 text-sm"
                />
              </div>

              {/* Reminder */}
              <div className="space-y-1 flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newReminder}
                    onChange={(e) => setNewReminder(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Set reminder
                  </span>
                </label>
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label
                  htmlFor="tags"
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="work, personal, etc"
                  className="w-full px-3 py-2 rounded-lg border border-border/50 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-primary/20 text-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-6">
        {/* Task filter controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-3 py-1.5 text-xs sm:text-sm ${
              filter === "all"
                ? "bg-primary/10 text-primary font-medium"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`rounded-full px-3 py-1.5 text-xs sm:text-sm ${
              filter === "active"
                ? "bg-primary/10 text-primary font-medium"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`rounded-full px-3 py-1.5 text-xs sm:text-sm ${
              filter === "completed"
                ? "bg-primary/10 text-primary font-medium"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Focus mode toggle */}
        <FocusModeToggle
          isActive={focusModeActive}
          onToggle={toggleFocusMode}
        />
      </div>

      {/* Advanced filter controls - hidden in focus mode */}
      {!focusModeActive && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          {/* Category filter */}
          {categories.length > 1 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary/50 border-none focus:ring-1 focus:ring-primary/20"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          )}

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-lg text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary/50 border-none focus:ring-1 focus:ring-primary/20"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
            <option value="none">No Priority</option>
          </select>

          {/* Sort by selector */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "default" | "dueDate" | "priority")
            }
            className="rounded-lg text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 bg-secondary/50 border-none focus:ring-1 focus:ring-primary/20 ml-auto"
          >
            <option value="default">Default Sort</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {filteredTodos.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <motion.ul className="space-y-3">
            {filteredTodos.map((todo, index) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className={`group flex flex-col rounded-xl task-card overflow-hidden relative ${
                  focusModeActive &&
                  (todo.priority === "high" ||
                    isDueSoon(todo.dueDate, todo.dueTime))
                    ? "ring-2 ring-red-500 dark:ring-red-600 shadow-lg"
                    : ""
                }`}
              >
                {/* Focus mode indicator badge */}
                {focusModeActive && (
                  <div className="absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                    {todo.priority === "high" ? "High Priority" : "Due Soon"}
                  </div>
                )}

                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? "bg-primary border-primary shadow-sm shadow-primary/20"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {todo.completed && (
                      <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                    )}
                  </motion.button>

                  {editingId === todo.id ? (
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={handleEditKeyDown}
                          autoFocus
                          className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/30 bg-background/80 text-sm"
                        />
                        <div className="flex gap-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={saveEdit}
                            className="p-1.5 text-primary hover:text-primary/80 bg-primary/10 rounded-lg"
                          >
                            <CheckIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={cancelEdit}
                            className="p-1.5 text-muted-foreground hover:text-foreground bg-secondary/50 rounded-lg"
                          >
                            <XMarkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 px-1">
                        {/* Category */}
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500 dark:text-gray-400">
                            Category
                          </label>
                          <input
                            type="text"
                            list="edit-category-options"
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            placeholder="Add category"
                            className="w-full px-2 py-1 rounded-md border border-border/50 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-primary/20 text-xs"
                          />
                          <datalist id="edit-category-options">
                            {categories
                              .filter((c) => c !== "all")
                              .map((category) => (
                                <option key={category} value={category} />
                              ))}
                          </datalist>
                        </div>

                        {/* Priority */}
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500 dark:text-gray-400">
                            Priority
                          </label>
                          <select
                            value={editPriority}
                            onChange={(e) =>
                              setEditPriority(
                                e.target.value as
                                  | "low"
                                  | "medium"
                                  | "high"
                                  | "none"
                              )
                            }
                            className="w-full px-2 py-1 rounded-md border border-border/50 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-primary/20 text-xs"
                          >
                            <option value="none">None</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>

                        {/* Due Date */}
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500 dark:text-gray-400">
                            Due Date
                          </label>
                          <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="w-full px-2 py-1 rounded-md border border-border/50 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-primary/20 text-xs"
                          />
                        </div>

                        {/* Due Time */}
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500 dark:text-gray-400">
                            Due Time
                          </label>
                          <input
                            type="time"
                            value={editDueTime}
                            onChange={(e) => setEditDueTime(e.target.value)}
                            className="w-full px-2 py-1 rounded-md border border-border/50 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-primary/20 text-xs"
                          />
                        </div>

                        {/* Reminder */}
                        <div className="space-y-1 flex items-end">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editReminder}
                              onChange={(e) =>
                                setEditReminder(e.target.checked)
                              }
                              className="rounded border-gray-300 text-primary focus:ring-primary/20"
                            />
                            <span className="text-xs text-gray-700 dark:text-gray-300">
                              Set reminder
                            </span>
                          </label>
                        </div>

                        {/* Tags */}
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500 dark:text-gray-400">
                            Tags (comma separated)
                          </label>
                          <input
                            type="text"
                            value={editTags}
                            onChange={(e) => setEditTags(e.target.value)}
                            placeholder="work, personal"
                            className="w-full px-2 py-1 rounded-md border border-border/50 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-primary/20 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col">
                      <span
                        className={`text-sm sm:text-base ${
                          todo.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {todo.text}
                      </span>

                      {/* Task metadata row */}
                      {(todo.category ||
                        todo.priority !== "none" ||
                        todo.dueDate ||
                        todo.dueTime ||
                        todo.reminder ||
                        todo.tags?.length > 0 ||
                        todo.timeTracking.totalSeconds > 0 ||
                        todo.timeTracking.isRunning) && (
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {/* Category */}
                          {todo.category && (
                            <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary/90">
                              {todo.category}
                            </div>
                          )}

                          {/* Priority */}
                          {todo.priority !== "none" && (
                            <div
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getPriorityColor(
                                todo.priority
                              )}`}
                            >
                              <FlagIcon className="w-3 h-3" />
                              {todo.priority}
                            </div>
                          )}

                          {/* Due date */}
                          {todo.dueDate && (
                            <div
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                                getDueStatus(todo.dueDate, todo.dueTime) ===
                                "overdue"
                                  ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                                  : getDueStatus(todo.dueDate, todo.dueTime) ===
                                    "today"
                                  ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              <CalendarIcon className="w-3 h-3" />
                              {formatDateTime(todo.dueDate, todo.dueTime)}
                            </div>
                          )}

                          {/* Reminder indicator */}
                          {todo.reminder && (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                              </svg>
                              <span>Reminder</span>
                            </div>
                          )}

                          {/* Tags */}
                          {todo.tags?.map((tag) => (
                            <div
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            >
                              #{tag}
                            </div>
                          ))}

                          {/* Time tracking */}
                          {(todo.timeTracking.totalSeconds > 0 ||
                            todo.timeTracking.isRunning) && (
                            <div
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                                todo.timeTracking.isRunning
                                  ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 animate-pulse"
                                  : "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
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
                              {formatTime(todo.timeTracking.totalSeconds)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-1.5 sm:gap-2 transition-opacity">
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(var(--primary-rgb), 0.2)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => startEdit(todo)}
                      disabled={todo.completed}
                      className={`p-1.5 sm:p-2 group relative rounded-lg transition-colors ${
                        todo.completed
                          ? "text-muted-foreground cursor-not-allowed"
                          : "text-primary hover:text-primary bg-primary/5"
                      }`}
                    >
                      <PencilSquareIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>

                    {/* Time tracking controls */}
                    {!todo.completed &&
                      (todo.timeTracking.isRunning ? (
                        <motion.button
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(239, 68, 68, 0.2)",
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => stopTimeTracking(todo.id)}
                          className="p-1.5 sm:p-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(16, 185, 129, 0.2)",
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => startTimeTracking(todo.id)}
                          className="p-1.5 sm:p-2 text-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </motion.button>
                      ))}

                    {/* Reset timer button - only show if there's time tracked */}
                    {todo.timeTracking.totalSeconds > 0 && (
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(107, 114, 128, 0.2)",
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => resetTimeTracking(todo.id)}
                        className="p-1.5 sm:p-2 text-gray-500 bg-gray-50 dark:text-gray-400 dark:bg-gray-800/40 rounded-lg transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(var(--destructive-rgb), 0.2)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteTodo(todo.id)}
                      className="p-1.5 sm:p-2 text-destructive bg-destructive/5 rounded-lg group relative transition-colors"
                    >
                      <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {todos.length > 0 && (
        <div className="p-3 sm:p-5 bg-gradient-to-r from-accent/40 via-accent/30 to-accent/40 backdrop-blur-sm flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-sm border-t border-border/30 rounded-xl mt-6 sm:mt-8">
          <span className="text-gray-600 dark:text-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 bg-background/50 rounded-lg text-xs sm:text-sm shadow-sm font-medium">
            {activeTodoCount} task{activeTodoCount !== 1 ? "s" : ""} left
          </span>

          <div className="flex gap-2">
            {/* Time tracking statistics */}
            {todos.some(
              (todo) =>
                todo.timeTracking.totalSeconds > 0 ||
                todo.timeTracking.isRunning
            ) && (
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg text-xs sm:text-sm shadow-sm flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
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
                <span>
                  Total:{" "}
                  {formatTime(
                    todos.reduce(
                      (acc, todo) => acc + todo.timeTracking.totalSeconds,
                      0
                    )
                  )}
                </span>
              </div>
            )}

            {completedTodoCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCompleted}
                className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/20 dark:bg-gray-700/30 hover:bg-red-500/10 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 shadow-sm"
              >
                Clear completed
              </motion.button>
            )}
          </div>
        </div>
      )}

      {showTimeReport && (
        <TimeReport todos={todos} onClose={() => setShowTimeReport(false)} />
      )}
    </div>
  );
}
