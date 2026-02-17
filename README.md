# ReEnd-Components

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/VBeatDead/ReEnd-Components)](https://github.com/VBeatDead/ReEnd-Components/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/VBeatDead/ReEnd-Components)](https://github.com/VBeatDead/ReEnd-Components/issues)

**Arknights: Endfield Design System** — A modern React component library and interactive documentation showcase inspired by the UI aesthetics of Arknights: Endfield. Built with Vite, TypeScript, Tailwind CSS, and Radix UI primitives.

## ✨ Features

- **Interactive Documentation** — Live component previews with editable code examples
- **70+ UI Demos** — Comprehensive showcase across 11 documentation categories
- **Dark/Light Theme** — Built-in theme provider with smooth transitions
- **Command Palette** — Quick navigation with keyboard shortcuts (⌘K / Ctrl+K)
- **Responsive Design** — Mobile-first approach with fully adaptive layouts
- **Performance Optimized** — Lazy loading, code splitting, and optimized rendering
- **Full TypeScript** — Complete type safety and excellent IntelliSense support
- **Smooth Animations** — Beautiful page transitions powered by Framer Motion
- **Design Tokens** — CSS custom properties system with Endfield color palette

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/VBeatDead/ReEnd-Components.git
cd ReEnd-Components

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Production build
npm run build:dev    # Development build

# Testing
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode

# Code Quality
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── docs/                      # Documentation UI components
│   │   ├── CodeBlock.tsx          # Syntax-highlighted code blocks
│   │   ├── CommandPalette.tsx     # Command palette navigation
│   │   ├── ComponentPreview.tsx   # Live component previewer
│   │   ├── DocsHeader.tsx         # Documentation header
│   │   ├── DocsSidebar.tsx        # Navigation sidebar
│   │   ├── HighlightText.tsx      # Text highlighting utility
│   │   ├── ThemeProvider.tsx      # Theme management
│   │   └── sidebarData.ts        # Sidebar navigation data
│   ├── sections/                  # Component documentation sections
│   │   ├── AnimationSection.tsx
│   │   ├── CoreComponentsSection.tsx
│   │   ├── ContentMediaSection.tsx
│   │   ├── ContentStrategySection.tsx
│   │   ├── DataDisplaySection.tsx
│   │   ├── FeedbackSection.tsx
│   │   ├── FoundationsSection.tsx
│   │   ├── InteractiveSection.tsx
│   │   ├── OverlayUtilitySection.tsx
│   │   └── PatternsSection.tsx
│   ├── ui/                        # Base UI components
│   │   ├── sonner.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── tooltip.tsx
│   └── NavLink.tsx
├── hooks/
│   └── use-toast.ts               # Toast notification hook
├── lib/
│   └── utils.ts                   # Utility functions (cn helper)
├── layouts/
│   └── DocsLayout.tsx             # Shared docs layout with Outlet
├── pages/
│   ├── HomePage.tsx               # Landing page with animations
│   ├── DocsOverview.tsx           # Docs landing page (section grid)
│   ├── ChangelogPage.tsx          # Changelog page
│   └── NotFound.tsx               # 404 page
├── test/
│   ├── example.test.ts
│   └── setup.ts
├── App.tsx                        # Root component with routing
├── main.tsx                       # Entry point
├── index.css                      # Global styles & CSS variables
└── vite-env.d.ts
```

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.dev/) + [Radix Toast](https://www.radix-ui.com/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Utilities:** [clsx](https://github.com/lukeed/clsx) + [CVA](https://cva.style/) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Testing:** [Vitest](https://vitest.dev/)
- **Linting:** [ESLint](https://eslint.org/)

## 📚 Documentation Sections

The documentation is organized into 11 comprehensive categories:

1. **Foundations** — Design system basics: colors, typography, spacing, shadows
2. **Core Components** — Essential UI building blocks: buttons, inputs, labels
3. **Data Display** — Information presentation: tables, cards, badges, avatars
4. **Feedback** — User feedback: alerts, toasts, progress indicators
5. **Interactive** — Interactive content: accordions, tabs, collapsibles, toggles
6. **Content & Media** — Media handling: carousels, aspect ratios
7. **Overlay & Utility** — Floating components: dialogs, sheets, tooltips, popovers
8. **Animation** — Motion and transitions: animated components and effects
9. **Content Strategy** — Navigation: breadcrumbs, pagination, navigation menus
10. **Patterns** — Complex UI patterns and pre-built compositions
11. **Signature** — Unique branding and custom components

## 🎨 Customization

Modify the theme and design system in:

- `src/index.css` — Global styles and CSS variables (494 lines of design tokens)
- `tailwind.config.ts` — Tailwind configuration and custom colors
- `src/components/docs/ThemeProvider.tsx` — Theme switching logic

### Design Tokens

All colors use CSS custom properties with HSL values for alpha channel support:

```css
:root {
  --ef-yellow: 47 100% 56%;     /* Primary accent */
  --ef-blue: 200 60% 56%;       /* Info / links */
  --ef-red: 355 100% 64%;       /* Destructive */
  --ef-green: 147 71% 51%;      /* Success */
  --background: 0 0% 4%;        /* Page background */
  --foreground: 0 0% 94.1%;     /* Text color */
}
```

Override any variable for custom theming:

```css
background: hsl(var(--primary) / 0.5); /* 50% opacity */
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

## 🔒 Security

Please see our [Security Policy](SECURITY.md) for reporting vulnerabilities.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
