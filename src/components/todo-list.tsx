"use client";

import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EmptyState } from "./empty-state";
import { Toast } from "./toast";

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
      {/* Toast notification using the portal component */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <form onSubmit={addTodo} className="flex gap-2">
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
          type="submit"
          className="btn-primary rounded-xl px-3 sm:px-5 aspect-square sm:aspect-auto"
        >
          <PlusIcon className="w-5 h-5" />
        </motion.button>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilter("all")}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors shadow-sm ${
            filter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All Tasks
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilter("active")}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors shadow-sm ${
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
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors shadow-sm ${
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
          <motion.ul className="space-y-3">
            {filteredTodos.map((todo, index) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl task-card"
              >
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
                  <div className="flex-1 flex items-center gap-2">
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
                ) : (
                  <span
                    className={`flex-1 text-sm sm:text-base ${
                      todo.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                )}

                <div className="flex gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => startEdit(todo)}
                    disabled={todo.completed}
                    className={`p-1 group relative ${
                      todo.completed
                        ? "text-muted-foreground cursor-not-allowed"
                        : "text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg"
                    }`}
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/80 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      Edit
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-lg group relative"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/80 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      Delete
                    </span>
                  </motion.button>
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
      )}
    </div>
  );
}
