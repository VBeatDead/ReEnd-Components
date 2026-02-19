# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/VBeatDead/ReEnd-Components/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/VBeatDead/ReEnd-Components/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/VBeatDead/ReEnd-Components/releases/tag/v0.1.0
