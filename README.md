# ReEnd-Components

[![npm version](https://img.shields.io/npm/v/reend-components)](https://www.npmjs.com/package/reend-components)
[![npm downloads](https://img.shields.io/npm/dm/reend-components)](https://www.npmjs.com/package/reend-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://github.com/VBeatDead/ReEnd-Components/actions/workflows/ci.yml/badge.svg)](https://github.com/VBeatDead/ReEnd-Components/actions/workflows/ci.yml)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/reend-components)](https://bundlephobia.com/package/reend-components)

**The only React component library built for tactical, sci-fi, and gaming-inspired UI.**

Not another shadcn clone. Not a Bootstrap wrapper.
ReEnd is for when your app should look like a tactical HUD.

→ Dark-first design system (Endfield aesthetic)
→ 75+ components including Signature HUD components
→ CSS variable tokens + Tailwind preset + CLI tool
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

| Package         | Version                   | Required for          |
| --------------- | ------------------------- | --------------------- |
| `react`         | ^18.0.0 \|\| ^19.0.0     | All components        |
| `react-dom`     | ^18.0.0 \|\| ^19.0.0     | All components        |
| `tailwindcss`   | ≥3.4.0 *(optional)*      | Tailwind preset       |
| `framer-motion` | ≥10.0.0 *(optional)*     | Signature components  |
| `lucide-react`  | ≥0.400.0 *(optional)*    | Signature components  |

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

### 2. Import CSS

```css
/* In your global CSS file */
@import "reend-components/variables.css";
@import "reend-components/utilities.css";
```

### 3. Use Components

```tsx
import { Button, Badge, OTPInput } from "reend-components";

function App() {
  return (
    <div>
      <Button variant="primary">Deploy</Button>
      <Badge variant="success">Online</Badge>
      <OTPInput length={6} onComplete={(code) => console.log(code)} />
    </div>
  );
}
```

### Without Tailwind

Import the pre-built stylesheet instead:

```tsx
import "reend-components/styles.css";
import { Button } from "reend-components";
```

---

## CLI Tool

Copy-paste components directly into your project (shadcn-style):

```bash
npx reend-ui init           # set up config and CSS variables
npx reend-ui add button     # copy button.tsx into your project
npx reend-ui list           # list all available components
npx reend-ui update button  # update a component to latest
```

---

## Components

### Core — Forms & Input

| Component        | Description                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `Button`         | 6 variants, 5 sizes, loading state, asChild (Radix Slot)          |
| `Badge`          | 7 color variants, removable with `onRemove`                       |
| `Input` / `Label`| 3 states, 3 sizes, left/right element slots                       |
| `Textarea`       | Character counter, all Input states                               |
| `Checkbox`       | ◆ checked, − indeterminate indicator                              |
| `RadioGroup`     | ◇→◆ diamond swap pattern                                         |
| `Switch`         | Diamond thumb + spin animation, label / offLabel / onLabel        |
| `Select`         | 10 sub-components, danger item variant                            |
| `NumberInput`    | ±buttons, Arrow↑/↓ keyboard, min/max clamping, 3 sizes           |
| `OTPInput`       | 6-digit OTP boxes, Orbitron font, success state, resend cooldown  |
| `DatePicker`     | Custom calendar, minDate/maxDate, YYYY.MM.DD format               |
| `FileUpload`     | Drag & drop zone, image thumbnails, per-file progress             |
| `RichTextEditor` | Toolbar B/I/U/S/H1-H3, markdown + preview toggle, character count |
| `Rating`         | ◆ diamond star rating, half-star support, readonly mode           |
| `FilterBar`      | Multi-filter chip bar with portal dropdown, ARIA listbox          |

### Core — Display & Layout

| Component      | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `Card`         | Corner-bracket decoration, hoverable/selected variants             |
| `Avatar`       | clip-corner-sm shape, 6 sizes, ◆ status dot (4 states)            |
| `Progress`     | 4 color variants, indeterminate shimmer                            |
| `Accordion`    | +/− indicator with 45° rotate, smooth expand/collapse              |
| `Tabs`         | 3 variants — underline, pill, bordered                             |
| `Popover`      | surface-2 panel, fade-in-up animation, z-[100]                    |
| `Dialog`       | 5 size variants, backdrop-blur overlay, full anatomy               |
| `Separator`    | 5 style variants, horizontal + vertical                            |
| `Tooltip`      | Popup info on hover/focus (Radix-based)                            |
| `Stat`         | KPI stat card — value, label, delta, trend arrow                   |
| `Table`        | Sortable columns, striped rows, semantic tokens                    |
| `List`         | Ordered/unordered list with icon slots and dividers                |
| `Chart`        | Recharts wrapper — line, bar, area, pie                            |

### Navigation & Layout

| Component    | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `Timeline`   | Vertical event timeline — ◆/◇ nodes, date, title, description, status   |
| `Stepper`    | Horizontal/vertical step tracker — complete/current/upcoming states      |
| `Pagination` | Smart ellipsis page nav — PREV/NEXT + numbered pages                     |
| `Breadcrumb` | Hierarchical path nav — custom separator, aria-current on last item      |
| `Footer`     | Site footer with columns, links, and brand slot                          |

### Feedback & Utility

| Component              | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `Alert`                | Inline alert — info/success/warning/error variants, dismissible    |
| `EmptyState`           | Centered empty state — 5 presets, icon/action slots                |
| `SkeletonLine`         | Animated skeleton placeholder — 4 variants                         |
| `SkeletonText`         | Multi-line skeleton block                                          |
| `SkeletonAvatar`       | Diamond-shaped avatar skeleton                                     |
| `SkeletonCard`         | Full card skeleton with optional avatar row                        |
| `Toast` / `Toaster`    | Notification toasts (Radix-based)                                  |
| `SonnerToaster`        | Alternative toast (Sonner lib)                                     |

### Overlay & Interaction

| Component              | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `Dropdown`             | Trigger → portal menu with icons and keyboard nav                  |
| `ContextMenu`          | Right-click context menu with nested groups                        |
| `CommandPalette`       | ⌘K fuzzy search palette — `useCommandPalette` hook                |
| `CopyClipboard`        | Copy-to-clipboard button with success feedback                     |
| `CookieConsent`        | GDPR consent banner — accept/reject/customize                      |
| `SessionTimeoutModal`  | Countdown warning modal with progress bar                          |
| `BottomSheet`          | Mobile drag-to-dismiss bottom sheet with snap points               |
| `Carousel`             | Touch + keyboard image/card carousel with dots                     |
| `Resizable`            | Drag-to-resize panel pair                                          |
| `BackToTop`            | Scroll-to-top button with threshold visibility                     |
| `ScrollProgress`       | Reading progress bar                                               |
| `ViewToggle`           | Grid/list view toggle button                                       |
| `SortControl`          | Sort direction control with label                                  |
| `SpoilerBlock`         | Blurred spoiler reveal block                                       |
| `ThemeSwitcher`        | Dark/light toggle with bidirectional sync                          |
| `PullToRefresh`        | Mobile pull-to-refresh gesture wrapper                             |
| `SwipeableItem`        | Swipe left/right to reveal action buttons                          |

### Hooks

| Hook               | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `useToast()`       | Programmatic toast notification                                   |
| `useFocusTrap()`   | Trap Tab/Shift+Tab within a container ref                         |
| `useShortcut()`    | Global keyboard shortcut with meta/ctrl/shift modifiers           |
| `useInView()`      | IntersectionObserver — fires when element enters viewport         |
| `useStagger()`     | Returns delay array for staggered CSS animations                  |
| `cn()`             | Utility for merging Tailwind classes (clsx + tailwind-merge)      |

```tsx
import { useInView, useStagger, useFocusTrap } from "reend-components";

// Animate on scroll
const { ref, inView } = useInView({ threshold: 0.2, once: true });

// Staggered list
const delays = useStagger(5, 80); // ["0ms", "80ms", "160ms", ...]

// Focus trap (modal/drawer)
const containerRef = useFocusTrap<HTMLDivElement>(isOpen);
```

---

## Signature Components

> Endfield-exclusive HUD components. Requires `framer-motion` and/or `lucide-react`.
> Add `./node_modules/reend-components/dist/**/*.{js,mjs}` to your Tailwind `content` array.

```bash
npm install framer-motion lucide-react
```

| Component        | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `GlitchText`     | Animated glitch effect text                                  |
| `DiamondLoader`  | Rotating diamond loading spinner                             |
| `TacticalPanel`  | HUD-style content panel with status indicator                |
| `HoloCard`       | Holographic stat/feature card with hover tilt                |
| `DataStream`     | Scrolling live data feed terminal                            |
| `TacticalBadge`  | Status badge — default/success/warning/danger/info variants  |
| `WarningBanner`  | Alert banner — caution/alert/critical severity               |
| `ScanDivider`    | Animated scan-line section divider                           |
| `CoordinateTag`  | HUD coordinate display tag                                   |
| `RadarChart`     | Animated SVG radar/spider chart                              |
| `HUDOverlay`     | Corner-bracket overlay with crosshair and coords             |
| `MissionCard`    | Mission briefing card with progress and status               |
| `OperatorCard`   | Operator profile card with stats and role badge              |
| `StatusBar`      | System status bar with live indicators                       |
| `CommandOutput`  | Terminal-style command output stream                         |
| `MatrixGrid`     | Animated matrix/grid data visualization                      |
| `FrequencyBars`  | Audio frequency bar visualizer                               |
| `TacticalTable`  | Keyboard-accessible data table with selectable rows          |

```tsx
import {
  HUDOverlay,
  TacticalPanel,
  OperatorCard,
  RadarChart,
  GlitchText,
} from "reend-components";

function Dashboard() {
  return (
    <HUDOverlay systemLabel="ENDFIELD::OPS">
      <TacticalPanel title="OPERATOR" status="online">
        <GlitchText>DR. AMBROSE</GlitchText>
        <RadarChart
          data={[
            { label: "ATK", value: 88 },
            { label: "DEF", value: 62 },
            { label: "TECH", value: 95 },
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

### Key Design Tokens

| Token             | Purpose           | Dark           | Light         |
| ----------------- | ----------------- | -------------- | ------------- |
| `--ef-yellow`     | Primary accent    | `48 100% 58%`  | `42 90% 42%`  |
| `--ef-yellow-glow`| Glow shadow color | `48 100% 58%`  | —             |
| `--ef-blue`       | Info / links      | `201 66% 58%`  | —             |
| `--ef-red`        | Destructive       | `355 100% 64%` | `355 80% 50%` |
| `--ef-green`      | Success           | `145 67% 51%`  | —             |
| `--background`    | Page bg           | `0 0% 4%`      | `0 0% 97%`    |
| `--foreground`    | Text color        | `0 0% 94.1%`   | `0 0% 8%`     |
| `--text-primary`  | Primary text      | `0 0% 94.1%`   | `0 0% 8%`     |
| `--text-muted`    | Muted text        | `0 0% 55%`     | `0 0% 45%`    |

[Full token reference →](https://reend-components.pages.dev/docs/foundations)

---

## Development

```bash
git clone https://github.com/VBeatDead/ReEnd-Components.git
cd ReEnd-Components
npm install
npm run dev         # docs dev server at :8080
npm run build       # build docs SPA
npm run build:lib   # build library → dist/lib/
npm run build:cli   # build CLI → dist/bin/cli.cjs
npm run test        # run 1166 tests across 26 files
npm run lint        # ESLint
```

---

## Internationalization (i18n)

The documentation site supports **English** (default) and **Bahasa Indonesia** via [react-i18next](https://react.i18next.com).

| URL Pattern            | Language   |
| ---------------------- | ---------- |
| `/docs/foundations`    | English    |
| `/id/docs/foundations` | Indonesian |

16 namespaces × 2 languages, covering all 75+ components and hooks.

---

## License

MIT © [VBeatDead](https://github.com/VBeatDead)

## Disclaimer

This is a community-driven, fan-made project inspired by the sci-fi industrial aesthetics of _Arknights: Endfield_. It is **not** affiliated with, endorsed by, or connected to Hypergryph, Gryphline, or any of their subsidiaries. All game-related trademarks and copyrights belong to their respective owners. The MIT license applies to the source code only.
