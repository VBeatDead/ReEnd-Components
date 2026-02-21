export interface ComponentEntry {
  name: string;
  displayName: string;
  type: "core" | "signature";
  files: string[];
  deps: string[];
  description: string;
}

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/VBeatDead/ReEnd-Components/main/src/components/ui";

export const REGISTRY: Record<string, ComponentEntry> = {
  // ── Core (Tier 1) ───────────────────────────────────────────────────────
  button: {
    name: "button",
    displayName: "Button",
    type: "core",
    files: ["button.tsx"],
    deps: ["@radix-ui/react-slot"],
    description: "6 variants, 5 sizes, loading state, asChild support",
  },
  badge: {
    name: "badge",
    displayName: "Badge",
    type: "core",
    files: ["badge.tsx"],
    deps: [],
    description: "7 color variants, removable with onRemove callback",
  },
  card: {
    name: "card",
    displayName: "Card",
    type: "core",
    files: ["card.tsx"],
    deps: [],
    description: "Corner bracket decoration with 6 sub-components",
  },
  input: {
    name: "input",
    displayName: "Input",
    type: "core",
    files: ["input.tsx"],
    deps: [],
    description: "Text input + Label + HelperText, 3 states, element slots",
  },
  textarea: {
    name: "textarea",
    displayName: "Textarea",
    type: "core",
    files: ["textarea.tsx"],
    deps: [],
    description: "Multi-line input with showCount character counter",
  },

  // ── Core (Tier 2) ───────────────────────────────────────────────────────
  checkbox: {
    name: "checkbox",
    displayName: "Checkbox",
    type: "core",
    files: ["checkbox.tsx"],
    deps: ["@radix-ui/react-checkbox"],
    description: "Square checkbox with ◆ indicator, indeterminate state",
  },
  "radio-group": {
    name: "radio-group",
    displayName: "RadioGroup",
    type: "core",
    files: ["radio-group.tsx"],
    deps: ["@radix-ui/react-radio-group"],
    description: "Diamond ◇→◆ radio group",
  },
  switch: {
    name: "switch",
    displayName: "Switch",
    type: "core",
    files: ["switch.tsx"],
    deps: ["@radix-ui/react-switch"],
    description: "Square track toggle with label props",
  },
  select: {
    name: "select",
    displayName: "Select",
    type: "core",
    files: ["select.tsx"],
    deps: ["@radix-ui/react-select"],
    description: "Full dropdown with 10 sub-components",
  },
  avatar: {
    name: "avatar",
    displayName: "Avatar",
    type: "core",
    files: ["avatar.tsx"],
    deps: ["@radix-ui/react-avatar"],
    description: "clip-corner-sm avatar, 6 sizes, status dot",
  },
  progress: {
    name: "progress",
    displayName: "Progress",
    type: "core",
    files: ["progress.tsx"],
    deps: ["@radix-ui/react-progress"],
    description: "4 variants, indeterminate shimmer, showLabel",
  },

  // ── Core (Tier 3) ───────────────────────────────────────────────────────
  accordion: {
    name: "accordion",
    displayName: "Accordion",
    type: "core",
    files: ["accordion.tsx"],
    deps: ["@radix-ui/react-accordion"],
    description: "+/− indicator accordion with smooth animation",
  },
  tabs: {
    name: "tabs",
    displayName: "Tabs",
    type: "core",
    files: ["tabs.tsx"],
    deps: ["@radix-ui/react-tabs"],
    description: "3 variants: underline/pill/bordered",
  },
  popover: {
    name: "popover",
    displayName: "Popover",
    type: "core",
    files: ["popover.tsx"],
    deps: ["@radix-ui/react-popover"],
    description: "Floating content panel with fade-in-up animation",
  },
  dialog: {
    name: "dialog",
    displayName: "Dialog",
    type: "core",
    files: ["dialog.tsx"],
    deps: ["@radix-ui/react-dialog"],
    description: "Modal with 5 size variants, backdrop-blur",
  },
  separator: {
    name: "separator",
    displayName: "Separator",
    type: "core",
    files: ["separator.tsx"],
    deps: ["@radix-ui/react-separator"],
    description: "5 style variants, horizontal/vertical",
  },
  tooltip: {
    name: "tooltip",
    displayName: "Tooltip",
    type: "core",
    files: ["tooltip.tsx"],
    deps: ["@radix-ui/react-tooltip"],
    description: "Tooltip with Radix primitives",
  },

  // ── Core (Tier 6 — Extended) ────────────────────────────────────────────
  skeleton: {
    name: "skeleton",
    displayName: "Skeleton",
    type: "core",
    files: ["skeleton.tsx"],
    deps: [],
    description: "SkeletonLine/Text/Avatar/Card with shimmer animation",
  },
  "empty-state": {
    name: "empty-state",
    displayName: "EmptyState",
    type: "core",
    files: ["empty-state.tsx"],
    deps: [],
    description: "5 preset variants: search/error/permission/empty/default",
  },
  alert: {
    name: "alert",
    displayName: "Alert",
    type: "core",
    files: ["alert.tsx"],
    deps: [],
    description: "4 variants: info/success/warning/error, dismissible, ARIA",
  },
  timeline: {
    name: "timeline",
    displayName: "Timeline",
    type: "core",
    files: ["timeline.tsx"],
    deps: [],
    description: "Diamond node timeline with ◆/◇ status markers",
  },
  stepper: {
    name: "stepper",
    displayName: "Stepper",
    type: "core",
    files: ["stepper.tsx"],
    deps: [],
    description: "Step progress indicator, horizontal/vertical orientation",
  },
  pagination: {
    name: "pagination",
    displayName: "Pagination",
    type: "core",
    files: ["pagination.tsx"],
    deps: [],
    description: "Page navigation with ◆ PREV/NEXT and ellipsis",
  },
  breadcrumb: {
    name: "breadcrumb",
    displayName: "Breadcrumb",
    type: "core",
    files: ["breadcrumb.tsx"],
    deps: [],
    description: "Navigation trail with › separator, aria-current",
  },
  "number-input": {
    name: "number-input",
    displayName: "NumberInput",
    type: "core",
    files: ["number-input.tsx"],
    deps: [],
    description: "+/− stepper input with min/max/step, keyboard support",
  },

  // ── Signature (Phase 0) ─────────────────────────────────────────────────
  "glitch-text": {
    name: "glitch-text",
    displayName: "GlitchText",
    type: "signature",
    files: ["signature/glitch-text.tsx"],
    deps: [],
    description: "Animated glitch text with intensity/continuous mode",
  },
  "diamond-loader": {
    name: "diamond-loader",
    displayName: "DiamondLoader",
    type: "signature",
    files: ["signature/diamond-loader.tsx"],
    deps: [],
    description: "Rotating diamond loading spinner, sm/md/lg sizes",
  },
  "tactical-panel": {
    name: "tactical-panel",
    displayName: "TacticalPanel",
    type: "signature",
    files: ["signature/tactical-panel.tsx"],
    deps: [],
    description: "HUD-style panel with status, headerAction, collapsible",
  },
  "holo-card": {
    name: "holo-card",
    displayName: "HoloCard",
    type: "signature",
    files: ["signature/holo-card.tsx"],
    deps: ["framer-motion"],
    description: "Holographic stat card with tilt hover effect",
  },
  "data-stream": {
    name: "data-stream",
    displayName: "DataStream",
    type: "signature",
    files: ["signature/data-stream.tsx"],
    deps: [],
    description: "Scrolling data feed terminal with speed/messageType",
  },
  "tactical-badge": {
    name: "tactical-badge",
    displayName: "TacticalBadge",
    type: "signature",
    files: ["signature/tactical-badge.tsx"],
    deps: [],
    description: "Status badge with 5 CVA variants",
  },
  "warning-banner": {
    name: "warning-banner",
    displayName: "WarningBanner",
    type: "signature",
    files: ["signature/warning-banner.tsx"],
    deps: [],
    description: "Alert banner with caution/alert/critical severity",
  },
  "scan-divider": {
    name: "scan-divider",
    displayName: "ScanDivider",
    type: "signature",
    files: ["signature/scan-divider.tsx"],
    deps: [],
    description: "Animated scan-line section divider",
  },
  "coordinate-tag": {
    name: "coordinate-tag",
    displayName: "CoordinateTag",
    type: "signature",
    files: ["signature/coordinate-tag.tsx"],
    deps: [],
    description: "HUD coordinate display tag",
  },
  "radar-chart": {
    name: "radar-chart",
    displayName: "RadarChart",
    type: "signature",
    files: ["signature/radar-chart.tsx"],
    deps: ["framer-motion"],
    description: "Animated SVG radar chart, multi-dataset, showLegend",
  },
  "hud-overlay": {
    name: "hud-overlay",
    displayName: "HUDOverlay",
    type: "signature",
    files: ["signature/hud-overlay.tsx"],
    deps: [],
    description: "Corner-bracket HUD overlay with scanlines, noise, children",
  },

  // ── Signature ────────────────────────────────────────────
  "mission-card": {
    name: "mission-card",
    displayName: "MissionCard",
    type: "signature",
    files: ["signature/mission-card.tsx"],
    deps: [],
    description: "Mission briefing card with priority/status variants",
  },
  "operator-card": {
    name: "operator-card",
    displayName: "OperatorCard",
    type: "signature",
    files: ["signature/operator-card.tsx"],
    deps: [],
    description: "Character card with rarity stars and stat bars",
  },
  "status-bar": {
    name: "status-bar",
    displayName: "StatusBar",
    type: "signature",
    files: ["signature/status-bar.tsx"],
    deps: [],
    description: "Segmented health/energy bar, 4 variants, auto color",
  },
  "command-output": {
    name: "command-output",
    displayName: "CommandOutput",
    type: "signature",
    files: ["signature/command-output.tsx"],
    deps: [],
    description: "Terminal-style log display with 5 log levels",
  },
  "tactical-table": {
    name: "tactical-table",
    displayName: "TacticalTable",
    type: "signature",
    files: ["signature/tactical-table.tsx"],
    deps: [],
    description: "HUD data table with sort, selection, sticky header",
  },
  "matrix-grid": {
    name: "matrix-grid",
    displayName: "MatrixGrid",
    type: "signature",
    files: ["signature/matrix-grid.tsx"],
    deps: [],
    description: "Animated dot grid background decoration",
  },
  "frequency-bars": {
    name: "frequency-bars",
    displayName: "FrequencyBars",
    type: "signature",
    files: ["signature/frequency-bars.tsx"],
    deps: [],
    description: "Audio visualizer bar decoration with CSS animation",
  },
  "countdown-timer": {
    name: "countdown-timer",
    displayName: "CountdownTimer",
    type: "signature",
    files: ["signature/countdown-timer.tsx"],
    deps: [],
    description: "Tactical mission countdown, onComplete, 3 sizes",
  },
};

export function getFileUrl(filePath: string, ref = "main"): string {
  return `${GITHUB_RAW_BASE.replace("main", ref)}/${filePath}`;
}

export function getComponentNames(type?: "core" | "signature"): string[] {
  if (!type) return Object.keys(REGISTRY);
  return Object.keys(REGISTRY).filter((k) => REGISTRY[k].type === type);
}
