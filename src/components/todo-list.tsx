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
import { EmptyState } from "./empty-state";
import { Toast } from "./toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category: string;
  priority: "low" | "medium" | "high" | "none";
  dueDate: string | null;
  tags: string[];
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPriority, setEditPriority] = useState<
    "low" | "medium" | "high" | "none"
  >("none");
  const [editDueDate, setEditDueDate] = useState<string>("");
  const [editTags, setEditTags] = useState<string>("");
  const [showAdvancedAdd, setShowAdvancedAdd] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newPriority, setNewPriority] = useState<
    "low" | "medium" | "high" | "none"
  >("none");
  const [newDueDate, setNewDueDate] = useState("");
  const [newTags, setNewTags] = useState("");

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
      category: newCategory,
      priority: newPriority,
      dueDate: newDueDate || null,
      tags: newTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    setTodos((prev) => [...prev, todo]);
    setNewTodo("");
    // Don't reset advanced fields if the user wants to add multiple tasks with similar properties
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
    setEditCategory(todo.category || "");
    setEditPriority(todo.priority || "none");
    setEditDueDate(todo.dueDate || "");
    setEditTags(todo.tags?.join(", ") || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditCategory("");
    setEditPriority("none");
    setEditDueDate("");
    setEditTags("");
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
              tags: editTags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== ""),
            }
          : todo
      )
    );

    setEditingId(null);
    setEditText("");
    setEditCategory("");
    setEditPriority("none");
    setEditDueDate("");
    setEditTags("");
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

  // Get all unique categories from todos
  const categories = [
    "all",
    ...new Set(todos.map((todo) => todo.category).filter(Boolean)),
  ];

  const filteredTodos = todos.filter((todo) => {
    // Status filter (all, active, completed)
    const statusMatch =
      filter === "all"
        ? true
        : filter === "active"
        ? !todo.completed
        : todo.completed;

    // Category filter
    const categoryMatch =
      categoryFilter === "all" ? true : todo.category === categoryFilter;

    // Priority filter
    const priorityMatch =
      priorityFilter === "all" ? true : todo.priority === priorityFilter;

    return statusMatch && categoryMatch && priorityMatch;
  });

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;
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

  // Helper function to check if a date is past due
  const isPastDue = (dateString: string | null) => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  return (
    <div className="space-y-6">
      {/* Toast notification using the portal component */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

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
      <div className="flex flex-wrap gap-2 mt-4">
        {/* Status filter */}
        <div className="flex gap-1 rounded-lg bg-secondary/50 p-0.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter("all")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors ${
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter("active")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors ${
              filter === "active"
                ? "bg-primary text-primary-foreground"
                : "text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Active
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter("completed")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors ${
              filter === "completed"
                ? "bg-primary text-primary-foreground"
                : "text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Completed
          </motion.button>
        </div>

        {/* Category filter - only show if there are categories */}
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
                className="group flex flex-col rounded-xl task-card overflow-hidden"
              >
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
                        todo.tags?.length > 0) && (
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
                                isPastDue(todo.dueDate)
                                  ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              <CalendarIcon className="w-3 h-3" />
                              {formatDate(todo.dueDate)}
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
