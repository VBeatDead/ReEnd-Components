# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **`RichTextEditor`** — Markdown WYSIWYG editor with toolbar (B/I/U/S/H1–H3/quote/list/link/image/divider), MARKDOWN/PREVIEW toggle, character count, and `maxLength` enforcement. Zero dependencies.
- **`SortControl`** — Sort options row with tri-state cycling (asc → desc → none), ▲/▼ direction indicators, Orbitron labels.
- **`PullToRefresh`** — Mobile pull-to-refresh with 5-phase state machine (idle → pulling → threshold → refreshing → complete), diamond spinner, haptic feedback.
- **`SwipeableItem`** — Touch-swipeable list item with left/right action reveal at 80px, auto-trigger at 160px, haptic feedback.
- **`FilterBar`** search slot — optional `searchPlaceholder`, `searchValue`, `onSearchChange` props added to `FilterBar` with ◆ diamond prefix icon.
- **`BottomSheet`** snap points — added `initialSnap` prop and drag-to-dismiss gesture (120px threshold) with pointer event handling on the drag handle.
- **CSS** — Search highlight: `mark` and `.search-highlight` styles (yellow tint + `--primary` text, light-mode variant).
- **CSS tokens** — Added `--ef-yellow-glow`, semantic text tokens (`--text-primary` through `--text-success`), border aliases (`--border-subtle`, `--border-default`), and font variable references (`--font-display`, `--font-ui`, `--font-mono`, `--font-body`, `--font-decorative`) to both `variables.css` and `index.css`.

### Changed
- **`OTPInput`** — Upgraded: Orbitron font (was JetBrains Mono), added `success` prop (green border + text), `onResend` + `resendCooldown` timer, updated box dimensions to 48×56px per spec.
- **`DatePicker`** — Full rewrite: custom calendar popover (was native `<input type="date">`). Diamond clip-path selected day, MO–SU headers, month navigation ◂/▸, TODAY/CLEAR footer, `minDate`/`maxDate` support.
- **`FileUpload`** — Added `drag-invalid` state (8th visual state), per-file item list with 80×80px image thumbnails, 3px progress bar per file, Orbitron filename + size display.

### Fixed
- **FileUpload** demo added to docs site — component was missing from OverlayUtilitySection and sidebar navigation.
- **Light mode color compliance** — replaced 37 hardcoded hex colors in `rich-text-editor.tsx`, `file-upload.tsx`, `date-picker.tsx`, and `alert.tsx` with semantic CSS tokens (`text-foreground`, `text-muted-foreground`, `bg-surface-2`, `border-border`, etc.).
- **`RatingProps.onChange`** — resolved type conflict with `HTMLAttributes<HTMLDivElement>.onChange` via `Omit` pattern.
- **`SessionTimeoutModal`** — fixed `variant="default"` → `variant="primary"` to match Button API.
- **Empty interface lint errors** — converted `interface X extends Y {}` to `type X = Y` in `list.tsx` and `stat.tsx`.
- **Test polyfill** — added `PointerEvent` polyfill to `src/test/setup.ts` so pointer-gesture components (`SwipeableItem`, `BottomSheet`) can be tested in jsdom.

## [1.1.0] - 2026-02-21

### BREAKING CHANGES

- **`--z-popover` removed** — use `--z-dropdown` instead. Z-index values scaled 10×–57× (relative order preserved).
- **`--duration-slower` changed** — from `700ms` to `800ms`. Update any hardcoded `700ms` timing.
- **Z-index scale change** — all z-index values have been updated: `dropdown: 10→100`, `sticky: 20→200`, `overlay: 30→1500`, `modal: 40→2000`, `toast: 60→3000`, `tooltip: 70→4000`. Update any custom z-index overrides.
- **Sonner error toast** — error toasts no longer auto-dismiss (`duration: Infinity`). Add explicit close button if needed.

### Added

#### Design Tokens
- New z-index tokens: `--z-below (-1)`, `--z-raised (1)`, `--z-header (1000)`, `--z-max (9999)`
- Soft color tokens: `--ef-red-soft`, `--ef-green-soft`, `--ef-orange-soft`
- Opacity scale: `--opacity-overlay`, `--opacity-hover`, `--opacity-disabled`, `--opacity-border`, `--opacity-focus`, `--opacity-muted`
- Gradient tokens: `--ef-gradient-primary`, `--ef-gradient-overlay`, `--ef-gradient-line`, `--ef-gradient-card-hover`, `--ef-gradient-scanline`
- Chart color palette: `--chart-1` through `--chart-8`
- Breakpoint reference tokens: `--bp-mobile`, `--bp-tablet`, `--bp-laptop`, `--bp-desktop`, `--bp-wide`

#### Tailwind Preset
- Chart colors: `chart-1` through `chart-8` in Tailwind color palette
- Opacity utilities: `opacity-overlay`, `opacity-hover`, `opacity-disabled`, `opacity-border`, `opacity-focus`, `opacity-muted`
- New keyframes: `slideUp`, `shake`
- New animations: `animate-slide-up`, `animate-shake`
- New z-index classes: `z-below`, `z-raised`, `z-header`, `z-max`

#### CSS Utilities
- `.panel-glass`, `.panel-glass-light`, `.panel-glass-dark` — glassmorphism panels with backdrop-filter
- `mark` — search highlight styling (yellow tint, `--primary` text)
- `.spoiler` — click-to-reveal hidden text with data-revealed state
- Print utilities: `.print-hidden`, `.print-only`, `.print-break-before`, `.print-break-after`, `.print-no-break`

#### New Components (P1)
- **`ViewToggle`** — Grid/List view toggle with localStorage persistence
- **`FilterBar`** + **`FilterChip`** — Filter bar with multi-select dropdowns, active chips, and clear-all
- **`OTPInput`** — OTP/PIN input with auto-advance, paste support, and shake-on-error animation
- **`DatePicker`** — Native date input with Endfield styling, size variants, and error state

#### New Components (P2)
- **`Rating`** — Diamond ◆/◇ rating with hover preview, keyboard navigation, and ARIA slider role
- **`SessionTimeoutModal`** — Session expiry modal with embedded CountdownTimer
- **`FileUpload`** — Drag-and-drop upload zone with 8 visual states and image previews
- **`BottomSheet`** — Portal-rendered bottom sheet with slide-up animation and backdrop
- **`Carousel`** + **`CarouselItem`** — CSS scroll-snap carousel with ◆/◇ dot indicators and arrow navigation
- **`ResizeHandle`**, **`Panel`**, **`PanelGroup`**, **`PanelResizeHandle`** — Resizable panel layout via `react-resizable-panels`
- **`CHART_COLORS`**, **`endfieldChartTheme`** — Recharts integration with Endfield design tokens

#### Card Variants
- **`OperatorCard`** — Portrait 3:4 card with rarity ◆/◇ diamonds, name, faction
- **`LinkCard`** — Icon + title + arrow card for navigation

#### Sonner (`notify` helper)
- New `notify` export: `notify.info()`, `notify.success()`, `notify.warning()`, `notify.error()` with preset durations
- Sonner now configured with `richColors`, `closeButton`, `visibleToasts={3}`, `pauseWhenPageIsHidden`

#### Dependencies
- Added `react-resizable-panels` (^4.x) as optional peer dep
- Added `recharts` (^3.x) as optional peer dep

### Changed

- `--duration-slower`: `700ms` → `800ms` (both `variables.css` and `index.css`)
- Z-index values corrected to match PRD spec (see BREAKING CHANGES above)
- Sonner `Toaster` now has `richColors`, `closeButton`, `duration=4000`, `visibleToasts=3`

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
- **`.gitignore`** — added `CLAUDE.md` (AI instruction file, kept local only)

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
- **`.gitignore`** — Added `CLAUDE.md` entry so local AI instruction file is never tracked by git

### Fixed

- `separator.tsx` — Resolved TypeScript conflict where `orientation` prop was defined in both Radix's `ComponentPropsWithoutRef` and CVA's `VariantProps`. Fixed via `Omit<ComponentPropsWithoutRef<Root>, "orientation">` to let CVA's type take precedence; runtime resolves `null` to `"horizontal"` default.

## [Unreleased — Tier 2, v0.2.x pre-release]

### Added

- **`Checkbox`** — `@radix-ui/react-checkbox` powered. Square 18×18px border-2. Unchecked: `border-white/25` / hover `border-primary/60`. Checked: `bg-primary` + `◆` indicator. Indeterminate: `bg-primary/50` + `−` indicator. `label` + `helperText` props. Focus ring yellow. Disabled: `opacity-40`.
- **`RadioGroup`** + **`RadioGroupItem`** — `@radix-ui/react-radio-group`. Diamond swap: `◇` (muted) unchecked → `◆` (primary) checked via `group-data-[state=...]` Tailwind. `label` + `helperText` props on item.
- **`Switch`** — `@radix-ui/react-switch`. Square 44×24px track (`rounded-none`). Off: `bg-white/10 border-white/15`. On: `bg-primary`. Thumb: `w-5 h-5 bg-white translate-x-5` on checked. `label`, `offLabel`, `onLabel` props.
- **`Select`** — `@radix-ui/react-select`. Full sub-component API: `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`. Trigger styled like `Input` (border/focus/disabled states consistent). Content: `bg-surface-2`. Item: yellow hover. `danger` prop on item for destructive actions. Uses `▾`/`▴` text chars (no lucide-react dependency).
- **`Avatar`** + **`AvatarImage`** + **`AvatarFallback`** — `@radix-ui/react-avatar`. `clip-corner-sm` shape (NOT circle). 6 sizes: `xs`(24px) / `sm`(32px) / `md`(40px) / `lg`(56px) / `xl`(80px) / `2xl`(120px). Status diamond dot `◆` at bottom-right: `online`(`ef-green`) / `offline`(`muted`) / `busy`(`destructive`) / `away`(`ef-orange`). Exports `avatarVariants`.
- **`Progress`** — `@radix-ui/react-progress`. 4 color variants: `default`(primary) / `success`(ef-green) / `danger`(destructive) / `info`(ef-blue). 3 sizes: `sm`(h-1) / `md`(h-1.5, default) / `lg`(h-2.5). `showLabel` shows right-aligned `font-mono` percent. Indeterminate: `animate-skeleton` shimmer. Fill uses `ease-smooth` transition. Value auto-clamped 0–100. Exports `progressTrackVariants`, `progressFillVariants`.
- **Test coverage** — 73 new tests added (342 total across 9 test files):
  - `__tests__/interactive.test.tsx` — 41 tests (Checkbox, RadioGroup, Switch, Select)
  - `__tests__/display.test.tsx` — 32 tests (Avatar, Progress)

### Changed

- **Docs site demos** updated to use real library imports (not inline HTML):
  - `FormsDemo.tsx` — Checkbox/Radio sections now use `<Checkbox>`, `<RadioGroup>`, `<RadioGroupItem>`; Toggle now uses `<Switch>`; Select dropdown uses `<Select>`, `<SelectTrigger>`, etc. from `reend-components`
  - `DataDisplaySection.tsx` — Avatar and Progress sections now use real `<Avatar>` / `<Progress>` library components
- **Library bundle size** — 53.13 kB MJS / 37.85 kB CJS (under 70 kB Month 2 target)
- **`vite.lib.config.ts`** — Added all 6 Tier 2 Radix packages to `external` list: `@radix-ui/react-checkbox`, `@radix-ui/react-radio-group`, `@radix-ui/react-switch`, `@radix-ui/react-select`, `@radix-ui/react-avatar`, `@radix-ui/react-progress`

- **`Button`** — 6 CVA variants (`primary`, `secondary`, `ghost`, `danger`, `link`, `icon`) + 5 size variants (`xs`, `sm`, `md`, `lg`, `xl`) + `loading` state (diamond spinner, `aria-busy`, `disabled`) + `asChild` via `@radix-ui/react-slot`. Exports `buttonVariants`.
- **`Badge`** — 7 color variants (`default`, `primary`, `info`, `success`, `warning`, `danger`, `purple`) + `removable` prop with `onRemove` callback (`stopPropagation` handled). Exports `badgeVariants`.
- **`Card`** — Root component with corner bracket decoration (top-left + bottom-right via Tailwind `before:`/`after:` pseudo-element utilities), `hoverable` (lift + shadow + bracket intensify on hover) and `selected` (yellow border + subtle background) boolean variants. Exports `cardVariants`.
  - `CardHeader` — flex layout container for title + action slots
  - `CardMeta` — overline label (`font-mono 10px uppercase tracking-[0.15em] text-primary`)
  - `CardTitle` — display heading (`font-display text-sm font-bold uppercase`)
  - `CardDescription` — muted body text (`text-sm text-muted-foreground leading-relaxed`)
  - `CardBody` — main content area with `p-5` padding
  - `CardFooter` — action row with `border-t border-border` separator
- **`Input`** — Single-line text input built as a flex wrapper div (border + state on wrapper, inner `<input>` transparent). Props: `state` (`default`/`error`/`success`), `size` (`sm`=32px / `md`=44px / `lg`=52px), `leftElement`, `rightElement`. Focus ring: yellow glow (`rgba(255,212,41,0.1)`). Error ring: red glow (`rgba(255,71,87,0.1)`). Disabled: `opacity-40 cursor-not-allowed pointer-events-none`. Uses `Omit<InputHTMLAttributes, "size">` to avoid HTML `size` attr collision. Exports `inputWrapperVariants`.
- **`Label`** — Form label (`font-display 11px uppercase tracking-widest text-muted-foreground`). `forwardRef` to `<label>`.
- **`HelperText`** — Supporting text below inputs. `state` prop drives color: `default`→`text-muted-foreground`, `error`→`text-destructive`, `success`→`text-ef-green`. Font: `12px`.
- **`Textarea`** — Multi-line input with all states matching `Input`. `resize-y`, `min-h-[120px]`. `showCount` prop shows character counter (bottom-right, `font-mono 11px`): muted below 80%, `text-ef-orange` at ≥80%, `text-destructive` above `maxLength`. Supports both controlled and uncontrolled usage. Exports `textareaVariants`.
- **Test coverage** — 180 new tests added (269 total across 7 test files):
  - `__tests__/button-badge.test.tsx` — 48 tests (Button + Badge)
  - `__tests__/card.test.tsx` — 42 tests (Card + all 6 sub-components + composition)
  - `__tests__/form.test.tsx` — 79 tests (Input, Label, HelperText, Textarea, composition)

### Changed

- **Docs site demos** updated to use real library imports (not inline HTML):
  - `ButtonsDemo.tsx` — uses `<Button>` from `reend-components`
  - `CardsDemo.tsx` — uses `<Card>`, `<CardBody>`, `<CardMeta>`, `<CardTitle>`, `<CardDescription>` from `reend-components`
  - `FormsDemo.tsx` — uses `<Input>`, `<Label>`, `<HelperText>`, `<Textarea>` from `reend-components`; password field uses `rightElement` slot for eye toggle; search field uses `leftElement` + `rightElement` slots; textarea demo shows live character counter
- **Library bundle size** — 39.70 kB MJS / 27.90 kB CJS (well under 50 kB Month 1 target)
- **`npx tsc --noEmit`** — zero TypeScript errors across all source files and test files

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

[Unreleased]: https://github.com/VBeatDead/ReEnd-Components/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/VBeatDead/ReEnd-Components/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/VBeatDead/ReEnd-Components/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/VBeatDead/ReEnd-Components/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/VBeatDead/ReEnd-Components/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/VBeatDead/ReEnd-Components/releases/tag/v0.1.0
