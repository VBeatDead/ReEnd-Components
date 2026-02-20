# ReEnd-Components

[![npm version](https://img.shields.io/npm/v/reend-components)](https://www.npmjs.com/package/reend-components)
[![npm downloads](https://img.shields.io/npm/dm/reend-components)](https://www.npmjs.com/package/reend-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://github.com/VBeatDead/ReEnd-Components/actions/workflows/ci.yml/badge.svg)](https://github.com/VBeatDead/ReEnd-Components/actions/workflows/ci.yml)

**The only React component library built for tactical, sci-fi, and gaming-inspired UI.**

Not another shadcn clone. Not a Bootstrap wrapper.
ReEnd is for when your app should look like a tactical HUD.

→ Dark-first design system (Endfield aesthetic)
→ Signature components you won't find anywhere else
→ CSS variable tokens + Tailwind preset
→ TypeScript, Radix UI primitives, accessible

[Documentation](https://reend-components.pages.dev) · [GitHub](https://github.com/VBeatDead/ReEnd-Components) · [npm](https://www.npmjs.com/package/reend-components)

---

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

| Package          | Version            | Required for          |
| ---------------- | ------------------ | --------------------- |
| `react`          | ≥18.0.0            | All components        |
| `react-dom`      | ≥18.0.0            | All components        |
| `tailwindcss`    | ≥3.4.0 *(optional)*| Tailwind preset       |
| `framer-motion`  | ≥10.0.0 *(optional)*| Signature components |
| `lucide-react`   | ≥0.400.0 *(optional)*| HoloCard icon prop  |

```bash
# For Signature components (GlitchText, RadarChart, TacticalPanel, etc.)
npm install framer-motion lucide-react
```

---

## Quick Start

### 1. Configure Tailwind (recommended)

```ts
// tailwind.config.ts
import reendPreset from "reend-components/tailwind";

export default {
  presets: [reendPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    // Required for Signature component classes to be included
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

Import the pre-built stylesheet instead:

```tsx
import "reend-components/styles.css";
import { Tooltip } from "reend-components";
```

---

## Components

### Core

| Component              | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `Button`               | 6 variants, 5 sizes, loading state, asChild (Radix Slot)          |
| `Badge`                | 7 color variants, removable with `onRemove`                       |
| `Card`                 | Corner-bracket decoration, hoverable/selected variants            |
| `Input` / `Label`      | 3 states, 3 sizes, left/right element slots                       |
| `Textarea`             | Character counter, all Input states                               |
| `Checkbox`             | ◆ checked, − indeterminate indicator                              |
| `RadioGroup`           | ◇→◆ diamond swap pattern                                         |
| `Switch`               | Square track, label / offLabel / onLabel props                    |
| `Select`               | 10 sub-components, danger item variant                            |
| `Avatar`               | clip-corner-sm shape, 6 sizes, ◆ status dot (4 states)           |
| `Progress`             | 4 color variants, indeterminate shimmer                           |
| `NumberInput`          | ±buttons, Arrow↑/↓ keyboard, min/max clamping, 3 sizes           |
| `Tooltip`              | Popup info on hover/focus (Radix-based)                           |
| `Toast` / `Toaster`    | Notification toasts (Radix-based)                                 |
| `SonnerToaster`        | Alternative toast (Sonner lib)                                    |
| `Accordion`            | +/− font-mono indicator, smooth expand/collapse                   |
| `Tabs`                 | 3 variants — underline, pill, bordered                            |
| `Popover`              | surface-2 panel, fade-in-up animation                             |
| `Dialog`               | 5 size variants, backdrop-blur overlay, full anatomy              |
| `Separator`            | 5 style variants, horizontal + vertical                           |
| `cn()`                 | Utility for merging Tailwind classes                              |
| `useToast()`           | Toast notification hook                                           |

### Navigation & Layout

| Component    | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `Timeline`   | Vertical event timeline — ◆/◇ nodes, date, title, description, status   |
| `Stepper`    | Horizontal/vertical step tracker — complete/current/upcoming states      |
| `Pagination` | Smart ellipsis page nav — PREV/NEXT + numbered pages, `onPageChange`     |
| `Breadcrumb` | Hierarchical path nav — custom separator, aria-current on last item      |

### Feedback & Utility

| Component      | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `Alert`        | Inline alert — info/success/warning/error variants, dismissible    |
| `EmptyState`   | Centered empty state — 4 presets, icon/action slots                |
| `SkeletonLine` | Animated skeleton placeholder line — width + height variants       |
| `SkeletonText` | Multi-line skeleton block                                          |
| `SkeletonAvatar` | Diamond-shaped avatar skeleton                                   |
| `SkeletonCard` | Full card skeleton with optional avatar row                        |

---

## Signature Components

> **Requires** `framer-motion` and/or `lucide-react` peer dependencies.
> Add `./node_modules/reend-components/dist/**/*.{js,mjs}` to your Tailwind `content`
> array so animation utilities (`animate-glitch`, `clip-corner`, etc.) are included.

```bash
npm install framer-motion lucide-react
```

| Component        | Description                                              | Key Props |
| ---------------- | -------------------------------------------------------- | --------- |
| `GlitchText`     | Animated glitch effect text span                         | `children: string`, `className?` |
| `DiamondLoader`  | Rotating diamond loading spinner                         | `size?: "sm"\|"md"\|"lg"`, `label?` |
| `TacticalPanel`  | HUD-style content panel with status indicator            | `title`, `status?: "online"\|"warning"\|"offline"\|"scanning"` |
| `HoloCard`       | Holographic stat/feature card with hover tilt            | `title`, `subtitle`, `icon: React.ElementType`, `value?` |
| `DataStream`     | Scrolling live data feed terminal                        | `messages?: string[]` |
| `TacticalBadge`  | Status badge with semantic variants (CVA-powered)        | `variant?: "default"\|"success"\|"warning"\|"danger"\|"info"` |
| `WarningBanner`  | Alert banner with severity levels                        | `level?: "caution"\|"alert"\|"critical"` |
| `ScanDivider`    | Animated scan-line section divider                       | `label?` |
| `CoordinateTag`  | HUD coordinate display tag                               | `label`, `value`, `unit?` |
| `RadarChart`     | Animated SVG radar/spider chart                          | `data: {label, value}[]`, `size?`, `color?: "primary"\|"cyan"` |
| `HUDOverlay`     | Corner-bracket HUD overlay with crosshair and coords     | `systemLabel?`, `lat?`, `lon?`, `showCoords?`, `showCrosshair?` |

```tsx
import {
  TacticalPanel,
  HUDOverlay,
  RadarChart,
  GlitchText,
} from "reend-components";

function Dashboard() {
  return (
    <HUDOverlay systemLabel="ENDFIELD::DASHBOARD">
      <TacticalPanel title="OPERATOR STATUS" status="online">
        <GlitchText>DR. AMBROSE</GlitchText>
        <RadarChart
          data={[
            { label: "ATK", value: 88 },
            { label: "DEF", value: 62 },
            { label: "TECH", value: 95 },
            { label: "SPD", value: 74 },
          ]}
        />
      </TacticalPanel>
    </HUDOverlay>
  );
}
```

---

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

---

## Development

```bash
git clone https://github.com/VBeatDead/ReEnd-Components.git
cd ReEnd-Components
npm install
npm run dev        # docs dev server at :8080
npm run build      # build docs SPA
npm run build:lib  # build library for npm
npm run test       # run tests (675 tests)
npm run test:coverage  # test + coverage report
```

---

## Internationalization (i18n)

The documentation site supports **English** (default) and **Bahasa Indonesia** via [react-i18next](https://react.i18next.com).

### URL Structure

| URL Pattern            | Language   |
| ---------------------- | ---------- |
| `/docs/foundations`    | English    |
| `/id/docs/foundations` | Indonesian |

**1,425 translation keys** across 16 namespaces × 2 languages.

---

## License

MIT © [VBeatDead](https://github.com/VBeatDead)

## Disclaimer

This is a community-driven, fan-made project inspired by the sci-fi industrial aesthetics of _Arknights: Endfield_. It is **not** affiliated with, endorsed by, or connected to Hypergryph, Gryphline, or any of their subsidiaries. All game-related trademarks and copyrights belong to their respective owners. The MIT license applies to the source code only.
