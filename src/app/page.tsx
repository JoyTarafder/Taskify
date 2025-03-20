import { ThemeToggle } from "@/components/theme-toggle";
import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-accent dark:from-background dark:via-background dark:to-accent">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent opacity-50 pointer-events-none"></div>
      <div className="absolute h-32 w-32 rounded-full bg-secondary/10 blur-3xl top-1/4 right-1/4 animate-float"></div>
      <div
        className="absolute h-48 w-48 rounded-full bg-primary/10 blur-3xl bottom-1/4 left-1/4 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto px-4 relative max-w-4xl w-full py-8">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="animate-fade-in text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
              Taskify
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg max-w-md">
              A beautiful way to organize your tasks
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass px-4 py-3 rounded-xl border border-border shadow-sm animate-float">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-success animate-pulse-slow"></span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your tasks are saved locally
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="animate-slide-in max-w-xl mx-auto">
          <TodoList />
        </div>

        <footer className="mt-16 text-center">
          <div className="glass py-3 px-6 rounded-full inline-block text-sm text-gray-500 dark:text-gray-400">
            Built with ❤️ using Next.js and Tailwind CSS
          </div>
        </footer>
      </div>
    </main>
  );
}
