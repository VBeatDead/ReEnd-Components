import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const BASE_TITLE = "ReEnd Components";
const BASE_URL = "https://reend-components.pages.dev";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

type Lang = "en" | "id";

interface SectionMeta {
  title: string;
  description: Record<Lang, string>;
}

const DEFAULT_DESCRIPTION: Record<Lang, string> = {
  en: "75+ sci-fi, tactical, and gaming-inspired React components. Dark-first design system with Tailwind CSS, Radix UI, TypeScript, and CLI tool.",
  id: "75+ komponen React bertema sci-fi, taktis, dan gaming. Design system dark-first dengan Tailwind CSS, Radix UI, TypeScript, dan CLI.",
};

const SECTION_META: Record<string, SectionMeta> = {
  installation: {
    title: "Installation",
    description: {
      en: "Get started with ReEnd Components — npm install, CLI setup, Tailwind preset, CSS variable integration, and peer dependencies guide.",
      id: "Mulai dengan ReEnd Components — npm install, setup CLI, preset Tailwind, integrasi CSS variable, dan panduan peer dependencies.",
    },
  },
  foundations: {
    title: "Foundations",
    description: {
      en: "Design tokens, CSS custom properties, ef-* color palette, surface layering, typography scale, shadows, z-index, and animation utilities.",
      id: "Design token, CSS custom property, palet warna ef-*, lapisan surface, skala tipografi, shadow, z-index, dan utilitas animasi.",
    },
  },
  "core-components": {
    title: "Core Components",
    description: {
      en: "Button, Input, DatePicker, OTPInput, RichTextEditor, Avatar, Tabs, Dialog, Accordion, Switch, Select, and 30+ production-ready core components.",
      id: "Button, Input, DatePicker, OTPInput, RichTextEditor, Avatar, Tabs, Dialog, Accordion, Switch, Select, dan 30+ komponen inti siap produksi.",
    },
  },
  "data-display": {
    title: "Data Display",
    description: {
      en: "Chart, Table, Stat, List, Rating, Timeline, Stepper, Pagination, Breadcrumb, NumberInput — components for visualizing and navigating data.",
      id: "Chart, Table, Stat, List, Rating, Timeline, Stepper, Pagination, Breadcrumb, NumberInput — komponen untuk visualisasi dan navigasi data.",
    },
  },
  feedback: {
    title: "Feedback & States",
    description: {
      en: "Toast, Alert, Dialog, Popover, Sonner, EmptyState, Skeleton, and loading/error/offline state components with ARIA compliance.",
      id: "Toast, Alert, Dialog, Popover, Sonner, EmptyState, Skeleton, serta komponen status loading/error/offline yang patuh ARIA.",
    },
  },
  interactive: {
    title: "Interactive States",
    description: {
      en: "Drag & drop, focus traps, keyboard shortcuts, hover effects, micro-interactions, and selection patterns with useFocusTrap and useShortcut hooks.",
      id: "Drag & drop, focus trap, keyboard shortcut, efek hover, micro-interaction, dan pola seleksi dengan hook useFocusTrap dan useShortcut.",
    },
  },
  "content-media": {
    title: "Content & Media",
    description: {
      en: "Code blocks, topographic patterns, scroll progress, BackToTop, cursor styles, and media display components.",
      id: "Blok kode, pola topografis, progres scroll, BackToTop, gaya kursor, dan komponen tampilan media.",
    },
  },
  "overlay-utility": {
    title: "Overlay & Utility",
    description: {
      en: "Dropdown, CommandPalette, BottomSheet, Carousel, FilterBar, CopyClipboard, CookieConsent, SessionTimeoutModal, Resizable, and overlay components.",
      id: "Dropdown, CommandPalette, BottomSheet, Carousel, FilterBar, CopyClipboard, CookieConsent, SessionTimeoutModal, Resizable, dan komponen overlay lainnya.",
    },
  },
  animation: {
    title: "Animation",
    description: {
      en: "Animation keyframes, useInView, useStagger, page transitions, particle effects, scroll animations, and Endfield motion design tokens.",
      id: "Keyframe animasi, useInView, useStagger, transisi halaman, efek partikel, animasi scroll, dan token motion design Endfield.",
    },
  },
  "content-strategy": {
    title: "Content Strategy",
    description: {
      en: "Brand voice guidelines, microcopy patterns, error message writing, date formatting, truncation rules, and UI content best practices.",
      id: "Panduan brand voice, pola microcopy, penulisan pesan error, format tanggal, aturan pemotongan teks, dan praktik terbaik konten UI.",
    },
  },
  patterns: {
    title: "Patterns",
    description: {
      en: "Dashboard layouts, auth flows, mega menus, kanban boards, design tokens reference, naming conventions, and production UI patterns.",
      id: "Layout dashboard, alur auth, mega menu, papan kanban, referensi design token, konvensi penamaan, dan pola UI siap produksi.",
    },
  },
  changelog: {
    title: "Changelog",
    description: {
      en: "Release history for ReEnd Components — v1.1.1 security patch, v1.1.0 adds 28 components, 4 hooks, design tokens, and CLI tool.",
      id: "Riwayat rilis ReEnd Components — patch keamanan v1.1.1, v1.1.0 menambah 28 komponen, 4 hook, design token, dan CLI.",
    },
  },
};

function setMeta(selector: string, attr: string, value: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

export function usePageMeta(slug: string | null) {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.language === "id" ? "id" : "en";

  useEffect(() => {
    const meta = slug ? SECTION_META[slug] : null;

    const title = meta
      ? `${meta.title} — ${BASE_TITLE}`
      : `${BASE_TITLE} — Sci-Fi React Component Library`;

    const description = meta?.description[lang] ?? DEFAULT_DESCRIPTION[lang];

    // EN pages live at the bare path (matches sitemap.xml + SEOHead canonical);
    // ID pages live under /id.
    const langPrefix = lang === "id" ? "/id" : "";
    const url = slug ? `${BASE_URL}${langPrefix}/docs/${slug}` : BASE_URL;

    document.title = title;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", OG_IMAGE);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", OG_IMAGE);
  }, [slug, lang]);
}
