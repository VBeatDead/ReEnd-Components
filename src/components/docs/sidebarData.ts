export interface SidebarSection {
  title: string;
  items: { id: string; label: string }[];
}

export const sidebarData: SidebarSection[] = [
  {
    title: "FOUNDATIONS",
    items: [
      { id: "design-philosophy", label: "Design Philosophy" },
      { id: "color-system", label: "Color System" },
      { id: "typography", label: "Typography" },
      { id: "spacing-grid", label: "Spacing & Grid" },
      { id: "background-surface", label: "Background & Surface" },
      { id: "iconography", label: "Iconography" },
      { id: "illustration", label: "Illustration Style" },
    ],
  },
  {
    title: "CORE COMPONENTS",
    items: [
      { id: "buttons", label: "Buttons" },
      { id: "cards", label: "Cards" },
      { id: "tactical-panel", label: "Tactical Panel" },
      { id: "holo-card", label: "Holo Card" },
      { id: "forms-input", label: "Forms & Input" },
      { id: "nav-header", label: "Nav — Header" },
      { id: "nav-sidebar", label: "Nav — Sidebar" },
      { id: "nav-tabs", label: "Nav — Tabs" },
      { id: "nav-breadcrumb", label: "Nav — Breadcrumb" },
      { id: "nav-pagination", label: "Nav — Pagination" },
      { id: "footer", label: "Footer" },
    ],
  },
  {
    title: "DATA DISPLAY",
    items: [
      { id: "table", label: "Table" },
      { id: "list", label: "List & List Item" },
      { id: "stat-metric", label: "Stat & Metric" },
      { id: "tactical-badge", label: "Tactical Badge" },
      { id: "coordinate-tag", label: "Coordinate Tag" },
      { id: "radar-chart", label: "Radar Chart" },
      { id: "timeline", label: "Timeline" },
      { id: "accordion", label: "Accordion" },
      { id: "avatar", label: "Avatar" },
      { id: "tags-badges", label: "Tags & Badges" },
      { id: "progress-stepper", label: "Progress & Stepper" },
    ],
  },
  {
    title: "FEEDBACK & STATES",
    items: [
      { id: "toast-notification", label: "Toast / Notification" },
      { id: "modal-dialog", label: "Modal & Dialog" },
      { id: "tooltip-popover", label: "Tooltip & Popover" },
      { id: "diamond-loader", label: "Diamond Loader" },
      { id: "loading-skeleton", label: "Loading & Skeleton" },
      { id: "warning-banner", label: "Warning Banner" },
      { id: "empty-state", label: "Empty State" },
      { id: "error-pages", label: "Error Pages" },
      { id: "offline-state", label: "Offline State" },
      { id: "success-state", label: "Success State" },
      { id: "inline-validation", label: "Inline Validation" },
      { id: "banner-alert", label: "Banner & Alert" },
    ],
  },
  {
    title: "INTERACTIVE STATES",
    items: [
      { id: "states-matrix", label: "States Matrix" },
      { id: "micro-interactions", label: "Micro-Interactions" },
      { id: "hover-effects", label: "Hover Effects" },
      { id: "focus-keyboard", label: "Focus & Keyboard" },
      { id: "drag-drop", label: "Drag & Drop" },
      { id: "selection", label: "Selection" },
    ],
  },
  {
    title: "CONTENT & MEDIA",
    items: [
      { id: "hero-section", label: "Hero Section" },
      { id: "glitch-text", label: "Glitch Text" },
      { id: "data-stream", label: "Data Stream" },
      { id: "code-block-terminal", label: "Code Block & Terminal" },
      { id: "scan-divider", label: "Scan Divider" },
      { id: "topo-pattern", label: "Topographic Pattern" },
      { id: "hud-overlay", label: "HUD Overlay" },
      { id: "blog-layout", label: "Blog Layout" },
      { id: "image-media", label: "Image & Media" },
      { id: "video-player", label: "Video Player" },
      { id: "dividers", label: "Dividers" },
      { id: "scroll-cursor", label: "Scroll & Cursor" },
    ],
  },
  {
    title: "OVERLAY & UTILITY",
    items: [
      { id: "command-palette", label: "Command Palette" },
      { id: "cookie-consent", label: "Cookie Consent" },
      { id: "back-to-top", label: "Back to Top" },
      { id: "copy-clipboard", label: "Copy to Clipboard" },
      { id: "dropdown", label: "Dropdown" },
      { id: "context-menu", label: "Context Menu" },
    ],
  },
  {
    title: "ANIMATION",
    items: [
      { id: "animation-system", label: "Animation System" },
      { id: "page-transitions", label: "Page Transitions" },
      { id: "scroll-animations", label: "Scroll Animations" },
      { id: "particle-effects", label: "Particle Effects" },
    ],
  },
  {
    title: "CONTENT STRATEGY",
    items: [
      { id: "voice-tone", label: "Voice & Tone" },
      { id: "microcopy", label: "Microcopy" },
      { id: "placeholder-standards", label: "Placeholder Standards" },
      { id: "error-message-writing", label: "Error Message Writing" },
      { id: "date-time-number", label: "Date/Time/Number" },
      { id: "truncation-overflow", label: "Truncation & Overflow" },
    ],
  },
  {
    title: "PATTERNS",
    items: [
      { id: "page-templates", label: "Page Templates" },
      { id: "section-patterns", label: "Section Patterns" },
      { id: "responsive", label: "Responsive" },
      { id: "accessibility", label: "Accessibility" },
      { id: "performance", label: "Performance" },
      { id: "design-tokens", label: "Design Tokens" },
      { id: "naming-conventions", label: "Naming Conventions" },
    ],
  },
  {
    title: "SYSTEM",
    items: [{ id: "changelog", label: "Changelog" }],
  },
];
