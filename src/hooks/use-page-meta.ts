import { useEffect } from "react";

const BASE_TITLE = "ReEnd Components";
const BASE_URL = "https://reend-components.pages.dev";
const OG_IMAGE = `${BASE_URL}/og-image.svg`;

interface SectionMeta {
  title: string;
  description: string;
}

const SECTION_META: Record<string, SectionMeta> = {
  installation: {
    title: "Installation",
    description:
      "Get started with ReEnd Components — npm install, CLI setup, Tailwind preset, CSS variable integration, and peer dependencies guide.",
  },
  foundations: {
    title: "Foundations",
    description:
      "Design tokens, CSS custom properties, ef-* color palette, surface layering, typography scale, shadows, z-index, and animation utilities.",
  },
  "core-components": {
    title: "Core Components",
    description:
      "Button, Input, DatePicker, OTPInput, RichTextEditor, Avatar, Tabs, Dialog, Accordion, Switch, Select, and 30+ production-ready core components.",
  },
  "data-display": {
    title: "Data Display",
    description:
      "Chart, Table, Stat, List, Rating, Timeline, Stepper, Pagination, Breadcrumb, NumberInput — components for visualizing and navigating data.",
  },
  feedback: {
    title: "Feedback & States",
    description:
      "Toast, Alert, Dialog, Popover, Sonner, EmptyState, Skeleton, and loading/error/offline state components with ARIA compliance.",
  },
  interactive: {
    title: "Interactive States",
    description:
      "Drag & drop, focus traps, keyboard shortcuts, hover effects, micro-interactions, and selection patterns with useFocusTrap and useShortcut hooks.",
  },
  "content-media": {
    title: "Content & Media",
    description:
      "Code blocks, topographic patterns, scroll progress, BackToTop, cursor styles, and media display components.",
  },
  "overlay-utility": {
    title: "Overlay & Utility",
    description:
      "Dropdown, CommandPalette, BottomSheet, Carousel, FilterBar, CopyClipboard, CookieConsent, SessionTimeoutModal, Resizable, and overlay components.",
  },
  animation: {
    title: "Animation",
    description:
      "Animation keyframes, useInView, useStagger, page transitions, particle effects, scroll animations, and Endfield motion design tokens.",
  },
  "content-strategy": {
    title: "Content Strategy",
    description:
      "Brand voice guidelines, microcopy patterns, error message writing, date formatting, truncation rules, and UI content best practices.",
  },
  patterns: {
    title: "Patterns",
    description:
      "Dashboard layouts, auth flows, mega menus, kanban boards, design tokens reference, naming conventions, and production UI patterns.",
  },
  changelog: {
    title: "Changelog",
    description:
      "Release history for ReEnd Components — v1.1.0 adds 28 new components, 4 hooks, design token overhaul, and CLI tool.",
  },
};

function setMeta(selector: string, attr: string, value: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

export function usePageMeta(slug: string | null) {
  useEffect(() => {
    const meta = slug ? SECTION_META[slug] : null;

    const title = meta
      ? `${meta.title} — ${BASE_TITLE}`
      : `${BASE_TITLE} — Sci-Fi React Component Library`;

    const description = meta?.description
      ?? "75+ sci-fi, tactical, and gaming-inspired React components. Dark-first design system with Tailwind CSS, Radix UI, TypeScript, and CLI tool.";

    document.title = title;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta(
      'meta[property="og:url"]',
      "content",
      slug ? `${BASE_URL}/docs/${slug}` : BASE_URL,
    );
    setMeta('meta[property="og:image"]', "content", OG_IMAGE);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", OG_IMAGE);
  }, [slug]);
}
