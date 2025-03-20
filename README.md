# Taskify - Beautiful Task Management App

A beautifully designed task management application built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. Taskify provides a modern, responsive interface for organizing your tasks with smooth animations and a beautiful UI.

![Taskify Screenshot](https://github.com/user-attachments/assets/a185d236-946e-459e-8123-bd510dad5c3c)

## 📋 Features

### Core Features

- **Modern UI with Fluid Animations**: Built with Framer Motion for smooth, delightful animations and transitions
  - Smooth fade-in animations for new tasks
  - Elegant slide transitions for task completion
  - Beautiful gradient animations in the background
  - Responsive hover effects on interactive elements
- **Responsive Design**: Fully optimized for both desktop and mobile devices
  - Adaptive layouts that work on all screen sizes
  - Mobile-first approach with touch-optimized controls
  - Responsive typography and spacing
  - Collapsible UI elements on smaller screens
- **Dark/Light Mode**: Toggle between themes with elegant transition effects
  - System preference detection
  - Smooth theme switching animations
  - Persistent theme preference
  - Optimized color schemes for both modes
- **Local Storage**: All tasks are saved to your browser's local storage
  - Automatic saving on every change
  - Offline functionality
  - Data persistence across sessions
  - Real-time sync across tabs
- **Filter Tasks**: View all, active, or completed tasks
  - Dynamic filtering with smooth transitions
  - Visual feedback for active filters
  - Task count indicators
  - Empty state handling for each filter

### Task Management Features

- **Add Tasks**:
  - Quick task entry with keyboard support
  - Input validation and error handling
  - Instant visual feedback
  - Auto-focus on input field
- **Edit Tasks**:
  - Inline editing with keyboard shortcuts
  - Cancel and save options
  - Real-time validation
  - Smooth transition animations
- **Complete/Incomplete Tasks**:
  - One-click task completion
  - Visual completion indicators
  - Progress tracking
  - Bulk completion options
- **Delete Tasks**:
  - Individual task deletion
  - Confirmation feedback
  - Undo capability
  - Bulk deletion support
- **Clear Completed**:
  - One-click clear all completed tasks
  - Confirmation dialog
  - Progress feedback
  - Task count updates

## 💻 Technologies Used

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety and improved developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library
- **Hero Icons** - Beautiful SVG icons
- **Next-themes** - Theme management

## 💻 Technical Implementation

### State Management

- React's useState for local state management
- useEffect for side effects and localStorage sync
- Context API for theme management
- Optimized re-renders with proper state updates

### Data Structure

```typescript
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
```

### Key Components

#### TodoList Component

- Manages todo state and CRUD operations
- Handles filtering and sorting
- Implements local storage persistence
- Provides keyboard shortcuts
- Manages animations and transitions

#### EmptyState Component

- Context-aware empty state messages
- Dynamic illustrations
- Action suggestions
- Smooth animations

#### Toast Component

- Customizable notification styles
- Auto-dismiss functionality
- Stacking support
- Smooth animations

#### ThemeToggle Component

- System preference detection
- Smooth theme switching
- Persistent preference storage
- Animated transitions

### Styling Implementation

- Tailwind CSS for utility-first styling
- Custom animations with Framer Motion
- Responsive design breakpoints
- Dark mode support
- Custom color scheme

## 🛠️ Development Setup

### Prerequisites

- Node.js 18.x or later
- npm package manager
- Git for version control

### Environment Setup

1. **Clone the repository**

```bash
git clone https://github.com/JoyTarafder/Taskify.git

```

2. **Install dependencies**

```bash
npm install

```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Development Scripts

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

### Touch Optimizations

- Larger touch targets (minimum 44x44px)
- Proper touch feedback
- Smooth scrolling
- Prevented text selection
- Optimized button spacing

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Performance Optimizations

### Code Splitting

- Dynamic imports for components
- Route-based code splitting
- Optimized bundle size

### Image Optimization

- Next.js Image component
- Responsive images
- Lazy loading
- WebP format support

### Animation Performance

- Hardware-accelerated animations
- Optimized transition timings
- Reduced motion support
- Performance monitoring

## 🚀 Deployment Options

### Netlify Deployment

1. Push to GitHub
2. Connect to Netlify
3. Configure build settings
4. Deploy

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## 📝 Future Roadmap

### Planned Features

1. **User Authentication**

   - Email/password login (Ongoing)
   - Social Authentication (Ongoing)
   - User profiles (Ongoing)
   - Session management 

2. **Cloud Synchronization**

   - Real-time updates
   - Cross-device sync
   - Offline support (Ongoing)
   - Conflict resolution

3. **Task Organization**

   - Subtasks

4. **Advanced Features**
   - Drag and drop reordering
   - Search functionality
   - Task templates
   - Export/Import

## 👨‍💻 Author

- **Joy Tarafder**
  - [Portfolio](https://my-protfolio-jt.vercel.app/)
  - [GitHub](https://github.com/JoyTarafder)
  - [LinkedIn](https://www.linkedin.com/in/joy-tarafder/)


## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for the animation library
- All contributors and supporters

---

Made with ❤️ by Joy Tarafder
