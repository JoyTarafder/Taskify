import { ThemeToggle } from "@/components/theme-toggle";
import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-accent/30 dark:from-background dark:via-background dark:to-accent/10">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 dark:opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent opacity-50 pointer-events-none"></div>

      {/* Floating elements */}
      <div className="absolute h-32 w-32 rounded-full bg-primary/10 blur-3xl top-1/4 right-1/4 animate-float"></div>
      <div
        className="absolute h-48 w-48 rounded-full bg-blue-500/10 blur-3xl bottom-1/4 left-1/4 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute h-40 w-40 rounded-full bg-purple-500/10 blur-3xl top-1/3 left-1/3 animate-float"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="container mx-auto px-4 relative max-w-4xl w-full py-8 z-10">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="animate-fade-in text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 p-0.5 shadow-lg shadow-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 opacity-50 rounded-xl blur-lg"></div>
                <div className="relative h-full w-full bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 12L12 3M12 3L9 6M12 3L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 16H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary animate-gradient-x font-poppins">
                Taskify
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg max-w-md">
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

        <div className="rounded-2xl border border-border/50 shadow-lg backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 p-6 animate-slide-in">
          <TodoList />
        </div>

        <footer className="mt-16 text-center">
          <div className="glass py-3 px-6 rounded-full inline-block text-sm text-gray-500 dark:text-gray-400">
            <span className="relative inline-block">
             Developed
              <span className="inline-block animate-pulse-slow text-red-500">
                ❤️
              </span>{" "}
              by{" "}
              <span className="inline-block animate-pulse-slow text-red-500">
                @Joy Tarafder
              </span>
              <span className="absolute inset-0 animate-shimmer pointer-events-none"></span>
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
