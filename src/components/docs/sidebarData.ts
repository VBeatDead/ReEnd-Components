import type { TFunction } from "i18next";

export interface SidebarSection {
  title: string;
  slug: string;
  description: string;
  items: { id: string; label: string; signature?: boolean }[];
}

interface SectionDef {
  slug: string;
  items: { id: string; signature?: boolean }[];
}

const sectionDefs: SectionDef[] = [
  {
    slug: "installation",
    items: [
      { id: "getting-started" },
      { id: "install-package" },
      { id: "cli-usage" },
      { id: "tailwind-setup" },
      { id: "import-styles" },
      { id: "use-components" },
      { id: "api-reference" },
      { id: "theming-guide" },
      { id: "full-example" },
    ],
  },
  {
    slug: "foundations",
    items: [
      { id: "design-philosophy" },
      { id: "color-system" },
      { id: "typography" },
      { id: "spacing-grid" },
      { id: "background-surface" },
      { id: "iconography" },
      { id: "illustration" },
      { id: "panel-glass" },
      { id: "glow-shadows" },
      { id: "search-highlight" },
    ],
  },
  {
    slug: "core-components",
    items: [
      { id: "buttons" },
      { id: "cards" },
      { id: "operator-card" },
      { id: "link-card" },
      { id: "forms-input" },
      { id: "number-input" },
      { id: "accordion" },
      { id: "otp-input" },
      { id: "date-picker" },
      { id: "rich-text-editor" },
      { id: "nav-header" },
      { id: "nav-sidebar" },
      { id: "nav-tabs" },
      { id: "nav-breadcrumb" },
      { id: "nav-pagination" },
      { id: "footer" },
      { id: "tactical-panel", signature: true },
      { id: "holo-card", signature: true },
    ],
  },
  {
    slug: "data-display",
    items: [
      { id: "table" },
      { id: "list" },
      { id: "stat-metric" },
      { id: "timeline" },
      { id: "avatar" },
      { id: "tags-badges" },
      { id: "progress-stepper" },
      { id: "charts" },
      { id: "coordinate-tag", signature: true },
      { id: "radar-chart", signature: true },
    ],
  },
  {
    slug: "feedback",
    items: [
      { id: "toast-notification" },
      { id: "modal-dialog" },
      { id: "tooltip-popover" },
      { id: "loading-skeleton" },
      { id: "empty-state" },
      { id: "error-pages" },
      { id: "offline-state" },
      { id: "inline-validation" },
      { id: "banner-alert" },
      { id: "diamond-loader", signature: true },
    ],
  },
  {
    slug: "interactive",
    items: [
      { id: "states-matrix" },
      { id: "micro-interactions" },
      { id: "hover-effects" },
      { id: "focus-keyboard" },
      { id: "drag-drop" },
      { id: "selection" },
    ],
  },
  {
    slug: "content-media",
    items: [
      { id: "hero-section" },
      { id: "code-block-terminal" },
      { id: "blog-layout" },
      { id: "image-media" },
      { id: "video-player" },
      { id: "dividers" },
      { id: "scroll-cursor" },
      { id: "glitch-text", signature: true },
      { id: "data-stream", signature: true },
      { id: "scan-divider", signature: true },
      { id: "topo-pattern", signature: true },
      { id: "hud-overlay", signature: true },
    ],
  },
  {
    slug: "overlay-utility",
    items: [
      { id: "command-palette" },
      { id: "cookie-consent" },
      { id: "back-to-top" },
      { id: "copy-clipboard" },
      { id: "dropdown" },
      { id: "context-menu" },
      { id: "filter-bar" },
      { id: "sort-control" },
      { id: "bottom-sheet" },
      { id: "pull-to-refresh" },
      { id: "swipeable-item" },
      { id: "carousel" },
      { id: "resizable" },
      { id: "rating" },
      { id: "file-upload" },
      { id: "session-timeout" },
      { id: "theme-switcher" },
    ],
  },
  {
    slug: "animation",
    items: [
      { id: "animation-system" },
      { id: "page-transitions" },
      { id: "scroll-animations" },
      { id: "particle-effects" },
    ],
  },
  {
    slug: "content-strategy",
    items: [
      { id: "voice-tone" },
      { id: "microcopy" },
      { id: "placeholder-standards" },
      { id: "error-message-writing" },
      { id: "date-time-number" },
      { id: "truncation-overflow" },
    ],
  },
  {
    slug: "patterns",
    items: [
      { id: "page-templates" },
      { id: "section-patterns" },
      { id: "responsive" },
      { id: "accessibility" },
      { id: "performance" },
      { id: "design-tokens" },
      { id: "naming-conventions" },
      { id: "behavioral-rules" },
      { id: "timing-focus" },
      { id: "scroll-touch-rules" },
      { id: "form-action-rules" },
      { id: "notification-media" },
      { id: "consistency-sizing" },
      { id: "auth-layouts" },
      { id: "pricing-tables" },
      { id: "mega-menu" },
      { id: "kanban" },
      { id: "language-switcher" },
      { id: "print-styles" },
      { id: "fab" },
      { id: "comments" },
      { id: "spoiler-tags" },
      { id: "ad-placements" },
      { id: "audio-player" },
    ],
  },
  {
    slug: "changelog",
    items: [{ id: "changelog" }],
  },
];

/**
 * Build translated sidebar sections. `t` must have the "docs" namespace loaded.
 * Caller should use: `const { t } = useTranslation("docs")`
 */
export function getSidebarData(t: TFunction): SidebarSection[] {
  return sectionDefs.map((def) => ({
    title: t(`sidebar.sections.${def.slug}.title`, {
      defaultValue: def.slug.toUpperCase(),
    }),
    slug: def.slug,
    description: t(`sidebar.sections.${def.slug}.description`, {
      defaultValue: "",
    }),
    items: def.items.map((item) => ({
      id: item.id,
      label: t(`sidebar.sections.${def.slug}.items.${item.id}`, {
        defaultValue: item.id,
      }),
      ...(item.signature ? { signature: true } : {}),
    })),
  }));
}

export const idToSlugMap: Record<string, string> = {};
sectionDefs.forEach((def) => {
  def.items.forEach((item) => {
    idToSlugMap[item.id] = def.slug;
  });
});

export const sectionSlugs = sectionDefs.map((d) => d.slug);
