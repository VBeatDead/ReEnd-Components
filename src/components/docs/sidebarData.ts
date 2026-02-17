export interface SidebarSection {
  title: string;
  slug: string;
  description: string;
  items: { id: string; label: string; signature?: boolean }[];
}

export const sidebarData: SidebarSection[] = [
  {
    title: "INSTALLATION",
    slug: "installation",
    description:
      "Getting started, installation guide, configuration, and API reference.",
    items: [
      { id: "getting-started", label: "Getting Started" },
      { id: "install-package", label: "Install Package" },
      { id: "tailwind-setup", label: "Tailwind Setup" },
      { id: "import-styles", label: "Import Styles" },
      { id: "use-components", label: "Use Components" },
      { id: "api-reference", label: "API Reference" },
      { id: "theming-guide", label: "Theming & Customization" },
      { id: "full-example", label: "Full Project Example" },
    ],
  },
  {
    title: "FOUNDATIONS",
    slug: "foundations",
    description:
      "Color system, typography, spacing, surface tokens, dan visual language dasar.",
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
    slug: "core-components",
    description:
      "Buttons, cards, forms, navigation, dan komponen inti lainnya.",
    items: [
      { id: "buttons", label: "Buttons" },
      { id: "cards", label: "Cards" },
      { id: "forms-input", label: "Forms & Input" },
      { id: "nav-header", label: "Nav — Header" },
      { id: "nav-sidebar", label: "Nav — Sidebar" },
      { id: "nav-tabs", label: "Nav — Tabs" },
      { id: "nav-breadcrumb", label: "Nav — Breadcrumb" },
      { id: "nav-pagination", label: "Nav — Pagination" },
      { id: "footer", label: "Footer" },
      { id: "tactical-panel", label: "Tactical Panel", signature: true },
      { id: "holo-card", label: "Holo Card", signature: true },
    ],
  },
  {
    title: "DATA DISPLAY",
    slug: "data-display",
    description:
      "Table, list, chart, badge, timeline, dan komponen visualisasi data.",
    items: [
      { id: "table", label: "Table" },
      { id: "list", label: "List & List Item" },
      { id: "stat-metric", label: "Stat & Metric" },
      { id: "timeline", label: "Timeline" },
      { id: "accordion", label: "Accordion" },
      { id: "avatar", label: "Avatar" },
      { id: "tags-badges", label: "Tags & Badges" },
      { id: "progress-stepper", label: "Progress & Stepper" },
      { id: "tactical-badge", label: "Tactical Badge", signature: true },
      { id: "coordinate-tag", label: "Coordinate Tag", signature: true },
      { id: "radar-chart", label: "Radar Chart", signature: true },
    ],
  },
  {
    title: "FEEDBACK & STATES",
    slug: "feedback",
    description:
      "Toast, modal, tooltip, loading state, error handling, dan feedback UI.",
    items: [
      { id: "toast-notification", label: "Toast / Notification" },
      { id: "modal-dialog", label: "Modal & Dialog" },
      { id: "tooltip-popover", label: "Tooltip & Popover" },
      { id: "loading-skeleton", label: "Loading & Skeleton" },
      { id: "empty-state", label: "Empty State" },
      { id: "error-pages", label: "Error Pages" },
      { id: "offline-state", label: "Offline State" },
      { id: "success-state", label: "Success State" },
      { id: "inline-validation", label: "Inline Validation" },
      { id: "banner-alert", label: "Banner & Alert" },
      { id: "diamond-loader", label: "Diamond Loader", signature: true },
      { id: "warning-banner", label: "Warning Banner", signature: true },
    ],
  },
  {
    title: "INTERACTIVE STATES",
    slug: "interactive",
    description:
      "Hover, focus, drag & drop, selection, dan micro-interaction states.",
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
    slug: "content-media",
    description:
      "Hero section, code block, blog layout, image, video, dan content display.",
    items: [
      { id: "hero-section", label: "Hero Section" },
      { id: "code-block-terminal", label: "Code Block & Terminal" },
      { id: "blog-layout", label: "Blog Layout" },
      { id: "image-media", label: "Image & Media" },
      { id: "video-player", label: "Video Player" },
      { id: "dividers", label: "Dividers" },
      { id: "scroll-cursor", label: "Scroll & Cursor" },
      { id: "glitch-text", label: "Glitch Text", signature: true },
      { id: "data-stream", label: "Data Stream", signature: true },
      { id: "scan-divider", label: "Scan Divider", signature: true },
      { id: "topo-pattern", label: "Topographic Pattern", signature: true },
      { id: "hud-overlay", label: "HUD Overlay", signature: true },
    ],
  },
  {
    title: "OVERLAY & UTILITY",
    slug: "overlay-utility",
    description:
      "Command palette, dropdown, context menu, dan utility components.",
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
    slug: "animation",
    description:
      "Animation system, page transitions, scroll effects, dan particle systems.",
    items: [
      { id: "animation-system", label: "Animation System" },
      { id: "page-transitions", label: "Page Transitions" },
      { id: "scroll-animations", label: "Scroll Animations" },
      { id: "particle-effects", label: "Particle Effects" },
    ],
  },
  {
    title: "CONTENT STRATEGY",
    slug: "content-strategy",
    description:
      "Voice & tone, microcopy, placeholder, error messages, dan content guidelines.",
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
    slug: "patterns",
    description:
      "Page templates, responsive patterns, accessibility, performance, dan design tokens.",
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
    title: "CHANGELOG",
    slug: "changelog",
    description: "Riwayat perubahan dan release notes.",
    items: [{ id: "changelog", label: "Changelog" }],
  },
];

// Helper: build id → slug mapping for navigation
export const idToSlugMap: Record<string, string> = {};
sidebarData.forEach((section) => {
  section.items.forEach((item) => {
    idToSlugMap[item.id] = section.slug;
  });
});
