export const BASE_URL = "https://reend-components.pages.dev";

export const SUPPORTED_LANGS = ["en", "id"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export interface DocSection {
  slug: string;
  title: string;
  description: string;
}

export const DOC_SECTIONS: DocSection[] = [
  {
    slug: "installation",
    title: "Installation",
    description:
      "npm install, Tailwind CSS configuration, CSS variables, and framework setup guides.",
  },
  {
    slug: "foundations",
    title: "Foundations",
    description:
      "Design tokens: ef-* color palette, typography scale, spacing, and surface layers.",
  },
  {
    slug: "core-components",
    title: "Core Components",
    description:
      "Buttons, cards, forms, inputs, navigation bars, and footer components.",
  },
  {
    slug: "data-display",
    title: "Data Display",
    description:
      "Tables, statistics cards, charts, and structured data presentation components.",
  },
  {
    slug: "feedback",
    title: "Feedback",
    description:
      "Toast notifications, alert banners, progress indicators, and modal dialogs.",
  },
  {
    slug: "interactive",
    title: "Interactive",
    description:
      "Tabs, accordions, dropdowns, toggles, and other stateful interactive components.",
  },
  {
    slug: "content-media",
    title: "Content & Media",
    description:
      "Hero sections, media players, carousels, and rich content layout components.",
  },
  {
    slug: "overlay-utility",
    title: "Overlay & Utility",
    description:
      "Command palette, tooltips, popovers, sheets, and overlay utility components.",
  },
  {
    slug: "animation",
    title: "Animation",
    description:
      "Motion system, scroll-triggered animations, transitions, and loading states.",
  },
  {
    slug: "content-strategy",
    title: "Content Strategy",
    description:
      "Voice and tone guidelines, writing patterns, and content design principles.",
  },
  {
    slug: "patterns",
    title: "Patterns",
    description:
      "Full-page layout templates and reusable composition patterns.",
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "Version history and release notes for ReEnd-Components.",
  },
];
