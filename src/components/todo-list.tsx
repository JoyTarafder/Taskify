"use client";

import {
  CheckCircleIcon,
  CheckIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EmptyState } from "./empty-state";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

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

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type, show: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [...prev, todo]);
    setNewTodo("");
    showToast("Added successfully", "success");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
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
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = () => {
    if (!editText.trim() || !editingId) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );

    setEditingId(null);
    setEditText("");
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
    const completedCount = todos.filter((todo) => todo.completed).length;
    setTodos(todos.filter((todo) => !todo.completed));
    if (completedCount > 0) {
      showToast(`${completedCount} task(s) cleared successfully`, "success");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;
  const completedTodoCount = todos.length - activeTodoCount;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, x: 100, scale: 0.8 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 300,
              mass: 0.8,
            }}
            className="fixed top-4 right-4 z-50"
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
                toast.type === "success"
                  ? "bg-gradient-to-br from-green-500/95 via-green-600/95 to-green-700/95 text-white border-green-400/50"
                  : toast.type === "error"
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
                  toast.type === "success"
                    ? "bg-green-400/20 ring-2 ring-green-400/30"
                    : toast.type === "error"
                    ? "bg-red-400/20 ring-2 ring-red-400/30"
                    : "bg-blue-400/20 ring-2 ring-blue-400/30"
                }`}
              >
                {toast.type === "success" ? (
                  <CheckCircleIcon className="w-6 h-6" />
                ) : toast.type === "error" ? (
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
                  {toast.message}
                </span>
                <span className="text-sm opacity-80 font-medium">
                  {toast.type === "success"
                    ? "Task completed successfully"
                    : toast.type === "error"
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
                onClick={() => setToast((prev) => ({ ...prev, show: false }))}
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
                  toast.type === "success"
                    ? "bg-green-500"
                    : toast.type === "error"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 transition-all"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
        </motion.button>
      </form>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            filter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            filter === "active"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            filter === "completed"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Completed
        </motion.button>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredTodos.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <motion.ul className="space-y-2">
            {filteredTodos.map((todo) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="group flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? "bg-primary border-primary"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {todo.completed && (
                    <CheckIcon className="w-4 h-4 text-primary-foreground" />
                  )}
                </motion.button>

                {editingId === todo.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={handleEditKeyDown}
                      autoFocus
                      className="flex-1 px-2 py-1 rounded border border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/30 bg-background/80"
                    />
                    <div className="flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={saveEdit}
                        className="p-1 text-primary hover:text-primary/80"
                      >
                        <CheckIcon className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={cancelEdit}
                        className="p-1 text-muted-foreground hover:text-foreground"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <span
                    className={`flex-1 ${
                      todo.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                )}

                {editingId !== todo.id && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => startEdit(todo)}
                      disabled={todo.completed}
                      className={`p-1 ${
                        todo.completed
                          ? "text-muted-foreground cursor-not-allowed"
                          : "text-primary hover:text-primary/80"
                      }`}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteTodo(todo.id)}
                      className="p-1 text-destructive hover:text-destructive/80"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {todos.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-accent/40 via-accent/30 to-accent/40 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3 text-sm border-t border-border/30">
          <span className="text-gray-500 dark:text-gray-400 px-3 py-1.5 bg-background/50 rounded-full text-xs shadow-sm">
            {activeTodoCount} item{activeTodoCount !== 1 ? "s" : ""} left
          </span>

          {completedTodoCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCompleted}
              className="text-xs px-3 py-1.5 rounded-lg text-secondary hover:bg-secondary/10 transition-all duration-300 shadow-sm"
            >
              Clear completed
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}
