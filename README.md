# ReEnd-Components

[![npm version](https://img.shields.io/npm/v/reend-components)](https://www.npmjs.com/package/reend-components)
[![npm downloads](https://img.shields.io/npm/dm/reend-components)](https://www.npmjs.com/package/reend-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Arknights: Endfield Design System** — A React component library inspired by the UI aesthetics of Arknights: Endfield. Built with TypeScript, Tailwind CSS, and Radix UI primitives.

[Documentation](https://reend-components.pages.dev) · [GitHub](https://github.com/VBeatDead/ReEnd-Components) · [npm](https://www.npmjs.com/package/reend-components)

## Installation

```bash
npm install reend-components
# or
pnpm add reend-components
# or
yarn add reend-components
# or
bun add reend-components
```

### Peer Dependencies

| Package     | Version           |
| ----------- | ----------------- |
| react       | ≥18.0.0           |
| react-dom   | ≥18.0.0           |
| tailwindcss | ≥3.4.0 (optional) |

## Quick Start

### 1. Configure Tailwind (recommended)

```ts
// tailwind.config.ts
import reendPreset from "reend-components/tailwind";

export default {
  presets: [reendPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/reend-components/dist/**/*.{js,mjs}",
  ],
};
```

### 2. Import CSS Variables

```css
/* In your global CSS file */
@import "reend-components/variables.css";
```

### 3. Use Components

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "reend-components";

function App() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Styled with Endfield design tokens</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

### Without Tailwind

If you're not using Tailwind CSS, import the pre-built stylesheet:

```tsx
import "reend-components/styles.css";
import { Tooltip } from "reend-components";
```

## Components

| Component       | Description                             |
| --------------- | --------------------------------------- |
| `Tooltip`       | Popup info on hover/focus (Radix-based) |
| `Toast`         | Notification toasts (Radix-based)       |
| `Toaster`       | Toast container/renderer                |
| `SonnerToaster` | Alternative toast (Sonner lib)          |
| `cn()`          | Utility for merging Tailwind classes    |
| `useToast()`    | Toast notification hook                 |

## Theming

ReEnd uses CSS custom properties for all colors. Override any variable:

```css
:root {
  --ef-yellow: 47 100% 56%;
  --primary: 47 100% 56%;
  --background: 0 0% 4%;
  --foreground: 0 0% 94.1%;
}
```

Dark/light mode: toggle `.light` class on document root.

> All color variables use **HSL values without `hsl()` wrapper** for alpha support:
> `background: hsl(var(--primary) / 0.5);`

See [CSS Variable Reference](https://reend-components.pages.dev/docs/foundations) for the complete token list.

## Design Tokens

| Token          | Purpose        | Dark           | Light         |
| -------------- | -------------- | -------------- | ------------- |
| `--ef-yellow`  | Primary accent | `48 100% 58%`  | `42 90% 42%`  |
| `--ef-blue`    | Info / links   | `201 66% 58%`  | —             |
| `--ef-red`     | Destructive    | `355 100% 64%` | `355 80% 50%` |
| `--ef-green`   | Success        | `145 67% 51%`  | —             |
| `--background` | Page bg        | `0 0% 4%`      | `0 0% 97%`    |
| `--foreground` | Text color     | `0 0% 94.1%`   | `0 0% 8%`     |
| `--primary`    | Brand color    | `48 100% 58%`  | `42 90% 42%`  |

[Full token reference →](https://reend-components.pages.dev/docs/foundations)

## Development

```bash
git clone https://github.com/VBeatDead/ReEnd-Components.git
cd ReEnd-Components
npm install
npm run dev        # docs dev server at :8080
npm run build      # build docs SPA
npm run build:lib  # build library for npm
npm run test       # run tests
```

## License

MIT © [VBeatDead](https://github.com/VBeatDead)

## Disclaimer

This is a community-driven, fan-made project inspired by the sci-fi industrial aesthetics of _Arknights: Endfield_. It is **not** affiliated with, endorsed by, or connected to Hypergryph, Gryphline, or any of their subsidiaries. All game-related trademarks and copyrights belong to their respective owners. The MIT license applies to the source code only.
