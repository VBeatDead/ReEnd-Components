# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-26

### Added

#### New Components (28)

**Form & Input**
- **`OTPInput`** — Orbitron font, 48×56px boxes, `success` prop (green border + text), `onResend` + `resendCooldown` timer, paste support, `animate-shake` on error
- **`DatePicker`** — Full rewrite: custom calendar via `@radix-ui/react-popover`. Diamond clip-path selected day, MO–SU headers, ◂/▸ month nav, ◂◂/▸▸ year-jump, TODAY/CLEAR footer, `minDate`/`maxDate`, YYYY.MM.DD display format
- **`Rating`** — Diamond ◆/◇ rating with configurable `max`, `precision`, hover preview, keyboard navigation, ARIA slider role
- **`FileUpload`** — 8 drag states (including `drag-invalid`), per-file list with 80×80px image thumbnails, 3px progress bar per file, Orbitron filename display, `[SELECT FILES]` button in idle state
- **`RichTextEditor`** — Toolbar: B/I/U/S/H1–H3/quote/ol/ul/link/image/divider. MARKDOWN/PREVIEW toggle, character count, `maxLength` enforcement. Zero external dependencies

**Overlay & Utility**
- **`BackToTop`** — Configurable scroll threshold, smooth/instant scroll, fixed positioning
- **`BottomSheet`** — Drag-to-dismiss gesture (120px threshold), snap points, portal render, backdrop `bg-black/60`
- **`Carousel`** + **`CarouselItem`** — Arrow key navigation, `role="region"` + `aria-roledescription`, dot indicators with `role="tab"`, `overflow-x-hidden` track
- **`CommandPalette`** — Cmd+K / Ctrl+K trigger, fuzzy search via Fuse.js, action groups, keyboard navigation, `useCommandPalette` hook exported
- **`ContextMenu`** — Right-click trigger, nested submenus, keyboard navigation, portal render
- **`CookieConsent`** — Banner + modal variants, preference category toggles, `onAccept`/`onDecline`/`onCustomize` callbacks
- **`CopyClipboard`** — Click-to-copy with ✓ success feedback and configurable timeout
- **`Dropdown`** + **`DropdownItem`** — Portal-based `getBoundingClientRect` positioning, outside click/scroll/resize close, ARIA `menu`/`menuitem`
- **`FilterBar`** + **`FilterChip`** — Portal dropdown with flip-upward detection, ARIA `listbox`/`option`, `aria-haspopup`/`aria-expanded`
- **`Footer`** — Multi-column layout with Endfield theming, logo slot, link columns, social icons
- **`Resizable`** + **`ResizablePanel`** + **`ResizableHandle`** — `react-resizable-panels` v4 integration, string `%` sizes
- **`ScrollProgress`** — Fixed/sticky variants, ARIA `progressbar`, `forwardRef`
- **`SessionTimeoutModal`** — Countdown timer, corner bracket decoration, color-coded progress bar (`text-ef-red`/`text-ef-orange`), `variant="primary"` button
- **`ViewToggle`** — Grid/list view toggle with `React.forwardRef` + `displayName`

**Data Display**
- **`Chart`** — Recharts wrapper with Endfield color palette (`--chart-1` through `--chart-8`) and design token theming
- **`List`** + **`ListItem`** — Ordered/unordered/description list variants with type aliases
- **`SortControl`** — Tri-state sort cycling (asc → desc → none), ▲/▼ indicators, Orbitron labels
- **`SpoilerBlock`** — Click-to-reveal hidden content, `hsl(var(--foreground))` background (white dark / black light)
- **`Stat`** — Metric display card with label/value/trend/icon slots
- **`Table`** + **`TableRow`** + **`TableHead`** + **`TableCell`** — Semantic tokens (`hover:bg-primary/[0.03]`, `even:bg-foreground/[0.015]`), interactive column sort with `useState`
- **`ThemeSwitcher`** — Sun/Moon lucide icons, 360° spin animation, bidirectional sync via `ef-theme-change` `CustomEvent` with `ThemeProvider`

**Mobile**
- **`PullToRefresh`** — 5-phase state machine (idle → pulling → threshold → refreshing → complete), diamond spinner, haptic feedback via `navigator.vibrate`
- **`SwipeableItem`** — Touch-swipeable list item with left/right action reveal at 80px, auto-trigger at 160px, pointer event handling

#### New Hooks (4)
- **`useFocusTrap`** — Traps Tab/Shift+Tab within a container ref. Returns ref to attach to boundary element. Auto-cleanup on unmount
- **`useShortcut`** — Global keyboard shortcuts with `meta`/`ctrl`/`shift` modifier support. Auto-cleanup on unmount
- **`useInView`** — `IntersectionObserver` wrapper with `threshold`, `once` option, reduced-motion awareness, SSR-safe fallback
- **`useStagger`** — Returns `string[]` of CSS delay values for staggered entrance animations based on item count and base delay

#### CSS Utilities (`src/styles/utilities.css`)
- New standalone `utilities.css` bundled into `dist/lib/style.css` for npm consumers
- 11 new animation keyframes: `shake`, `slideUp`, `particleDrift`, `switchThumbSpin`, `fadeInDown`, `slideInRight`, `scaleIn`, `rotate`, `loadingDot`, `dialog-in`, `accordion-open/close`
- Corresponding `animate-*` classes for all new keyframes
- `.panel-glass`, `.panel-glass-light`, `.panel-glass-dark`, `.scanline-overlay`, `.light .scanline-overlay::after`, `.spoiler`/`.spoiler[data-revealed]`

#### Design Tokens
- Semantic text tokens: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-disabled`, `--text-inverse`, `--text-error`, `--text-success`, `--text-warning`, `--text-info`, `--text-muted`
- Glow: `--ef-yellow-glow`
- Border aliases: `--border-subtle`, `--border-default`
- Font references: `--font-display`, `--font-ui`, `--font-mono`, `--font-body`, `--font-decorative`
- Light mode overrides for all new tokens in both `variables.css` and `index.css`

#### i18n
- EN + ID translations for all 28 new components and 4 new hooks (24 locale files updated)
- CLI usage section in `install.json` — all 4 commands documented in both languages
- `useFocusTrap`, `useShortcut`, `useInView`, `useStagger` added to API Reference translations

### Changed

#### Enhanced Components (17)
- **`Accordion`** — Single rotating `+` indicator (rotates 45° → × on open), cubic-bezier easing via `utilities.css`
- **`Alert`** — 4 variants (info/warning/danger/success), dismissible with `onDismiss`, ARIA `role="alert"`, decorative icons `aria-hidden`
- **`Avatar`** — Diamond glow hover via `drop-shadow` (works with `clip-corner-sm`); per-size fallback text scaling: `xs→text-[10px]` through `2xl→text-4xl`
- **`Button`** — Loading state refinements
- **`Card`** — Sub-component refinements
- **`Dialog`** — 5 sizes (sm/md/lg/xl/fullscreen), `backdrop-blur-sm`, `animate-dialog-in` open animation
- **`EmptyState`** — 5 named presets (empty/error/offline/search/permission)
- **`Pagination`** — Refinements
- **`Popover`** — `z-50` → `z-[100]` to clear sticky headers
- **`Progress`** — Shimmer animation improvements
- **`Skeleton`** — 4 variants: `line`, `circle`, `card`, `avatar`
- **`Sonner`** — All hardcoded hex colors (`#CCC`, `#666`) replaced with `text-muted-foreground`; `hover:!text-white` → `hover:!text-foreground`
- **`Stepper`** — Removed `-mx-1 px-1` from overflow wrapper (was causing unnecessary horizontal scrollbar)
- **`Switch`** — Full diamond thumb redesign: `clipPath: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`. Spin animation on toggle via `key={spinKey}` remount strategy. `bg-primary-foreground` (on) / `bg-foreground/80` (off)
- **`Tabs`** — `TabsList` changed from `overflow-x-auto` to `flex-wrap` to prevent horizontal scroll overflow
- **`Timeline`** — Refinements
- **`Tooltip`** — Refinements

#### Signature Components (7)
- **`CommandOutput`** — Expanded API, token-compliant colors
- **`FrequencyBars`** — Configurable bar count, color theming
- **`MatrixGrid`** — Responsive sizing, accessibility labels
- **`MissionCard`** — Status indicators, collapsible details
- **`OperatorCard`** — Enhanced layout, ViewToggle integration support
- **`StatusBar`** — Dynamic segments, ARIA roles
- **`TacticalTable`** — Sortable columns, design token compliance

#### Docs Site
- **`DocsHeader`** logo — replaced `<img>` with CSS mask (`WebkitMask`/`mask`) so icon renders in `hsl(var(--foreground))`, visible in all modes
- **`DocsSidebar`** — Fixed `filteredData` useMemo missing `sidebarData` in deps (sidebar never re-rendered on language switch)
- **`ComponentPreview`** — Fixed `ViewportFrame` using `t()` without `useTranslation`
- **`PlaygroundControlField`** — Diamond toggle dark mode fix: `bg-primary-foreground` when ON (near-black, visible on yellow track)
- **`ThemeProvider`** — Bidirectional sync via `ef-theme-change` `CustomEvent`; loop prevention via functional state updater
- **`sidebarData`** — Removed `view-toggle`, `success-state`; added `cli-usage`, `rich-text-editor`, all new component IDs
- All 11 section files rewritten with complete demos, `code` props on all `ComponentPreview`, design token compliance, ARIA attributes

#### Build & Tooling
- `vite.config.ts` — Manual chunks: `sandpack` (@codesandbox + @babel + @stitches), `codemirror`, `lezer`, `radix`, `charts`, `icons`, `i18n`. `chunkSizeWarningLimit: 600`
- CI `MAX_MJS` limit: 130 kB → 300 kB (actual bundle is ~230 kB MJS)
- CI: added `npm run build:cli` step, `dist/bin/cli.cjs` and `dist/lib/style.css` existence checks

### Fixed
- **CLI registry** — `date-picker` missing `@radix-ui/react-popover` dep (component was fully rewritten per Section 71 spec)
- **CLI registry** — `holo-card` had false `framer-motion` dep (uses pure CSS/React state)
- **CLI registry** — `data-stream` missing `framer-motion` dep (imports `motion`, `AnimatePresence`)
- **`animate-dialog-in`** — was missing from `tailwind.config.ts` and `index.css`; dialog had no open animation
- **`animate-shake`** — was missing from `utilities.css`; OTP error shake was broken for npm users
- **`RatingProps.onChange`** — `Omit<HTMLAttributes, "onChange">` pattern resolves type conflict
- **`SessionTimeoutModal`** — `variant="default"` → `variant="primary"` to match Button API
- **`list.tsx` / `stat.tsx`** — empty `interface X extends Y {}` converted to `type X = Y` aliases (lint errors)

### Tests
- **1166 tests** across **26 files**, 0 failures
- Restructured: 24 flat files → 26 organized files
  - Deleted 6 old monolithic files (accordion-tabs, button-badge, signature-cards/core/hud/panel)
  - Added `ui/__tests__/signature/` subdirectory (4 files)
  - Added `sections/__tests__/` directory (4 integration test files)
  - Split monolithic files into focused single-concern files
- `vitest.config.ts` coverage now includes `src/hooks/*.ts` and `src/components/ui/signature/*.{ts,tsx}`
- Added `PointerEvent` polyfill to `src/test/setup.ts` for pointer-gesture components

### Bundle
- Library: **230.92 kB MJS** / 242.10 kB CJS (49.69 kB gzip)
- Docs site: 0 chunk size warnings after `manualChunks` split

---

## [1.0.0] - 2026-02-20

### Changed

- **Accessibility (WCAG 2.1 AA)** — full audit + fixes across all 47 components:
  - `Stepper`: `role="list"` on container; each step item gets `role="listitem"`, `aria-label` describing step number + label + state (completed/current/upcoming), `aria-current="step"` on the active step
  - `Timeline`: `role="list"` on `<Timeline>` container; `role="listitem"` + `aria-current="true"` on `<TimelineItem>` with `status="current"`
  - `TacticalTable`: selectable rows now keyboard-accessible — `tabIndex={0}`, `onKeyDown` handling Enter/Space to trigger `onRowClick`, `focus-visible:ring-1 focus-visible:ring-primary` outline
  - `Alert`: decorative icon characters (◆ / ✓ / ⚠ / ✕) now have `aria-hidden="true"` — role="alert" and variant meaning conveyed by context, not character
  - `MissionCard`: inline progress bar now has `role="progressbar"` with `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-label="Mission progress"`; percentage text has `aria-hidden="true"` (already exposed via meter)
  - `Breadcrumb`: separator `<li>` now has `role="presentation"` alongside `aria-hidden="true"` — removes ambiguity for AT that might count hidden list items

- **TypeScript API** — missing prop interfaces now exported from library barrel (`reend-components`):
  - `StepItem`, `StepperProps` from `Stepper`
  - `TimelineProps`, `TimelineItemProps` from `Timeline`
  - `PaginationProps` from `Pagination`
  - `BreadcrumbItemData`, `BreadcrumbProps` from `Breadcrumb`
  - `NumberInputProps` from `NumberInput`

- **Light Mode Design Compliance** — comprehensive audit replacing all hardcoded `border-white/x` and `bg-white/x` Tailwind classes with adaptive semantic tokens across 18 core components:
  - `Tailwind preset` + `tailwind.config.ts`: added `border-strong` sub-token mapping to `--border-strong` CSS variable; `border-border-strong` now usable as a Tailwind utility
  - **Critical form fields** (`Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `NumberInput`): all default borders changed from `border-white/[0.12]` → `border-input`; hover borders changed from `hover:border-white/20` → `hover:border-border-strong` — borders now visible in both dark and light mode
  - `Button` secondary: `border-white/25` → `border-border-strong`; icon variant: `border-white/10` + `bg-white/5` → `border-border` + `bg-surface-2`
  - `Badge` default: `border-white/15` + `bg-white/5` → `border-border` + `bg-surface-2`
  - `Accordion`: item border `border-white/6` → `border-border`; trigger hover `hover:bg-white/[0.02]` → `hover:bg-surface-hover`
  - `Tabs`: list/bordered `border-white/10` → `border-border`; trigger `hover:bg-white/[0.03]` → `hover:bg-surface-hover`; active `bg-white/[0.05]` → `bg-surface-3`
  - `Dialog`: content/header/footer `border-white/10` + `border-white/8` → `border-border`
  - `Popover`: `border-white/10` → `border-border`
  - `Separator`: `bg-white/10` → `bg-border`, `bg-white/5` → `bg-border`, `bg-white/25` → `bg-border-strong`
  - `Progress`: track `bg-white/8` → `bg-surface-3`
  - `Skeleton` (SkeletonCard): `border-white/8` → `border-border`
  - `Pagination`: inactive page `border-white/10` → `border-border`
  - `Timeline`: connector line `before:bg-white/10` → `before:bg-border`; upcoming marker `text-white/20` → `text-muted-foreground/40`
  - `Stepper`: upcoming markers `text-white/20` → `text-muted-foreground/40`; connectors `bg-white/10` → `bg-border`
  - `Breadcrumb`: separator `text-white/20` → `text-muted-foreground/40`
  - `EmptyState`: icon container `text-white/15` → `text-muted-foreground/30`

---

## [0.4.0] - 2026-02-20

### Added

- **9 Signature Components** (Tier 4A + 5 + 6 Endfield-exclusive):
  - `MissionCard` — mission briefing card with priority indicator (CRITICAL / HIGH / STANDARD), status badge (ACTIVE / PENDING / COMPLETE / CLASSIFIED), operator count display, and diamond-decorated border
  - `OperatorCard` — operator profile card with clip-corner image slot, rank tag, specialization chip, and tactical stats panel
  - `StatusBar` — horizontal HUD status bar with label, value, optional max, and color variants (default / warning / danger / success); animated fill via framer-motion
  - `CommandOutput` — terminal-style scrolling command output with alternating prompt styles and monospace display
  - `CountdownTimer` — countdown clock with `targetDate` prop, days/hours/minutes/seconds segments, expired state, and pulse animation
  - `MatrixGrid` — animated falling character grid (katakana + alphanumeric) rendered on canvas with configurable density and speed
  - `FrequencyBars` — animated audio frequency bar visualizer with 20 bars, configurable color, and randomized heights
  - `TacticalTable` — fully typed generic sortable table with sort indicators, striped rows, and empty state support
  - `DataStream` (enhanced) — updated with improved message pool, configurable prefix, and pause-on-hover
  - `HUDOverlay` (enhanced) — expanded corner bracket variants, improved coordinate display and live clock accuracy
  - `GlitchText` (enhanced) — refined glitch timing intervals and configurable intensity
  - `RadarChart` (enhanced) — improved animation easing and axis label positioning

- **5 Core Gap Utility Components** (Tier 6):
  - `Timeline` + `TimelineItem` — vertical timeline with `◆` (complete/current) and `◇` (upcoming) node markers, `pl-6` container + `before:` pseudo-element vertical line; `status` prop drives node style; composable via `items` prop or `children`
  - `Stepper` — horizontal/vertical step indicator with `currentStep` (0-indexed), step connectors colored by completion state; exports `StepItem` type
  - `Pagination` — page navigation with `getPageRange()` ellipsis algorithm, `◆ PREV` / `NEXT ◆` buttons, `aria-current="page"`, disabled states; exports `paginationItemVariants` CVA
  - `Breadcrumb` — `<nav aria-label>` wrapper with `<ol>`, configurable `separator` (default `›`), `aria-current="page"` on last item, anchor for items with `href`
  - `NumberInput` — controlled/uncontrolled number input with `+`/`−` buttons, `min`/`max`/`step`, ArrowUp/ArrowDown keyboard support; `sm`/`md`/`lg` size variants via CVA; exports `numberInputVariants`

- **3 Previously-exported gap components** now in public index:
  - `Skeleton` — shimmer placeholder with `sm`/`md`/`lg`/`xl` variants and `circle` boolean
  - `EmptyState` — empty-state panel with icon, title, description, and optional action
  - `Alert` — alert banner with `info`/`warning`/`danger`/`success` variants and optional dismiss

- **CLI Tool** (`npx reend-ui`) — shadcn-style copy-paste workflow for ReEnd components:
  - `reend-ui init` — project detection (Next.js / Vite / CRA / Remix), outputDir prompt, `reend-ui.config.json` creation, variables.css copy
  - `reend-ui add [components...]` — fetches source files from GitHub raw, resolves deps, shows install instructions; `--overwrite` flag
  - `reend-ui list [--core | --signature]` — lists all 42 available components grouped by type
  - `reend-ui update [components...]` — re-adds installed components with `--overwrite` (updates all if none specified)
  - Binary: `./dist/bin/cli.cjs` bundled via esbuild (Node 18+, standalone CJS, no install required)

- **Component Playground** — Sandpack-powered live code editor embedded in the docs site:
  - `src/components/docs/Playground.tsx` — lazy-loaded Sandpack component with Endfield dark theme, share URL (`btoa`-encoded `?pg=` param), reset button, and close handler
  - "OPEN IN PLAYGROUND" toggle button per `ComponentPreview` — expands Playground below demo with pre-loaded code
  - Auto-opens when `?pg=` URL param is present (shared links)

- **Test coverage** — 45 new tests added (675 total across 14 test files):
  - `__tests__/navigation.test.tsx` — 45 tests (Timeline: 9, Stepper: 8, Pagination: 10, Breadcrumb: 8, NumberInput: 10)

### Changed

- **Library bundle** updated to include all components (Tier 4A–6)
- **`src/components/ui/index.ts`** — added exports for Timeline, TimelineItem, timelineItemVariants, Stepper, Pagination, paginationItemVariants, Breadcrumb, NumberInput, numberInputVariants, Skeleton, EmptyState, Alert and all new Signature components
- **`package.json`** — added `bin` field for `reend-ui` CLI; `prepublishOnly` now runs `build:lib && build:cli`; added `esbuild`, `commander`, `chalk`, `prompts`, `@codesandbox/sandpack-react` to devDependencies

---

## [0.3.0] - 2026-02-19

### Added

- **`Accordion`** + **`AccordionItem`** + **`AccordionTrigger`** + **`AccordionContent`** — `@radix-ui/react-accordion`. `+`/`−` font-mono indicator (NOT chevron). Items: `border border-white/6`. Content: `animate-accordion-down`/`animate-accordion-up` using `--radix-accordion-content-height`. `type="single"|"multiple"`, `collapsible`, `defaultValue` props. All sub-components are `forwardRef` + `displayName`.
- **`Tabs`** + **`TabsList`** + **`TabsTrigger`** + **`TabsContent`** — `@radix-ui/react-tabs`. 3 `variant` options on both list and trigger (CVA): `underline` (default, `border-b-primary` active indicator), `pill` (`bg-surface-3` active, rounded pill shape), `bordered` (`bg-white/[0.05]` active, right border between items). Trigger label: `font-display text-[13px] font-semibold uppercase tracking-wider`. Exports `tabsListVariants`, `tabsTriggerVariants`.
- **`Popover`** + **`PopoverTrigger`** + **`PopoverContent`** + **`PopoverAnchor`** — `@radix-ui/react-popover`. Content: `bg-surface-2 border border-white/10 shadow-lg p-4 min-w-[200px] z-50`. Animation: `data-[state=open]:animate-fade-in-up`. Default `sideOffset=6`.
- **`Dialog`** + **`DialogTrigger`** + **`DialogPortal`** + **`DialogOverlay`** + **`DialogContent`** + **`DialogHeader`** + **`DialogFooter`** + **`DialogTitle`** + **`DialogDescription`** + **`DialogClose`** — `@radix-ui/react-dialog`. Overlay: `bg-black/75 backdrop-blur-sm`. Content: CVA `size` variants — `sm`(max-w-sm) / `md`(max-w-lg, default) / `lg`(max-w-2xl) / `xl`(max-w-4xl) / `fullscreen`(100vw × 100vh). Header/Footer: `border-b`/`border-t border-white/8`. Title: `font-display uppercase tracking-wider`. Description: `flex-1 overflow-y-auto`. Exports `dialogContentVariants`.
- **`Separator`** — `@radix-ui/react-separator`. 5 `variant` options: `default`(`bg-white/10`) / `subtle`(`bg-white/5`) / `strong`(`bg-white/25`) / `glow`(`bg-gradient-to-r from-transparent via-primary/40 to-transparent`) / `accent`(`bg-primary/30`). Horizontal: `h-px w-full`. Vertical: `w-px h-full`. `decorative=true` by default (removes from accessibility tree). Exports `separatorVariants`.
- **Test coverage** — 58 new tests added (400 total across 11 test files):
  - `__tests__/accordion-tabs.test.tsx` — 22 tests (Accordion: 11, Tabs: 11)
  - `__tests__/overlay.test.tsx` — 36 tests (Popover: 8, Dialog: 13, Separator: 13) — net 36 (2 files combined: 58 new tests total, previously 342, now 400)

### Changed

- **Docs site demos** updated to use real library imports (not inline HTML):
  - `DataDisplaySection.tsx` — Accordion section now uses `<Accordion>`, `<AccordionItem>`, `<AccordionTrigger>`, `<AccordionContent>` from `reend-components`; removed inline `useState<number | null>(0)` accordion state
  - `NavigationDemos.tsx` — Tabs section now uses `<Tabs>`, `<TabsList>`, `<TabsTrigger>`, `<TabsContent>` from `reend-components`; `TabsPlayground` updated to use real Tabs; removed `activeTab` state
  - `FeedbackSection.tsx` — Dialog section now uses real `<Dialog>` with trigger button + portal overlay; Popover/tooltip section uses real `<Popover>` component
  - `ContentMediaSection.tsx` — Dividers section now uses `<Separator>` with `variant="default"` and `variant="glow"`
- **Library bundle size** — 62.00 kB MJS / 44.86 kB CJS (under 70 kB Month 2 target)
- **`vite.lib.config.ts`** — Added all 5 Tier 3 Radix packages to `external` list: `@radix-ui/react-accordion`, `@radix-ui/react-tabs`, `@radix-ui/react-popover`, `@radix-ui/react-dialog`, `@radix-ui/react-separator`

### Fixed

- `separator.tsx` — Resolved TypeScript conflict where `orientation` prop was defined in both Radix's `ComponentPropsWithoutRef` and CVA's `VariantProps`. Fixed via `Omit<ComponentPropsWithoutRef<Root>, "orientation">` to let CVA's type take precedence; runtime resolves `null` to `"horizontal"` default.

---

## [0.2.0] - 2026-02-19

### Added

- **Signature Components** — 11 Endfield-exclusive components exported from the library (`src/components/ui/signature/`):
  - `GlitchText` — animated glitch text effect with `aria-hidden` decorative layers
  - `DiamondLoader` — rotating diamond loading spinner with `sm`/`md`/`lg` size variants
  - `TacticalPanel` — HUD-style content panel with `online`/`warning`/`offline`/`scanning` status indicator
  - `HoloCard` — holographic stat card with icon prop, optional value, and hover scan-line effect
  - `DataStream` — scrolling live data feed terminal with configurable messages and interval
  - `TacticalBadge` — CVA-powered status badge with `default`/`success`/`warning`/`danger`/`info` variants; exports `tacticalBadgeVariants` for extension
  - `WarningBanner` — alert banner with `caution`/`alert`/`critical` severity levels and icons
  - `ScanDivider` — animated scan-line section divider with optional label
  - `CoordinateTag` — HUD coordinate display tag with `label`, `value`, and optional `unit`
  - `RadarChart` — animated SVG radar/spider chart using framer-motion `useInView`; supports `primary`/`cyan` color modes
  - `HUDOverlay` — corner-bracket HUD overlay with optional crosshair, live clock, and coordinate display
- **Test coverage** — 89 tests across 4 test files: `tooltip.test.tsx`, `toast.test.tsx`, `sonner.test.tsx`, `signature.test.tsx`
- **CI/CD** — GitHub Actions workflow (`.github/workflows/ci.yml`):
  - `quality` job: lint + typecheck + test on every push to `main`/`develop`
  - `build` job: `build:lib` + dist existence checks + 100 kB bundle size gate
- **Tailwind preset** — Added to `src/tailwind-preset.ts`:
  - Keyframes: `glitch`, `cursor-blink`, `diamond-spin`, `diamond-spin-reverse`, `diamond-spin-inner`, `pulse-glow`, `scan-line`, `fade-in-up`, `slide-in-right`
  - Animation utilities: `animate-glitch`, `animate-cursor-blink`, `animate-diamond-spin`, `animate-pulse-glow`, `animate-scan-line`, `animate-fade-in-up`, `animate-slide-in-right`
  - Plugin utilities: `clip-corner`, `clip-corner-sm`, `clip-corner-lg`, `scanline-overlay`
  - Color token: `ef-pure-white`
- **Token additions** in `src/styles/variables.css`:
  - Animation ease tokens: `--ease-default`, `--ease-bounce`, `--ease-sharp`, `--ease-smooth`
  - Duration tokens: `--duration-instant` through `--duration-slower`
  - Shadow tokens: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-glow`
  - Z-index scale: `--z-base` through `--z-tooltip`
  - Light mode accent overrides for all `ef-*` color tokens

### Changed

- **Dependency cleanup** — moved 7 docs-site-only packages from `dependencies` → `devDependencies`:
  `i18next`, `i18next-browser-languagedetector`, `react-i18next`, `react-router-dom`, `shiki`, `fuse.js`, `react-error-boundary`.
  Consumers no longer receive these as transitive dependencies.
- **`react` / `react-dom`** — removed from `dependencies`; now only listed under `peerDependencies` (was erroneously in both, which could cause duplicate React instances)
- **`framer-motion` / `lucide-react`** — moved from `dependencies` → `devDependencies` (for the docs site) + `peerDependencies` as optional. Required only when using Signature components.
- **`peerDependenciesMeta`** — added `framer-motion` and `lucide-react` with `"optional": true` so package managers do not warn when they are absent
- **exports map** — fixed `require.types` pointing to non-existent `index.d.cts`; now correctly references `index.d.ts` for both ESM and CJS TypeScript consumers
- **`tsconfig.lib.json`** — excluded `*.test.tsx` / `*.spec.tsx` from declaration file generation so test files no longer produce spurious TypeScript errors during `build:lib`
- **README** — updated with value proposition block, Signature Components API table, peer dependency install instructions, and CI badge

### Fixed

- Signature components no longer use `useTranslation` — all i18n strings replaced with hardcoded English defaults or configurable props
- All Signature components implement `React.forwardRef` and set `displayName` for proper composability and React DevTools display

---

## [0.1.0] - 2026-02-17

### Added

- Initial library release
- **Core components**: `Tooltip`, `Toast`, `Toaster`, `SonnerToaster`
- **Utilities**: `cn()` (clsx + tailwind-merge), `useToast()` hook
- **Design token system** — `src/styles/variables.css` with `ef-*` color palette, `surface-*` layering, dark default / `.light` class override
- **Tailwind preset** — `src/tailwind-preset.ts` exported as `reend-components/tailwind`
- **Documentation site** — full SPA at [reend-components.pages.dev](https://reend-components.pages.dev)
- **Internationalization** — English and Bahasa Indonesia docs (16 namespaces, ~1,425 translation keys)
- **Dual build** — ESM (`index.mjs`) + CJS (`index.cjs`) + TypeScript declarations via `vite.lib.config.ts`

---

[1.1.0]: https://github.com/VBeatDead/ReEnd-Components/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/VBeatDead/ReEnd-Components/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/VBeatDead/ReEnd-Components/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/VBeatDead/ReEnd-Components/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/VBeatDead/ReEnd-Components/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/VBeatDead/ReEnd-Components/releases/tag/v0.1.0
