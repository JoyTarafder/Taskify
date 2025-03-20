# Taskify - Beautiful Task Management App

A beautifully designed task management application built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. Taskify provides a modern, responsive interface for organizing your tasks with smooth animations and a beautiful UI.

![Taskify Screenshot](https://i.imgur.com/example.png) _(Replace with actual screenshot)_

## 📋 Features

- **Modern UI with Fluid Animations**: Built with Framer Motion for smooth, delightful animations and transitions
- **Responsive Design**: Fully optimized for both desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes with elegant transition effects
- **Local Storage**: All tasks are saved to your browser's local storage
- **Filter Tasks**: View all, active, or completed tasks
- **Task Management**:
  - Add new tasks
  - Edit existing tasks
  - Mark tasks as complete/incomplete
  - Delete individual tasks
  - Clear all completed tasks
- **Visual Feedback**: Toast notifications for actions with customized styles
- **Empty States**: Helpful guidance when there are no tasks
- **Mobile-Optimized**: Touch-friendly controls and proper viewport settings

## 🚀 Live Demo

Check out the live demo: [Taskify App](https://your-deployment-url.com)

## 💻 Technologies Used

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety and improved developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library
- **Hero Icons** - Beautiful SVG icons
- **Next-themes** - Theme management

## 🛠️ Installation and Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/taskify.git
cd taskify
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
taskify/
├── src/                    # Source files
│   ├── app/                # Next.js App Router files
│   │   ├── globals.css     # Global CSS styles
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page component
│   │
│   └── components/         # React components
│       ├── empty-state.tsx # Empty state display
│       ├── theme-provider.tsx # Theme context provider
│       ├── theme-toggle.tsx # Theme toggle button
│       ├── toast.tsx       # Toast notification component
│       └── todo-list.tsx   # Main todo list component
│
├── public/                 # Static assets
│   └── favicon.ico         # Favicon
│
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # Project documentation
```

## 🧩 Components

### `TodoList`

The core component that handles task state, CRUD operations, and displays the tasks. It includes filtering functionality and maintains task state in local storage.

### `EmptyState`

Displays helpful contextual messages when no tasks are available based on the current filter.

### `Toast`

Provides visual feedback for user actions with customized styling for different action types (success, error, info).

### `ThemeToggle`

Allows users to switch between light and dark themes with a smooth animation effect.

## 📱 Mobile Optimization

Taskify is fully optimized for mobile devices with:

- Responsive layouts that adapt to different screen sizes
- Touch-friendly inputs and buttons
- Proper viewport configuration
- Condensed UI elements on smaller screens
- Mobile-specific visual elements

## 🔧 Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🚀 Deployment

This project can be easily deployed to Vercel, Netlify, or any other hosting service that supports Next.js applications.

```bash
npm run build
npm run start
```

## 📝 Future Improvements

- User authentication
- Cloud synchronization
- Task categories and priorities
- Due dates and reminders
- Subtasks and checklists
- Drag and drop for reordering

## 👨‍💻 Author

- **Joy Tarafder** - [Portfolio](https://my-protfolio-jt.vercel.app/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by Joy Tarafder
