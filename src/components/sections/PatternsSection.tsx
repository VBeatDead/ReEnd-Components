import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../docs/ComponentPreview";
import { SpoilerBlock } from "../ui/spoiler-block";

// ─── Kanban Demo ──────────────────────────────────────────────────────────────

type KanbanCard = { id: string; text: string };
type KanbanCol = {
  id: string;
  label: string;
  color: string;
  cards: KanbanCard[];
};

const INITIAL_COLUMNS: KanbanCol[] = [
  {
    id: "backlog",
    label: "BACKLOG",
    color: "text-muted-foreground",
    cards: [
      { id: "k1", text: "Research terrain type X" },
      { id: "k2", text: "Analyze enemy patterns" },
    ],
  },
  {
    id: "progress",
    label: "IN PROGRESS",
    color: "text-primary",
    cards: [
      { id: "k3", text: "Deploy operator squad" },
      { id: "k4", text: "Resource allocation v2" },
    ],
  },
  {
    id: "review",
    label: "REVIEW",
    color: "text-ef-orange",
    cards: [{ id: "k5", text: "Strategy document final review" }],
  },
  {
    id: "done",
    label: "DONE",
    color: "text-ef-green",
    cards: [
      { id: "k6", text: "Operator skill upgrades" },
      { id: "k7", text: "Base expansion complete" },
    ],
  },
];

function KanbanDemo() {
  const [columns, setColumns] = useState<KanbanCol[]>(INITIAL_COLUMNS);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [dropTargetColId, setDropTargetColId] = useState<string | null>(null);
  const dragging = useRef<{ cardId: string; fromColId: string } | null>(null);

  function handleDragStart(
    e: React.DragEvent<HTMLDivElement>,
    cardId: string,
    colId: string,
  ) {
    dragging.current = { cardId, fromColId: colId };
    setDraggingCardId(cardId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragEnd() {
    dragging.current = null;
    setDraggingCardId(null);
    setDropTargetColId(null);
  }

  function handleDragOver(
    e: React.DragEvent<HTMLDivElement>,
    colId: string,
  ) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dropTargetColId !== colId) setDropTargetColId(colId);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDropTargetColId(null);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, toColId: string) {
    e.preventDefault();
    if (!dragging.current) return;
    const { cardId, fromColId } = dragging.current;

    if (fromColId !== toColId) {
      setColumns((prev) => {
        const next = prev.map((col) => ({ ...col, cards: [...col.cards] }));
        const fromCol = next.find((c) => c.id === fromColId)!;
        const toCol = next.find((c) => c.id === toColId)!;
        const idx = fromCol.cards.findIndex((c) => c.id === cardId);
        const [card] = fromCol.cards.splice(idx, 1);
        toCol.cards.push(card);
        return next;
      });
    }

    dragging.current = null;
    setDraggingCardId(null);
    setDropTargetColId(null);
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2" role="list" aria-label="Kanban board">
      {columns.map((col) => (
        <div
          key={col.id}
          role="listitem"
          aria-label={`${col.label} column, ${col.cards.length} cards`}
          className={`min-w-[200px] flex-shrink-0 border p-3 transition-colors duration-150 ${
            dropTargetColId === col.id
              ? "bg-primary/[0.03] border-primary/20"
              : "bg-surface-1 border-border"
          }`}
          onDragOver={(e) => handleDragOver(e, col.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, col.id)}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className={`font-display text-[10px] font-bold uppercase tracking-widest ${col.color}`}
            >
              {col.label}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground bg-surface-2 px-1.5 py-0.5">
              {col.cards.length}
            </span>
          </div>

          <div className="space-y-2 min-h-[32px]">
            {col.cards.map((card) => (
              <div
                key={card.id}
                draggable
                aria-grabbed={draggingCardId === card.id}
                onDragStart={(e) => handleDragStart(e, card.id, col.id)}
                onDragEnd={handleDragEnd}
                className={`border p-2.5 text-[12px] text-foreground select-none transition-all duration-150 ${
                  draggingCardId === card.id
                    ? "opacity-50 border-dashed border-primary/40 bg-surface-0 cursor-grabbing"
                    : "bg-surface-0 border-border/50 hover:border-primary/40 cursor-grab"
                }`}
              >
                {card.text}
              </div>
            ))}
            <button
              type="button"
              className="w-full border border-dashed border-border/40 text-muted-foreground hover:border-primary/40 hover:text-primary text-[11px] py-1.5 font-display uppercase tracking-wider transition-colors"
            >
              + ADD TASK
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PatternsSection() {
  const { t } = useTranslation("patterns");

  return (
    <>
      {/* Page Templates */}
      <ComponentPreview
        id="page-templates"
        title={t("templates.title")}
        showViewport
        description={t("templates.description")}
        code={`// Compose any page from layout primitives
function HomepagePage() {
  return (
    <main className="min-h-screen bg-surface-canvas">
      <Header />
      {/* 100vh hero with full-bleed background */}
      <section className="h-screen relative overflow-hidden">
        <HeroContent />
      </section>
      {/* Feature grid */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map(f => <FeatureCard key={f.id} {...f} />)}
        </div>
      </section>
      {/* Stats */}
      <section className="py-16 px-6 bg-surface-1">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(s => <StatItem key={s.label} {...s} />)}
        </div>
      </section>
      <Footer />
    </main>
  );
}`}
        props={[
          {
            name: "template",
            type: '"homepage" | "documentation" | "blog-list" | "blog-post" | "error"',
            required: true,
            description: t("_props.page-templates.template"),
          },
          {
            name: "header",
            type: "ReactNode",
            required: false,
            description: t("_props.page-templates.header"),
          },
          {
            name: "sidebar",
            type: "ReactNode",
            required: false,
            description: t("_props.page-templates.sidebar"),
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: t("_props.page-templates.children"),
          },
        ]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: t("templates.homepage"),
              blocks: [
                t("templates.header"),
                t("templates.hero"),
                t("templates.features"),
                t("templates.stats"),
                t("templates.cta"),
                t("templates.footer"),
              ],
            },
            {
              name: t("templates.documentation"),
              blocks: [
                t("templates.header"),
                t("templates.sidebar"),
                t("templates.breadcrumb"),
                t("templates.content"),
                t("templates.toc"),
                t("templates.footer"),
              ],
            },
            {
              name: t("templates.blog_list"),
              blocks: [
                t("templates.header"),
                t("templates.title_block"),
                t("templates.filter"),
                t("templates.post_grid"),
                t("templates.pagination"),
                t("templates.footer"),
              ],
            },
            {
              name: t("templates.blog_post"),
              blocks: [
                t("templates.header"),
                t("templates.back_link"),
                t("templates.post_meta"),
                t("templates.post_hero"),
                t("templates.content"),
                t("templates.post_tags"),
                t("templates.prev_next"),
                t("templates.footer"),
              ],
            },
            {
              name: t("templates.error_page"),
              blocks: [
                t("templates.header"),
                t("templates.error_code"),
                t("templates.error_title_glitch"),
                t("templates.error_desc"),
                t("templates.error_cta"),
              ],
            },
          ].map((t) => (
            <div key={t.name} className="border border-border bg-surface-1 p-4">
              <h4 className="font-display text-xs font-bold tracking-[0.08em] uppercase text-primary mb-3">
                {t.name}
              </h4>
              <div className="space-y-1.5">
                {t.blocks.map((b) => (
                  <div
                    key={b}
                    className="bg-surface-2 border border-border px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Section Patterns */}
      <ComponentPreview
        id="section-patterns"
        title={t("section_patterns.title")}
        showViewport
        description={t("section_patterns.description")}
        code={`// Overline + heading + feature grid section pattern
<section className="py-24 px-6">
  {/* Overline */}
  <span className="font-ui text-[11px] tracking-[0.15em] uppercase text-primary">
    MODULE OVERVIEW
  </span>
  <div className="gradient-line-h mt-2 mb-4 opacity-50" />
  <h2 className="font-display text-4xl font-bold uppercase text-foreground mb-2">
    CORE SYSTEMS
  </h2>
  <p className="text-sm text-muted-foreground mb-8">Supporting description text.</p>

  {/* Feature grid — numbered cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {features.map((feature, i) => (
      <div key={feature.id} className="corner-brackets bg-surface-1 border border-border p-5">
        <span className="font-display text-3xl font-bold text-primary/30">
          {String(i + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-xs font-bold uppercase text-foreground mt-2">
          {feature.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
      </div>
    ))}
  </div>
</section>`}
        props={[
          {
            name: "overline",
            type: "string",
            required: false,
            description: t("_props.section-patterns.overline"),
          },
          {
            name: "heading",
            type: "string",
            required: true,
            description: t("_props.section-patterns.heading"),
          },
          {
            name: "layout",
            type: '"standard" | "alternating" | "grid"',
            default: '"standard"',
            required: false,
            description: t("_props.section-patterns.layout"),
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: t("_props.section-patterns.children"),
          },
        ]}
      >
        <div className="space-y-8">
          {/* Overline Section Pattern */}
          <div>
            <span className="font-ui text-[11px] tracking-[0.15em] uppercase text-primary">
              {t("section_patterns.overline")}
            </span>
            <div className="gradient-line-h mt-2 mb-4 opacity-50" />
            <h3 className="font-display text-2xl font-bold uppercase tracking-[0.02em] text-foreground mb-2">
              {t("section_patterns.heading")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("section_patterns.description_text")}
            </p>
            <button className="text-primary font-display text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 bg-transparent">
              {t("section_patterns.view_all")}
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="corner-brackets bg-surface-1 border border-border p-5"
              >
                <span className="font-display text-3xl font-bold text-primary/30">
                  {String(n).padStart(2, "0")}
                </span>
                <h4 className="font-display text-xs font-bold uppercase text-foreground mt-2">
                  {t(`section_patterns.feature_${n}`)}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("section_patterns.description_text_short")}
                </p>
              </div>
            ))}
          </div>

          {/* Alternating Layout */}
          <div className="pt-4 border-t border-border">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
              {t("section_patterns.alternating_label", { defaultValue: "ALTERNATING LAYOUT" })}
            </p>
            <div className="space-y-3">
              {[
                { reverse: false, label: t("section_patterns.text_left", { defaultValue: "TEXT — IMAGE →" }) },
                { reverse: true,  label: t("section_patterns.text_right", { defaultValue: "← IMAGE — TEXT" }) },
              ].map(({ reverse, label }) => (
                <div key={label} className={`flex gap-3 ${reverse ? "flex-row-reverse" : ""}`}>
                  <div className="flex-1 bg-surface-1 border border-border p-3 text-xs text-muted-foreground">
                    <span className="font-display text-[10px] uppercase text-primary block mb-1">TEXT</span>
                    {t("section_patterns.description_text_short")}
                  </div>
                  <div className="w-24 shrink-0 bg-surface-2 border border-border flex items-center justify-center text-primary/20 text-2xl">
                    ◆
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Pattern */}
          <div className="pt-4 border-t border-border">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
              {t("section_patterns.testimonial_label", { defaultValue: "TESTIMONIAL" })}
            </p>
            <blockquote className="border-l-[3px] border-primary pl-4 py-2 bg-primary/[0.03]">
              <p className="text-sm text-muted-foreground italic mb-3">
                {t("section_patterns.testimonial_quote", { defaultValue: "\"The Endfield design system gave our team a consistent visual language that scales across every deployment.\"" })}
              </p>
              <footer className="font-display text-[10px] uppercase tracking-wider text-muted-foreground">
                — {t("section_patterns.testimonial_author", { defaultValue: "OPERATOR CHEN · Lead Engineer, Rhodes Island" })}
              </footer>
            </blockquote>
          </div>
        </div>
      </ComponentPreview>

      {/* Responsive */}
      <ComponentPreview
        id="responsive"
        title={t("responsive.title")}
        description={t("responsive.description")}
        code={`/* Tailwind breakpoint usage — mobile first */
/* sm: 640px  md: 768px  lg: 1024px  xl: 1280px  2xl: 1536px */

/* Card grid: 1→2→3 columns */
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6">

/* Container pattern */
<div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">

/* Docs sidebar layout */
<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
  <aside className="hidden lg:block">Sidebar</aside>
  <main>{/* content */}</main>
</div>

/* Nav: hamburger on mobile, inline on desktop */
<nav>
  <button className="lg:hidden">☰</button>
  <ul className="hidden lg:flex gap-6">…</ul>
</nav>`}
        props={[
          {
            name: "breakpoints",
            type: "Record<string, number>",
            required: false,
            description: t("_props.responsive.breakpoints"),
          },
        ]}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                {[
                  t("responsive.headers.element"),
                  t("responsive.headers.below_768"),
                  t("responsive.headers.768_1024"),
                  t("responsive.headers.above_1024"),
                ].map((h) => (
                  <th
                    key={h}
                    className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-2 px-3 text-left border-b border-border"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [t("responsive.rows.container_pad"), "16px", "24px", "24px"],
                [t("responsive.rows.h1"), "28px", "36px", "40px"],
                [
                  t("responsive.rows.card_grid"),
                  t("responsive.values.col_1"),
                  t("responsive.values.col_2"),
                  t("responsive.values.col_3"),
                ],
                [
                  t("responsive.rows.nav"),
                  t("responsive.values.hamburger"),
                  t("responsive.values.hamburger"),
                  t("responsive.values.inline"),
                ],
                [
                  t("responsive.rows.sidebar"),
                  t("responsive.values.overlay"),
                  t("responsive.values.overlay"),
                  t("responsive.values.fixed"),
                ],
                [t("responsive.rows.hero_height"), "80vh", "90vh", "100vh"],
              ].map(([el, ...vals]) => (
                <tr key={el} className="border-b border-border">
                  <td className="py-2 px-3 text-card-foreground font-medium">
                    {el}
                  </td>
                  {vals.map((v, i) => (
                    <td
                      key={i}
                      className="py-2 px-3 text-muted-foreground font-mono"
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      {/* Accessibility */}
      <ComponentPreview
        id="accessibility"
        title={t("accessibility.title")}
        description={t("accessibility.description")}
        code={`// Modal — full ARIA requirements
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">DELETE RECORD</h2>
  <p id="modal-desc">This action cannot be undone.</p>
  <button>CANCEL</button>
  <button className="btn-danger">DELETE</button>
</div>

// Icon-only button — always needs aria-label
<button aria-label="Close dialog" type="button">
  <X aria-hidden="true" />
</button>

// Loading state — announce to screen readers
<div role="status" aria-live="polite" aria-label="Loading…">
  <Spinner aria-hidden="true" />
</div>

// Tab panel
<div role="tabpanel" aria-labelledby="tab-overview" tabIndex={0}>
  {/* content */}
</div>`}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("accessibility.contrast_ratios")}
            </h4>
            <div className="space-y-2">
              {[
                { pair: "#F0F0F0 on #0A0A0A", ratio: "18.3:1", grade: "AAA" },
                { pair: "#FFD429 on #0A0A0A", ratio: "11.7:1", grade: "AAA" },
                { pair: "#CCCCCC on #0A0A0A", ratio: "13.3:1", grade: "AAA" },
                { pair: "#999 on #0A0A0A", ratio: "7.0:1", grade: "AA Large" },
              ].map((c) => (
                <div key={c.pair} className="flex items-center gap-4 text-xs">
                  <span className="font-mono text-muted-foreground w-full sm:w-44 shrink-0">
                    {c.pair}
                  </span>
                  <span className="font-display text-primary font-bold">
                    {c.ratio}
                  </span>
                  <span
                    className={`font-ui text-[10px] uppercase px-2 py-0.5 border ${c.grade === "AAA" ? "text-ef-green border-ef-green/40 bg-ef-green/[0.08]" : "text-ef-orange border-ef-orange/40 bg-ef-orange/[0.08]"}`}
                  >
                    {c.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("accessibility.aria_requirements")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                [t("accessibility.modal"), t("accessibility.modal_aria")],
                [t("accessibility.tab"), t("accessibility.tab_aria")],
                [
                  t("accessibility.accordion"),
                  t("accessibility.accordion_aria"),
                ],
                [t("accessibility.toast"), t("accessibility.toast_aria")],
                [
                  t("accessibility.icon_button"),
                  t("accessibility.icon_button_aria"),
                ],
                [t("accessibility.loading"), t("accessibility.loading_aria")],
              ].map(([comp, req]) => (
                <div key={comp} className="flex gap-2">
                  <span className="text-card-foreground font-medium">
                    {comp}:
                  </span>
                  <span className="font-mono text-muted-foreground">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Performance */}
      <ComponentPreview
        id="performance"
        title={t("performance.title")}
        description={t("performance.description")}
        code={`<!-- Image optimization: always set dimensions to prevent CLS -->
<img
  src="hero.webp"
  width="1280" height="720"
  loading="lazy"
  decoding="async"
  alt="Hero image"
/>

<!-- Font preload: woff2 only, critical fonts first -->
<link rel="preload" href="/fonts/Orbitron.woff2"
  as="font" type="font/woff2" crossorigin />

/* CSS: GPU-composited animation — NO layout thrash */
.animated {
  transform: translateY(0);   /* ✓ GPU layer */
  opacity: 1;                 /* ✓ GPU layer */
  will-change: transform;     /* hint browser */
  /* ✗ avoid: top, left, width, height, margin */
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animated { transition: none !important; }
}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: t("performance.images.title"),
              items: [
                t("performance.images.webp_fallback"),
                t("performance.images.lazy_loading"),
                t("performance.images.srcset"),
                t("performance.images.max_display"),
              ],
            },
            {
              title: t("performance.fonts.title"),
              items: [
                t("performance.fonts.font_display"),
                t("performance.fonts.woff2"),
                t("performance.fonts.critical_first"),
                t("performance.fonts.subset_cjk"),
              ],
            },
            {
              title: t("performance.css.title"),
              items: [
                t("performance.css.critical_inline"),
                t("performance.css.clip_path_gpu"),
                t("performance.css.contain"),
                t("performance.css.non_critical"),
              ],
            },
            {
              title: t("performance.animation.title"),
              items: [
                t("performance.animation.transform_opacity"),
                t("performance.animation.avoid_layout"),
                t("performance.animation.will_change"),
                t("performance.animation.reduced_motion"),
              ],
            },
          ].map((g) => (
            <div
              key={g.title}
              className="border border-border bg-surface-1 p-4"
            >
              <h4 className="font-display text-xs font-bold tracking-[0.08em] uppercase text-primary mb-3">
                {g.title}
              </h4>
              <ul className="space-y-1.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="diamond-marker text-xs text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Design Tokens */}
      <ComponentPreview
        id="design-tokens"
        title={t("tokens.title")}
        description={t("tokens.description")}
        code={`:root {
  /* Brand Colors (HSL values, use via hsl(var(--ef-*))) */
  --ef-yellow: 48 100% 57%;    /* #FFD429 — primary accent */
  --ef-blue: 204 62% 58%;      /* #4DA8DA — info / link */
  --ef-red: 353 100% 65%;      /* #FF4757 — destructive */
  --ef-green: 149 67% 63%;     /* #2ED573 — success */
  --ef-orange: 38 100% 50%;    /* #FFA502 — warning */

  /* Surfaces — dark mode */
  --surface-canvas: 0 0% 4%;   /* #0A0A0A */
  --surface-1: 0 0% 8%;        /* #141414 */
  --surface-2: 0 0% 10%;       /* #1A1A1A */
  --surface-3: 0 0% 13%;       /* #222222 */

  /* Semantic tokens */
  --primary: var(--ef-yellow);
  --foreground: 0 0% 94%;
  --muted-foreground: 0 0% 60%;
  --border: 0 0% 20%;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.4);
  --shadow-lg: 0 16px 48px rgba(0,0,0,0.5);
  --shadow-glow: 0 0 20px rgba(255,212,41,0.2);
  --ef-yellow-glow: 0 0 20px hsl(var(--ef-yellow) / 0.4);

  /* Z-Index stacking */
  --z-below: -1;       --z-base: 0;
  --z-raised: 1;       --z-dropdown: 100;
  --z-sticky: 200;     --z-header: 1000;
  --z-overlay: 1500;   --z-modal: 2000;
  --z-toast: 3000;     --z-tooltip: 4000;
  --z-max: 9999;

  /* Transitions */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);
  --ease-smooth: cubic-bezier(0.0, 0, 0.2, 1);

  /* Duration scale */
  --duration-instant: 100ms;  --duration-fast: 200ms;
  --duration-base: 300ms;     --duration-slow: 500ms;
  --duration-slower: 800ms;
}`}
      >
        <div className="space-y-6">
          {/* Color swatches */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("tokens.colors_heading", { defaultValue: "BRAND COLORS" })}
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                { token: "--ef-yellow / --primary", bg: "bg-primary", text: "text-black", hex: "#FFD429" },
                { token: "--ef-blue", bg: "bg-[hsl(var(--ef-blue))]", text: "text-black", hex: "#4DA8DA" },
                { token: "--ef-green", bg: "bg-[hsl(var(--ef-green))]", text: "text-black", hex: "#2ED573" },
                { token: "--ef-red", bg: "bg-[hsl(var(--ef-red))]", text: "text-white", hex: "#FF4757" },
                { token: "--ef-orange", bg: "bg-[hsl(var(--ef-orange))]", text: "text-black", hex: "#FFA502" },
              ].map(({ token, bg, text, hex }) => (
                <div key={token} className="flex flex-col items-start">
                  <div className={`w-20 h-10 border border-border/20 ${bg}`} />
                  <div className="mt-1 font-mono text-[9px] text-muted-foreground leading-tight">{token}</div>
                  <div className="font-mono text-[9px] text-muted-foreground/50">{hex}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Surface layers */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("tokens.surfaces_heading", { defaultValue: "SURFACE LAYERS" })}
            </h4>
            <div className="flex gap-2">
              {[
                { token: "canvas", cls: "bg-surface-canvas border border-border" },
                { token: "surface-1", cls: "bg-surface-1 border border-border" },
                { token: "surface-2", cls: "bg-surface-2 border border-border" },
                { token: "surface-3", cls: "bg-surface-3 border border-border" },
              ].map(({ token, cls }) => (
                <div key={token} className="flex-1">
                  <div className={`h-10 ${cls}`} />
                  <div className="font-mono text-[9px] text-muted-foreground mt-1 leading-tight">{token}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Shadow tokens */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("tokens.shadows_heading", { defaultValue: "SHADOWS" })}
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "shadow-sm", cls: "shadow-sm" },
                { name: "shadow-md", cls: "shadow-md" },
                { name: "shadow-lg", cls: "shadow-lg" },
                { name: "glow-primary", cls: "shadow-[0_0_20px_rgba(255,212,41,0.2)]" },
              ].map(({ name, cls }) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-10 bg-surface-2 border border-border ${cls}`} />
                  <div className="font-mono text-[9px] text-muted-foreground">--{name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Z-Index + Transition tokens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-2">
                {t("tokens.zindex_heading", { defaultValue: "Z-INDEX" })}
              </h4>
              <div className="space-y-1 font-mono text-[11px]">
                {[
                  ["--z-dropdown", "100"],
                  ["--z-sticky", "200"],
                  ["--z-header", "1000"],
                  ["--z-modal", "2000"],
                  ["--z-toast", "3000"],
                  ["--z-tooltip", "4000"],
                ].map(([tok, val]) => (
                  <div key={tok} className="flex items-center justify-between border-b border-border/40 py-0.5">
                    <code className="text-primary">{tok}</code>
                    <span className="text-muted-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-2">
                {t("tokens.duration_heading", { defaultValue: "DURATION SCALE" })}
              </h4>
              <div className="space-y-1 font-mono text-[11px]">
                {[
                  ["--duration-instant", "100ms"],
                  ["--duration-fast", "200ms"],
                  ["--duration-base", "300ms"],
                  ["--duration-slow", "500ms"],
                  ["--duration-slower", "800ms"],
                ].map(([tok, val]) => (
                  <div key={tok} className="flex items-center justify-between border-b border-border/40 py-0.5">
                    <code className="text-primary">{tok}</code>
                    <span className="text-muted-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-3">
            {t("tokens.reference_text")}
          </p>
        </div>
      </ComponentPreview>

      {/* Naming Conventions */}
      <ComponentPreview
        id="naming-conventions"
        title={t("naming.title")}
        description={t("naming.description")}
        code={`/* CSS Class Naming (BEM-inspired) */
.component                  →  .card
.component__element         →  .card__title
.component--modifier        →  .card--featured
.component.is-state         →  .card.is-active

/* Color Token Naming */
--ef-{color}              → base color
--ef-{color}-dark         → darker variant
--ef-{color}-light        → lighter variant
--ef-{color}-soft         → low-opacity bg tint
--ef-{color}-glow         → glow/shadow color`}
      >
        <div>
          <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
            {t("naming.file_structure")}
          </h4>
          <div className="font-mono text-xs text-muted-foreground bg-surface-1 border border-border p-4 space-y-1">
            <p>src/</p>
            <p className="pl-4">├── components/</p>
            <p className="pl-8">
              ├── ui/{" "}
              <span className="text-muted-foreground">{t("naming.arrow_ui")}</span>
            </p>
            <p className="pl-8">
              ├── layout/{" "}
              <span className="text-muted-foreground">
                {t("naming.arrow_layout")}
              </span>
            </p>
            <p className="pl-8">
              ├── content/{" "}
              <span className="text-muted-foreground">
                {t("naming.arrow_content")}
              </span>
            </p>
            <p className="pl-8">
              ├── feedback/{" "}
              <span className="text-muted-foreground">
                {t("naming.arrow_feedback")}
              </span>
            </p>
            <p className="pl-8">
              └── navigation/{" "}
              <span className="text-muted-foreground">
                {t("naming.arrow_navigation")}
              </span>
            </p>
            <p className="pl-4">├── styles/</p>
            <p className="pl-8">
              ├── tokens.css{" "}
              <span className="text-muted-foreground">
                {t("naming.arrow_tokens")}
              </span>
            </p>
            <p className="pl-8">
              ├── base.css{" "}
              <span className="text-muted-foreground">{t("naming.arrow_base")}</span>
            </p>
            <p className="pl-8">
              └── animations.css{" "}
              <span className="text-muted-foreground">
                {t("naming.arrow_animations")}
              </span>
            </p>
            <p className="pl-4">└── assets/</p>
          </div>
        </div>
      </ComponentPreview>

      {/* Behavioral Rules — Overview §98–111 */}
      <ComponentPreview
        id="behavioral-rules"
        title={t("behavioral_rules.title", { defaultValue: "Behavioral Rules" })}
        description={t("behavioral_rules.description", { defaultValue: "Invisible interaction contracts from sections 98–111: timing, focus, z-index, scroll, touch, forms, destructive actions, error recovery, notifications, media queries, consistency, sizing, navigation, and CLS prevention." })}
      >
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "#timing-focus", label: "§98–100 · Timing, Focus & Z-Index", desc: "Response timing, debounce/throttle patterns, keyboard navigation, focus trap rules, escape hierarchy, z-index stacking tokens." },
            { href: "#scroll-touch-rules", label: "§101–102 · Scroll & Touch", desc: "Scroll behavior by navigation type, overscroll utilities, touch target size standards by breakpoint, iOS safe area insets." },
            { href: "#form-action-rules", label: "§103–105 · Forms & Actions", desc: "Form behavior contracts, autosave indicator states, destructive action severity table, error recovery hierarchy with auto-retry." },
            { href: "#notification-media", label: "§106–107 · Notifications & Media", desc: "Toast duration rules, hover-pause, max visible, position policy, media query patterns for accessibility and contrast." },
            { href: "#consistency-sizing", label: "§108–111 · Standards & Sizing", desc: "Consistency standards for all components, responsive sizing matrix, link behavior table, CLS prevention rules and score targets." },
          ].map(({ href, label, desc }) => (
            <a key={href} href={href} className="block p-3 bg-surface-1 border border-border hover:border-primary/50 transition-colors">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5">{label}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
            </a>
          ))}
        </div>
      </ComponentPreview>

      {/* §98–100: Timing, Focus & Z-Index */}
      <ComponentPreview
        id="timing-focus"
        title={t("timing_focus.title", { defaultValue: "§98–100 · Timing, Focus & Z-Index" })}
        description={t("timing_focus.description", { defaultValue: "Doherty Threshold timing rules, debounce/throttle patterns, keyboard navigation & focus trap rules, escape overlay hierarchy, and z-index stacking tokens." })}
        code={`// Debounce — search input (300ms)
import { useDebouncedCallback } from "use-debounce";

const onSearch = useDebouncedCallback((value: string) => {
  fetchResults(value);
}, 300);

// Throttle — scroll handler (16ms ≈ 60fps)
import { throttle } from "lodash-es";
const onScroll = useCallback(throttle(() => {
  setScrollY(window.scrollY);
}, 16), []);

// Focus trap — useFocusTrap hook
import { useFocusTrap } from "reend-components";

const ref = useFocusTrap<HTMLDivElement>(isOpen);
<div ref={ref} role="dialog" aria-modal="true">
  {/* Tab/Shift+Tab loops within this element */}
</div>

/* Z-index tokens — use these, never raw numbers */
z-index: var(--z-dropdown);   /* 100 */
z-index: var(--z-header);     /* 1000 */
z-index: var(--z-modal);      /* 2000 */
z-index: var(--z-toast);      /* 3000 */`}
      >
        <div className="space-y-8">

          {/* 98. Timing */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 98 {"\u00B7"} TIMING &amp; RESPONSE (DOHERTY THRESHOLD)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 pr-4 text-muted-foreground font-normal uppercase tracking-wide">Response Time</th>
                    <th className="text-left py-1.5 pr-4 text-muted-foreground font-normal uppercase tracking-wide">Perception</th>
                    <th className="text-left py-1.5 text-muted-foreground font-normal uppercase tracking-wide">Rule</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["0\u2013100ms", "Instant", "Hover, toggle \u2014 no transition needed"],
                    ["100\u2013300ms", "Fast", "Button press, dropdown, tooltip"],
                    ["300\u20131000ms", "Noticeable", "Show skeleton/spinner"],
                    ["1\u20133s", "Slow", "Loading indicator REQUIRED"],
                    ["3\u201310s", "Frustrating", "Progress bar + cancel option"],
                    [">10s", "Unacceptable", "Background process + completion notification"],
                  ].map(([time, perception, rule]) => (
                    <tr key={time} className="border-b border-border/40">
                      <td className="py-1.5 pr-4 text-primary">{time}</td>
                      <td className="py-1.5 pr-4 text-foreground">{perception}</td>
                      <td className="py-1.5 text-muted-foreground">{rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
              {[
                { interaction: "Search input", technique: "Debounce", delay: "300ms" },
                { interaction: "Window resize", technique: "Debounce", delay: "150ms" },
                { interaction: "Scroll event", technique: "Throttle", delay: "16ms" },
                { interaction: "Form autosave", technique: "Debounce", delay: "2000ms" },
              ].map((row) => (
                <div key={row.interaction} className="p-2 bg-surface-1 border border-border">
                  <p className="text-[10px] font-display uppercase text-foreground">{row.interaction}</p>
                  <p className="text-[10px] font-mono text-primary">{row.technique} {row.delay}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 99. Focus Management */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 99 {"\u00B7"} FOCUS MANAGEMENT &amp; KEYBOARD</p>
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <p className="text-[10px] font-display uppercase text-muted-foreground mb-1.5">Focus Trap Rules</p>
                <div className="space-y-1">
                  {[
                    "Modal OPEN \u2192 focus first focusable element",
                    "Tab on last element \u2192 loops to first",
                    "Shift+Tab on first \u2192 goes to last",
                    "Modal CLOSE \u2192 focus returns to trigger",
                    "Escape always closes topmost overlay",
                  ].map((rule) => (
                    <div key={rule} className="flex gap-2 text-[11px]">
                      <span className="text-primary shrink-0">{"\u25C6"}</span>
                      <span className="text-muted-foreground">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-display uppercase text-muted-foreground mb-1.5">Escape Hierarchy</p>
                <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-2"><span className="text-primary/40">Layer 4</span><span>Tooltip {"\u2190"} closes first</span></div>
                  <div className="flex items-center gap-2"><span className="text-primary/40">Layer 3</span><span>Dropdown {"\u2190"} then this</span></div>
                  <div className="flex items-center gap-2"><span className="text-primary/40">Layer 2</span><span>Modal {"\u2190"} then this</span></div>
                  <div className="flex items-center gap-2"><span className="text-primary/40">Layer 1</span><span>Sidebar {"\u2190"} then this</span></div>
                  <div className="flex items-center gap-2"><span className="text-primary/40">Layer 0</span><span>Page {"\u2190"} Escape does nothing</span></div>
                </div>
              </div>
            </div>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-[11px] font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1 pr-4 text-muted-foreground font-normal">Key</th>
                    <th className="text-left py-1 pr-4 text-muted-foreground font-normal">Context</th>
                    <th className="text-left py-1 text-muted-foreground font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Escape", "Global", "Close topmost overlay"],
                    ["Enter", "Button/Form", "Activate / Submit"],
                    ["Space", "Checkbox/Radio", "Toggle"],
                    ["Tab / Shift+Tab", "Global", "Forward / Backward focus"],
                    ["\u2191\u2193", "Dropdown/Select", "Navigate options"],
                    ["\u2190\u2192", "Tabs/Slider", "Navigate items"],
                    ["Home / End", "List", "First / Last item"],
                    ["Ctrl+K", "Global", "Command palette"],
                  ].map(([key, ctx, action]) => (
                    <tr key={key} className="border-b border-border/40">
                      <td className="py-1 pr-4 text-primary">{key}</td>
                      <td className="py-1 pr-4 text-foreground">{ctx}</td>
                      <td className="py-1 text-muted-foreground">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 100. Z-Index */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 100 {"\u00B7"} Z-INDEX STACKING ORDER</p>
            <div className="grid grid-cols-2 gap-1.5 md:grid-cols-4">
              {[
                { token: "--z-below", value: "-1", use: "Background decorations" },
                { token: "--z-base", value: "0", use: "Normal flow" },
                { token: "--z-raised", value: "1", use: "Overlapping cards" },
                { token: "--z-dropdown", value: "100", use: "Dropdowns, Popovers" },
                { token: "--z-sticky", value: "200", use: "Sticky elements" },
                { token: "--z-header", value: "1000", use: "Fixed header" },
                { token: "--z-overlay", value: "1500", use: "Backdrop dim" },
                { token: "--z-modal", value: "2000", use: "Modal, Sheet, Drawer" },
                { token: "--z-toast", value: "3000", use: "Notifications" },
                { token: "--z-tooltip", value: "4000", use: "Tooltips" },
                { token: "--z-max", value: "9999", use: "Emergency only" },
              ].map(({ token, value, use }) => (
                <div key={token} className="p-2 bg-surface-1 border border-border">
                  <code className="text-[10px] text-primary block">{token}</code>
                  <span className="font-display text-xs text-foreground">{value}</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{use}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </ComponentPreview>

      {/* §101–102: Scroll & Touch */}
      <ComponentPreview
        id="scroll-touch-rules"
        title={t("scroll_touch_rules.title", { defaultValue: "§101–102 · Scroll & Touch" })}
        description={t("scroll_touch_rules.description", { defaultValue: "Scroll behavior rules for all navigation types, overscroll-behavior utilities, touch target size standards by breakpoint, and safe area CSS variables for iOS notch." })}
        code={`/* Smooth scroll + header offset (already in index.css) */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 72px; /* match header height */
}

/* Overscroll utilities (from utilities.css) */
.scrollable-panel { overscroll-behavior: contain; }
.no-pull-refresh   { overscroll-behavior-y: none; }

/* iOS safe area insets */
.bottom-nav {
  padding-bottom: calc(
    16px + env(safe-area-inset-bottom, 0px)
  );
}
/* viewport meta required: */
<meta name="viewport"
  content="width=device-width, initial-scale=1,
  viewport-fit=cover" />

/* Touch target min-height (§102) */
@media (pointer: coarse) {
  .interactive { min-height: 48px; min-width: 48px; }
}`}
      >
        <div className="space-y-8">

          {/* 101. Scroll */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 101 {"\u00B7"} SCROLL BEHAVIOR</p>
            <div className="grid gap-1.5 md:grid-cols-2">
              {[
                { nav: "Link to new page", behavior: "Scroll to top (auto)" },
                { nav: "Back button", behavior: "RESTORE previous scroll position" },
                { nav: "Anchor link #section", behavior: "Smooth scroll + header offset" },
                { nav: "Tab / filter change", behavior: "DON\u2019T scroll \u2014 stay in place" },
                { nav: "Infinite scroll load", behavior: "DON\u2019T shift \u2014 new content below" },
                { nav: "Modal open/close", behavior: "Page MUST NOT shift" },
              ].map(({ nav, behavior }) => (
                <div key={nav} className="flex gap-3 p-2 bg-surface-1 border border-border text-[11px]">
                  <span className="text-primary shrink-0">{"\u25C6"}</span>
                  <div>
                    <span className="font-display uppercase text-foreground">{nav}</span>
                    <span className="text-muted-foreground"> {"\u2192"} {behavior}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 p-3 bg-surface-1 border border-border font-mono text-[11px] text-muted-foreground">
              <span className="text-primary">{"/* Prevent scroll bounce in panels */"}</span><br/>
              {".scrollable-panel { overscroll-behavior: contain; }"}<br/>
              {".no-pull-refresh { overscroll-behavior-y: none; }"}
            </div>
          </div>

          {/* 102. Touch & Pointer */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 102 {"\u00B7"} TOUCH &amp; POINTER</p>
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <p className="text-[10px] font-display uppercase text-muted-foreground mb-1.5">Touch Target Standards</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] font-mono border-collapse">
                    <thead><tr className="border-b border-border"><th className="text-left py-1 pr-3 text-muted-foreground font-normal">Breakpoint</th><th className="text-left py-1 text-muted-foreground font-normal">Min Target</th></tr></thead>
                    <tbody>
                      {[["Mobile", "48px"], ["Tablet", "44px"], ["Desktop", "36px min"], ["Wide", "32px min"]].map(([bp, size]) => (
                        <tr key={bp} className="border-b border-border/40">
                          <td className="py-1 pr-3 text-foreground">{bp}</td>
                          <td className="py-1 text-primary">{size}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-display uppercase text-muted-foreground mb-1.5">Safe Area (iOS Notch)</p>
                <div className="p-2 bg-surface-1 border border-border font-mono text-[10px] text-muted-foreground space-y-0.5">
                  <div><span className="text-primary">--safe-top:</span> env(safe-area-inset-top, 0px)</div>
                  <div><span className="text-primary">--safe-bottom:</span> env(safe-area-inset-bottom, 0px)</div>
                  <div className="text-muted-foreground/60 pt-1">Viewport meta requires viewport-fit=cover</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </ComponentPreview>

      {/* §103–105: Forms & Actions */}
      <ComponentPreview
        id="form-action-rules"
        title={t("form_action_rules.title", { defaultValue: "§103–105 · Forms & Actions" })}
        description={t("form_action_rules.description", { defaultValue: "Form behavior contracts: disable-on-submit, autosave indicator states, destructive action severity table with undo windows, and error recovery hierarchy with auto-retry backoff." })}
        code={`// Disable on submit — prevent double-submit
const [isPending, setIsPending] = useState(false);

async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  setIsPending(true);
  try { await submitForm(); }
  finally { setIsPending(false); }
}
<button type="submit" disabled={isPending}>
  {isPending ? <Spinner /> : "SUBMIT REPORT"}
</button>

/* Autosave indicator classes (from utilities.css) */
.autosave-saved    { /* ✓ Saved    — text-ef-green */ }
.autosave-saving   { /* ○ Saving…  — text-muted-foreground */ }
.autosave-unsaved  { /* ⚠ Unsaved  — text-ef-orange */ }
.autosave-error    { /* ↻ Retry    — text-ef-red */ }

// Destructive action — Enter must NOT trigger
<button
  type="button"           // not "submit"
  className="btn-danger"
  onClick={handleDelete}
>
  DELETE RECORD
</button>`}
      >
        <div className="space-y-8">

          {/* 103. Form Behavior */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 103 {"\u00B7"} FORM BEHAVIOR</p>
            <div className="grid gap-1.5 md:grid-cols-2">
              {[
                { rule: "Disable on submit", desc: "Prevent double-submit. Button disabled + spinner." },
                { rule: "Error recovery", desc: "Scroll + focus to first error. Form data preserved." },
                { rule: "Unsaved changes", desc: "beforeunload warning for long forms and editors." },
                { rule: "Autosave debounce", desc: "Rich text: 2000ms debounce. Short forms: none." },
                { rule: "Password visibility", desc: "Toggle eye icon. Never auto-hide after timeout." },
                { rule: "Enter behavior", desc: "Single input \u2192 Enter submits. Multi-field \u2192 only last field." },
              ].map(({ rule, desc }) => (
                <div key={rule} className="flex gap-3 p-2 bg-surface-1 border border-border text-[11px]">
                  <span className="text-primary shrink-0">{"\u25C6"}</span>
                  <div><p className="font-display uppercase text-foreground">{rule}</p><p className="text-muted-foreground">{desc}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { cls: "autosave-saved", label: "\u2713 Saved", tokenCls: "text-ef-green" },
                { cls: "autosave-saving", label: "\u25CB Saving\u2026", tokenCls: "text-muted-foreground" },
                { cls: "autosave-unsaved", label: "\u26A0 Unsaved", tokenCls: "text-ef-orange" },
                { cls: "autosave-error", label: "\u21BB Retry", tokenCls: "text-ef-red" },
              ].map(({ cls, label, tokenCls }) => (
                <div key={cls} className={`flex items-center gap-1.5 px-2 py-1 bg-surface-1 border border-border text-[11px] font-mono ${tokenCls}`}>
                  <code className="text-muted-foreground text-[9px]">.{cls}</code>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 104. Destructive Actions */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 104 {"\u00B7"} DESTRUCTIVE ACTION SEVERITY</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] font-mono border-collapse">
                <thead><tr className="border-b border-border">{["Level", "Action Example", "Confirmation", "Undo"].map(h => <th key={h} className="text-left py-1.5 pr-4 text-muted-foreground font-normal">{h}</th>)}</tr></thead>
                <tbody>
                  {[
                    ["Trivial", "Clear filter", "NONE", "Undo toast 5s"],
                    ["Minor", "Delete draft", "Single click", "Undo toast 8s"],
                    ["Moderate", "Delete post", "Confirm dialog", "Undo toast 15s"],
                    ["Critical", "Delete account", "Type to confirm", "NONE"],
                    ["Catastrophic", "Wipe all data", "Exact phrase + 10s", "NONE"],
                  ].map(([level, action, confirm, undo]) => (
                    <tr key={level} className="border-b border-border/40">
                      <td className="py-1.5 pr-4 text-primary font-semibold">{level}</td>
                      <td className="py-1.5 pr-4 text-foreground">{action}</td>
                      <td className="py-1.5 pr-4 text-muted-foreground">{confirm}</td>
                      <td className="py-1.5 text-muted-foreground">{undo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">{"\u25C6"} Destructive CTA always on RIGHT. Default focus on CANCEL. Enter must NOT trigger destructive action.</p>
          </div>

          {/* 105. Error Recovery */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 105 {"\u00B7"} ERROR RECOVERY &amp; RESILIENCE</p>
            <div className="grid gap-1.5 md:grid-cols-2">
              {[
                { severity: "Field error", response: "Inline message below field", action: "Fix input" },
                { severity: "Form error", response: "Summary above form + scroll to first", action: "Fix fields" },
                { severity: "Action error", response: "Toast notification", action: "Retry or dismiss" },
                { severity: "Network error", response: "Persistent banner + auto-retry", action: "Wait or retry" },
                { severity: "Auth error", response: "Redirect + preserve intended URL", action: "Re-login" },
                { severity: "Fatal error", response: "Full error page (500)", action: "Refresh" },
              ].map(({ severity, response, action }) => (
                <div key={severity} className="p-2 bg-surface-1 border border-border text-[11px]">
                  <p className="font-display uppercase text-primary">{severity}</p>
                  <p className="text-muted-foreground">{response}</p>
                  <p className="text-foreground font-mono text-[10px] mt-0.5">{"\u2192"} {action}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Auto-retry: 3 attempts with exponential backoff (1s {"\u2192"} 2s {"\u2192"} 4s).</p>
          </div>

        </div>
      </ComponentPreview>

      {/* §106–107: Notifications & Media Queries */}
      <ComponentPreview
        id="notification-media"
        title={t("notification_media.title", { defaultValue: "§106–107 · Notifications & Media Queries" })}
        description={t("notification_media.description", { defaultValue: "Toast notification rules: duration per severity, hover-pause, max visible, position policy. Media query patterns for prefers-reduced-motion, forced-colors, prefers-contrast, and pointer type." })}
        code={`// Toast usage — durations enforced by design system
import { notify } from "reend-components";

notify.info("Scan complete.",    { duration: 5000 });
notify.success("Deploy done.",   { duration: 4000 });
notify.warning("Low memory.",    { duration: 8000 });
notify.error("Signal lost.",     { duration: Infinity }); // never auto-dismiss

/* §107 — Preference media queries */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
@media (forced-colors: active) {
  .btn-primary {
    background: ButtonFace; color: ButtonText;
    border: 2px solid ButtonText;
  }
}
@media (pointer: coarse) {
  .hover-tooltip { display: none; }
}`}
      >
        <div className="space-y-8">

          {/* 106. Notifications */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 106 {"\u00B7"} NOTIFICATION &amp; TOAST RULES</p>
            <div className="grid gap-1.5 grid-cols-2 md:grid-cols-4">
              {[
                { type: "info", duration: "5s", color: "text-foreground" },
                { type: "success", duration: "4s", color: "text-ef-green" },
                { type: "warning", duration: "8s", color: "text-ef-orange" },
                { type: "error", duration: "\u221E (no dismiss)", color: "text-ef-red" },
              ].map(({ type, duration, color }) => (
                <div key={type} className={`p-2 bg-surface-1 border border-border text-[11px] ${color}`}>
                  <p className="font-display uppercase">{type}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{duration}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Max 3 visible {"\u00B7"} Hover pauses auto-dismiss {"\u00B7"} Error toasts NEVER auto-dismiss {"\u00B7"} Position: top-right desktop, bottom-center mobile</p>
          </div>

          {/* 107. Media Queries */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 107 {"\u00B7"} MEDIA QUERY &amp; PREFERENCE RULES</p>
            <div className="grid gap-2 md:grid-cols-2">
              {[
                {
                  label: "prefers-reduced-motion",
                  code: "@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}",
                },
                {
                  label: "forced-colors (Windows HC)",
                  code: "@media (forced-colors: active) {\n  .btn-primary {\n    background: ButtonFace;\n    color: ButtonText;\n    border: 2px solid ButtonText;\n  }\n}",
                },
                {
                  label: "prefers-contrast: more",
                  code: "@media (prefers-contrast: more) {\n  :root {\n    --border-subtle: rgba(255,255,255,0.2);\n    --text-muted: #BBBBBB;\n  }\n}",
                },
                {
                  label: "pointer: coarse (touch)",
                  code: "@media (pointer: coarse) {\n  .btn { min-height: 48px; }\n  .hover-tooltip { display: none; }\n}\n@media (hover: hover) and (pointer: fine) {\n  .btn { min-height: 36px; }\n}",
                },
              ].map(({ label, code }) => (
                <div key={label} className="bg-surface-1 border border-border overflow-hidden">
                  <div className="px-2 py-1 bg-surface-2 border-b border-border">
                    <p className="font-mono text-[10px] text-primary">{label}</p>
                  </div>
                  <pre className="p-2 text-[10px] font-mono text-muted-foreground overflow-x-auto whitespace-pre">{code}</pre>
                </div>
              ))}
            </div>
          </div>

        </div>
      </ComponentPreview>

      {/* §108–111: Standards & Sizing */}
      <ComponentPreview
        id="consistency-sizing"
        title={t("consistency_sizing.title", { defaultValue: "§108–111 · Standards & Sizing" })}
        description={t("consistency_sizing.description", { defaultValue: "Consistency standards for all component types, responsive sizing matrix, link & navigation behavior table, and CLS prevention rules with Core Web Vitals score targets." })}
        code={`/* Container — max-width + padding */
.container {
  width: 100%; max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 768px) { .container { padding: 0 24px; } }

/* External links — always ↗ + noopener */
a[target="_blank"] {
  /* Add ↗ icon via JSX, not CSS */
}
<a href="https://example.com" target="_blank"
   rel="noopener noreferrer">
  GITHUB ↗
</a>

/* CLS prevention — pre-allocate space */
img { width: 100%; height: auto; aspect-ratio: 16/9; }

/* Skeleton must match EXACT content dimensions */
<Skeleton className="h-[40px] w-[280px]" />
{/* then render: */}
<h2 className="h-[40px] w-[280px]">Title</h2>`}
      >
        <div className="space-y-8">

          {/* 108. Consistency */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 108 {"\u00B7"} CONSISTENCY STANDARDS</p>
            <div className="grid gap-1.5 md:grid-cols-2">
              {[
                ["All links", "Internal: same tab. External: _blank + \u2197 icon + rel=noopener"],
                ["All forms", "Enter submits. Escape cancels/clears"],
                ["All modals", "Click backdrop = close. Escape = close. Focus trapped"],
                ["All dropdowns", "Click outside = close. Escape = close. Arrow keys navigate"],
                ["All tooltips", "Hover (mouse). Focus (keyboard). No tooltip on touch"],
                ["All destructive", "btn-danger style. CANCEL on left. CTA on right"],
                ["Success feedback", "Green toast always. Never swap colors"],
                ["Same icon rule", "Trash = delete everywhere. \u00D7 = dismiss. Never mix"],
              ].map(([component, standard]) => (
                <div key={component as string} className="flex gap-2 p-2 bg-surface-1 border border-border text-[11px]">
                  <span className="text-primary shrink-0">{"\u25C6"}</span>
                  <div>
                    <span className="font-display uppercase text-foreground">{component}</span>
                    <span className="text-muted-foreground"> {"\u2014"} {standard}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 109. Sizing Standards */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 109 {"\u00B7"} SIZING &amp; DIMENSION STANDARDS</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    {["Element", "Mobile", "Tablet", "Desktop", "Wide"].map(h => (
                      <th key={h} className="text-left py-1.5 pr-3 text-muted-foreground font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Container max", "100%", "100%", "1280px", "1536px"],
                    ["Container pad", "16px", "24px", "24px", "24px"],
                    ["Sidebar", "hidden", "hidden", "280px", "280px"],
                    ["Header height", "56px", "64px", "64px", "64px"],
                    ["H1 size", "28px", "36px", "40px", "40px"],
                    ["Touch target", "48px", "44px", "36px", "32px"],
                    ["Modal width", "95vw", "max 600px", "max-w variant", "max-w variant"],
                  ].map(([element, ...values]) => (
                    <tr key={element} className="border-b border-border/40">
                      <td className="py-1.5 pr-3 text-foreground">{element}</td>
                      {values.map((v, i) => <td key={i} className="py-1.5 pr-3 text-primary">{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 110. Link & Navigation */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 110 {"\u00B7"} LINK &amp; NAVIGATION BEHAVIOR</p>
            <div className="grid gap-1.5 md:grid-cols-2">
              {[
                { type: "Internal page", target: "_self", indicator: "\u2014", note: "Navigate, no reload" },
                { type: "Anchor #", target: "_self", indicator: "\u2014", note: "Smooth scroll + header offset" },
                { type: "External site", target: "_blank", indicator: "\u2197", note: 'rel="noopener noreferrer"' },
                { type: "Download", target: "_self", indicator: "\u2193", note: "Starts download" },
                { type: "mailto:", target: "_self", indicator: "\u2709", note: "Opens email client" },
                { type: "tel:", target: "_self", indicator: "\u260E", note: "Opens phone dialer" },
              ].map(({ type, target, indicator, note }) => (
                <div key={type} className="flex items-center gap-2 p-2 bg-surface-1 border border-border text-[11px]">
                  <code className="text-primary w-20 shrink-0">{type}</code>
                  <span className="text-muted-foreground text-[10px] w-12">{target}</span>
                  <span className="text-primary w-4">{indicator}</span>
                  <span className="text-muted-foreground">{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 111. CLS Prevention */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{"\u25C6"} 111 {"\u00B7"} CONTENT REFLOW &amp; CLS PREVENTION</p>
            <div className="grid gap-1.5 md:grid-cols-2">
              {[
                { element: "Images", rule: "Always set width + height or use aspect-ratio" },
                { element: "Ads / Embeds", rule: "Pre-allocate min-height to prevent shift" },
                { element: "Fonts", rule: "font-display: swap + size-adjust fallback" },
                { element: "Dynamic content", rule: "Insert BELOW viewport, not above current read" },
                { element: "Banners", rule: "Show at page load \u2014 NOT delayed by 3s" },
                { element: "Skeleton", rule: "Match EXACT dimensions of final content" },
                { element: "Toasts", rule: "position: fixed \u2014 NEVER shift page content" },
              ].map(({ element, rule }) => (
                <div key={element} className="flex gap-2 p-2 bg-surface-1 border border-border text-[11px]">
                  <span className="text-primary shrink-0">{"\u25C6"}</span>
                  <div>
                    <span className="font-display uppercase text-foreground">{element}</span>
                    <span className="text-muted-foreground"> {"\u2014"} {rule}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-4 p-3 bg-surface-1 border border-border text-[11px] font-mono">
              <div className="text-center"><span className="text-ef-green font-semibold">{"< 0.1"}</span><br/><span className="text-muted-foreground">Good</span></div>
              <div className="text-center"><span className="text-ef-orange font-semibold">0.1{"\u2013"}0.25</span><br/><span className="text-muted-foreground">Needs Work</span></div>
              <div className="text-center"><span className="text-ef-red font-semibold">{"> 0.25"}</span><br/><span className="text-muted-foreground">Poor</span></div>
              <div className="ml-auto text-muted-foreground self-center">CLS Score Target</div>
            </div>
          </div>

        </div>
      </ComponentPreview>

      {/* Auth Layouts */}
      <ComponentPreview
        id="auth-layouts"
        title={t("auth_layouts.title", { defaultValue: "Auth Layouts" })}
        description={t("auth_layouts.description", { defaultValue: "Recommended layout patterns for authentication pages: split-panel (40% form / 60% visual), centered card, and fullscreen immersive. Responsive — visual panel hidden on mobile." })}
        code={`/* Split panel — 40% form / 60% visual */
.auth-split {
  display: grid;
  grid-template-columns: 2fr 3fr;
  min-height: 100vh;
}
@media (max-width: 640px) {
  .auth-split { grid-template-columns: 1fr; }
  .auth-split .visual-panel { display: none; }
}

/* Centered card */
.auth-centered {
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh;
  background: hsl(var(--surface-canvas));
}
.auth-card {
  width: 100%; max-width: 420px;
  padding: 40px;
  background: hsl(var(--surface-1));
  border: 1px solid hsl(var(--border));
}

/* Fullscreen immersive */
.auth-fullscreen {
  position: relative; min-height: 100vh;
  background: hsl(var(--surface-canvas));
}
.auth-fullscreen::after {
  content: ""; position: absolute; inset: 0;
  background: var(--ef-gradient-scanline);
  opacity: 0.05; pointer-events: none;
}
.auth-fullscreen .auth-card { backdrop-filter: blur(12px); }
`}
      >
        <div className="space-y-6">
          {/* Layout variants */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">&#9670; LAYOUT VARIANTS</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-display text-muted-foreground uppercase">
              {/* Split Panel */}
              <div className="border border-border bg-surface-1 p-4 space-y-2">
                <div className="h-24 bg-surface-2 border border-border/50 overflow-hidden flex">
                  {/* Form panel 40% */}
                  <div className="w-[40%] border-r border-border/50 flex flex-col items-center justify-center gap-1 p-2">
                    <div className="w-full h-1.5 bg-border/40 rounded-none" />
                    <div className="w-full h-1.5 bg-border/40 rounded-none" />
                    <div className="w-full h-3 bg-primary/30 rounded-none mt-1" />
                    <span className="text-[7px] text-muted-foreground/50 mt-1">FORM</span>
                  </div>
                  {/* Visual panel 60% */}
                  <div className="flex-1 flex items-center justify-center opacity-30">
                    <div className="w-4 h-4 text-primary/40 text-[16px]">◆</div>
                  </div>
                </div>
                <p className="font-display text-[11px] font-semibold text-foreground">Split Panel</p>
                <p className="text-[11px] text-muted-foreground normal-case font-body leading-relaxed">40% form / 60% visual. Default for Login & Register. Visual hidden on mobile.</p>
              </div>
              {/* Centered Card */}
              <div className="border border-border bg-surface-1 p-4 space-y-2">
                <div className="h-24 bg-surface-canvas border border-border/50 overflow-hidden flex items-center justify-center">
                  <div className="w-[55%] h-[70%] bg-surface-2 border border-border/60 flex flex-col items-center justify-center gap-1 p-1.5">
                    <div className="w-full h-1 bg-border/40" />
                    <div className="w-full h-1 bg-border/40" />
                    <div className="w-full h-2.5 bg-primary/30 mt-0.5" />
                  </div>
                </div>
                <p className="font-display text-[11px] font-semibold text-foreground">Centered Card</p>
                <p className="text-[11px] text-muted-foreground normal-case font-body leading-relaxed">Surface-1 card on canvas background. Compact pages (Forgot Password, Reset).</p>
              </div>
              {/* Fullscreen Immersive */}
              <div className="border border-border bg-surface-1 p-4 space-y-2">
                <div className="h-24 bg-surface-canvas border border-border/50 overflow-hidden relative flex items-center justify-center">
                  {/* Scanline texture */}
                  <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "var(--ef-gradient-scanline)" }} />
                  {/* Glass panel */}
                  <div className="relative w-[60%] h-[75%] panel-glass border border-border/30 flex flex-col items-center justify-center gap-1 p-2">
                    <div className="w-full h-1 bg-border/40" />
                    <div className="w-full h-1 bg-border/40" />
                    <div className="w-full h-2.5 bg-primary/40 mt-0.5" />
                  </div>
                </div>
                <p className="font-display text-[11px] font-semibold text-foreground">Fullscreen Immersive</p>
                <p className="text-[11px] text-muted-foreground normal-case font-body leading-relaxed">Full bleed background + panel-glass overlay. Most dramatic variant.</p>
              </div>
            </div>
          </div>

          {/* Split panel wireframe */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">&#9670; SPLIT PANEL WIREFRAME</p>
            <div className="border border-border bg-surface-0 grid grid-cols-1 sm:grid-cols-[2fr_3fr] min-h-[220px]">
              {/* Form panel (40%) — always visible */}
              <div className="border-b border-border sm:border-b-0 sm:border-r border-border p-5 flex flex-col justify-center gap-3">
                <div className="space-y-1">
                  <p className="font-mono text-[9px] text-primary uppercase tracking-widest">&#9670; ENDFIELD</p>
                  <p className="font-display text-sm font-bold uppercase text-foreground">WELCOME BACK, OPERATOR</p>
                  <p className="text-[11px] text-muted-foreground">Enter credentials to continue</p>
                </div>
                <div className="space-y-2">
                  <div className="border border-border bg-surface-1 h-8 px-2 flex items-center">
                    <span className="text-[10px] font-mono text-muted-foreground/50">EMAIL ADDRESS</span>
                  </div>
                  <div className="border border-border bg-surface-1 h-8 px-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground/50">PASSWORD</span>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="text-muted-foreground" aria-hidden="true">
                      <ellipse cx="7" cy="5" rx="6" ry="4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                      <circle cx="7" cy="5" r="2" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <div className="h-8 bg-primary flex items-center justify-center">
                  <span className="font-display text-[10px] font-bold text-primary-foreground uppercase">INITIALIZE SESSION</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="font-mono text-[9px] text-muted-foreground">OR</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-border h-7 flex items-center justify-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-muted-foreground/60" aria-hidden="true">
                      <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="0.8"/>
                      <path d="M7.5 6H4M6 4v4" stroke="currentColor" strokeWidth="0.8"/>
                    </svg>
                    <span className="text-[9px] text-muted-foreground">Google</span>
                  </div>
                  <div className="border border-border h-7 flex items-center justify-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="text-muted-foreground/60" aria-hidden="true">
                      <path d="M6 0C2.69 0 0 2.76 0 6.17c0 2.72 1.72 5.03 4.1 5.84.3.06.41-.13.41-.29v-1.01c-1.67.37-2.02-.83-2.02-.83-.27-.71-.67-.9-.67-.9-.55-.38.04-.37.04-.37.61.04.93.64.93.64.54.95 1.41.68 1.75.52.05-.4.21-.68.38-.84-1.33-.15-2.73-.68-2.73-3.02 0-.67.23-1.21.62-1.64-.06-.16-.27-.78.06-1.62 0 0 .5-.16 1.65.63A5.6 5.6 0 016 2.95a5.6 5.6 0 011.5.21c1.14-.79 1.64-.63 1.64-.63.33.84.13 1.46.06 1.62.38.43.62.97.62 1.64 0 2.35-1.4 2.87-2.74 3.02.22.19.41.56.41 1.13v1.68c0 .16.11.36.41.29A6.18 6.18 0 0012 6.17C12 2.76 9.31 0 6 0z"/>
                    </svg>
                    <span className="text-[9px] text-muted-foreground">GitHub</span>
                  </div>
                </div>
              </div>
              {/* Visual panel (60%) — hidden on mobile, visible sm+ */}
              <div className="hidden sm:flex bg-surface-2 items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "var(--ef-gradient-scanline)" }} />
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 mx-auto text-primary/20 text-3xl font-display">◆</div>
                  <span className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest block">ATMOSPHERIC ART / VIDEO</span>
                  <span className="font-mono text-[8px] text-muted-foreground/25 uppercase tracking-wider block">Hidden on mobile</span>
                </div>
              </div>
            </div>
          </div>

          {/* Auth page variants table */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">&#9670; AUTH PAGE VARIANTS</p>
            <div className="border border-border overflow-hidden">
              <div className="grid grid-cols-[1fr_1.5fr_1.5fr] bg-surface-2 border-b border-border">
                {["PAGE", "TITLE", "CTA"].map(h => (
                  <div key={h} className="px-3 py-2 font-mono text-[10px] text-muted-foreground uppercase">{h}</div>
                ))}
              </div>
              {[
                ["Login", "WELCOME BACK, ENDMINISTRATOR", "INITIALIZE SESSION"],
                ["Register", "JOIN THE FRONTIER", "CREATE ACCOUNT"],
                ["Forgot Password", "RECOVER ACCESS", "SEND RESET CODE"],
                ["Reset Password", "SET NEW CREDENTIALS", "UPDATE PASSWORD"],
                ["Verify Email", "VERIFY YOUR SIGNAL", "OTP input (6 digits)"],
              ].map(([page, title, cta]) => (
                <div key={page} className="grid grid-cols-[1fr_1.5fr_1.5fr] border-b border-border last:border-b-0">
                  <div className="px-3 py-2 font-display text-[11px] font-semibold text-foreground">{page}</div>
                  <div className="px-3 py-2 font-mono text-[10px] text-primary">{title}</div>
                  <div className="px-3 py-2 font-mono text-[10px] text-muted-foreground">{cta}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Password strength pattern */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">&#9670; PASSWORD STRENGTH INDICATOR</p>
            <div className="space-y-2 p-3 bg-surface-1 border border-border">
              {[
                { label: "WEAK", width: "25%", fillCls: "bg-ef-red" },
                { label: "FAIR", width: "50%", fillCls: "bg-ef-orange" },
                { label: "GOOD", width: "75%", fillCls: "bg-primary" },
                { label: "STRONG", width: "100%", fillCls: "bg-ef-green" },
              ].map(({ label, width, fillCls }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground w-14">{label}</span>
                  <div className="flex-1 h-1.5 bg-surface-2">
                    <div className={`h-full transition-all ${fillCls}`} style={{ width }} />
                  </div>
                </div>
              ))}
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {["8+ characters", "Uppercase letter", "Number", "Special character"].map(req => (
                  <span key={req} className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                    <span className="text-primary">&#9670;</span> {req}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Pricing Tables */}
      <ComponentPreview
        id="pricing-tables"
        title={t("pricing_tables.title", { defaultValue: "Pricing Tables" })}
        description={t("pricing_tables.description", { defaultValue: "Multi-tier subscription cards with feature lists, recommended badge, and CTA buttons." })}
        code={`// Pricing card — featured tier
<div className="relative bg-surface-1 border border-primary/60 bg-primary/[0.04] p-6 flex flex-col gap-4">
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black
    font-display text-[10px] uppercase tracking-widest px-3 py-0.5">
    MOST POPULAR
  </div>
  <div className="font-display text-3xl font-bold text-foreground">
    $9.99<span className="text-sm text-muted-foreground">/mo</span>
  </div>
  <ul className="space-y-2">
    {features.map(f => (
      <li key={f} className="flex items-center gap-2 text-[13px] text-muted-foreground">
        <span className="text-primary text-[10px]">◆</span>{f}
      </li>
    ))}
  </ul>
  <button className="bg-primary text-black border border-primary font-display
    text-[12px] uppercase tracking-widest py-2">
    SUBSCRIBE
  </button>
</div>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { tier: "RECRUIT", price: "FREE", features: ["10 pulls/month", "Basic roster", "Standard missions"], primary: false },
            { tier: "OPERATOR", price: "9.99", features: ["60 pulls/month", "Full roster access", "Priority missions", "Exclusive skins"], primary: true },
            { tier: "ELITE II", price: "24.99", features: ["Unlimited pulls", "All operator access", "Custom HQ", "Early access", "Discord badge"], primary: false },
          ].map((plan) => (
            <div
              key={plan.tier}
              className={`relative bg-surface-1 border p-6 flex flex-col gap-4 ${plan.primary ? "border-primary/60 bg-primary/[0.04]" : "border-border"}`}
            >
              {plan.primary && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black font-display text-[10px] uppercase tracking-widest px-3 py-0.5">
                  MOST POPULAR
                </div>
              )}
              <div>
                <div className="font-display text-[11px] text-muted-foreground uppercase tracking-widest">{plan.tier}</div>
                <div className="font-display text-3xl font-bold text-foreground mt-1">
                  {plan.price === "FREE" ? "FREE" : <span>${plan.price}<span className="text-sm text-muted-foreground">/mo</span></span>}
                </div>
              </div>
              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span className="text-primary text-[10px]">◆</span>{f}
                  </li>
                ))}
              </ul>
              <button className={`font-display text-[12px] uppercase tracking-widest py-2 border transition-colors ${plan.primary ? "bg-primary text-black border-primary hover:bg-primary/80" : "border-border text-foreground hover:border-primary/40"}`}>
                {plan.price === "FREE" ? "GET STARTED" : "SUBSCRIBE"}
              </button>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Mega Menu */}
      <ComponentPreview
        id="mega-menu"
        title={t("mega_menu.title", { defaultValue: "Mega Menu" })}
        description={t("mega_menu.description", { defaultValue: "Multi-column dropdown navigation for complex content hierarchies." })}
        code={`.mega-menu {
  position: absolute;
  top: 100%; left: 0; right: 0;
  background: hsl(var(--surface-1));
  border: 1px solid hsl(var(--border-subtle));
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  z-index: var(--z-dropdown);
}
.mega-menu-col-title {
  font-family: 'Bender', sans-serif;
  font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: hsl(var(--primary));
  border-bottom: 1px solid hsl(var(--border-subtle));
  padding-bottom: 8px; margin-bottom: 12px;
}`}
      >
        <div className="border border-border bg-surface-1 p-4">
          <div className="font-display text-[11px] uppercase tracking-widest text-muted-foreground mb-4">MEGA MENU STRUCTURE</div>
          <div className="grid grid-cols-3 gap-6">
            {[
              { col: "OPERATORS", items: ["5★ Operators", "6★ Operators", "Faction Filter", "Compare Stats"] },
              { col: "RESOURCES", items: ["Originium Source", "LMD Farming", "XP Cards", "Skill Materials"] },
              { col: "GUIDES", items: ["Beginner Guide", "Stage Walkthroughs", "Meta Analysis", "Tier List"] },
            ].map((group) => (
              <div key={group.col}>
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-3">
                  {group.col}
                </div>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-primary transition-colors group">
                        <span className="text-[8px] group-hover:text-primary text-border">◆</span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      {/* Kanban */}
      <ComponentPreview
        id="kanban"
        title={t("kanban.title", { defaultValue: "Kanban Board" })}
        description={t("kanban.description", { defaultValue: "Drag cards between columns. Dragging card gets .dragging state (opacity-50 + dashed primary border). Target column highlights with .drop-target state." })}
        code={`// Drag state managed with useRef + useState
const dragging = useRef<{ cardId: string; fromColId: string } | null>(null);
const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
const [dropTargetColId, setDropTargetColId] = useState<string | null>(null);

// onDragStart — mark card as dragging
onDragStart={(e) => {
  dragging.current = { cardId, fromColId: colId };
  setDraggingCardId(cardId);
  e.dataTransfer.effectAllowed = "move";
}}

// onDrop — move card to target column
onDrop={(e) => {
  e.preventDefault();
  const { cardId, fromColId } = dragging.current!;
  if (fromColId !== toColId) {
    setColumns(prev => {
      const next = prev.map(col => ({ ...col, cards: [...col.cards] }));
      const fromCol = next.find(c => c.id === fromColId)!;
      const toCol   = next.find(c => c.id === toColId)!;
      const [card]  = fromCol.cards.splice(
        fromCol.cards.findIndex(c => c.id === cardId), 1
      );
      toCol.cards.push(card);
      return next;
    });
  }
  setDraggingCardId(null); setDropTargetColId(null);
}}

/* CSS states (§88) */
.kanban-card.dragging     { opacity: 0.5; border: 1px dashed hsl(var(--primary) / 0.4); }
.kanban-column.drop-target { background: hsl(var(--primary) / 0.03);
                              border-color: hsl(var(--primary) / 0.2); }`}
      >
        <KanbanDemo />
      </ComponentPreview>

      {/* Language Switcher */}
      <ComponentPreview
        id="language-switcher"
        title={t("language_switcher.title", { defaultValue: "Language Switcher" })}
        description={t("language_switcher.description", { defaultValue: "Active language highlighted with border-primary. Integrates with i18next and URL prefix routing." })}
        code={`import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const switchLang = (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("ef-lang", newLang);
    const newPath = window.location.pathname.replace(
      \`/\${lang}/\`, \`/\${newLang}/\`
    );
    navigate(newPath);
  };

  return (
    <div className="flex gap-2">
      {["en", "id"].map(l => (
        <button key={l} onClick={() => switchLang(l)}
          className={\`font-display text-[12px] uppercase px-3 py-1.5 border
            \${i18n.language === l
              ? "border-primary text-primary bg-primary/[0.08]"
              : "border-border text-muted-foreground"}\`}
        >{l}</button>
      ))}
    </div>
  );
}`}
      >
        <div className="flex items-center gap-3 p-4 bg-surface-1 border border-border w-fit">
          <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">LANGUAGE:</span>
          {["EN", "ID"].map((lang, i) => (
            <button
              key={lang}
              className={`font-display text-[12px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${i === 0 ? "border-primary text-primary bg-primary/[0.08]" : "border-border text-muted-foreground hover:border-primary/40"}`}
            >
              {lang}
            </button>
          ))}
        </div>
      </ComponentPreview>

      {/* Print Styles */}
      <ComponentPreview
        id="print-styles"
        title={t("print_styles.title", { defaultValue: "Print Styles" })}
        description={t("print_styles.description", { defaultValue: "Five utility classes for print control. Already included in index.css." })}
        code={`/* Already in index.css — no additional import needed */
@media print {
  .print-hidden      { display: none !important; }
  .print-only        { display: block !important; }
  .print-break-before { page-break-before: always; }
  .print-break-after  { page-break-after: always; }
  .print-no-break     { page-break-inside: avoid; }
}

/* Usage */
<nav className="print-hidden">Navigation</nav>
<header className="print-only">Print Header with logo</header>
<section className="print-no-break">Keep together on print</section>`}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { cls: ".print-hidden", desc: "Hide element in print" },
            { cls: ".print-only", desc: "Show only when printing" },
            { cls: ".print-break-before", desc: "Page break before element" },
            { cls: ".print-break-after", desc: "Page break after element" },
            { cls: ".print-no-break", desc: "Prevent break inside element" },
          ].map((item) => (
            <div key={item.cls} className="bg-surface-1 border border-border p-3">
              <div className="font-mono text-[12px] text-primary">{item.cls}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* FAB */}
      <ComponentPreview
        id="fab"
        title={t("fab.title", { defaultValue: "FAB / Chat Widget" })}
        description={t("fab.description", { defaultValue: "Diamond-shaped floating action button. Fixed position with z-index-overlay." })}
        code={`.fab {
  position: fixed;
  bottom: 24px; right: 24px;
  width: 56px; height: 56px;
  background: hsl(var(--primary)); color: hsl(var(--primary-foreground));
  display: flex; align-items: center; justify-content: center;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  box-shadow: 0 8px 32px hsl(var(--primary) / 0.4);
  transition: all 0.3s ease;
  z-index: var(--z-overlay);
  font-size: 24px; cursor: pointer;
}
.fab:hover {
  box-shadow: 0 12px 48px hsl(var(--primary) / 0.6);
  transform: scale(1.05);
}`}
      >
        <div className="relative h-40 bg-surface-1 border border-border overflow-hidden">
          <div className="absolute bottom-4 right-4">
            <button
              aria-label="Open actions"
              className="w-14 h-14 bg-primary text-black flex items-center justify-center text-xl shadow-[0_8px_32px_rgba(255,212,41,0.4)] hover:shadow-[0_12px_48px_rgba(255,212,41,0.6)] hover:scale-105 transition-all duration-300"
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="8" y="2" width="2" height="14" fill="currentColor"/>
                <rect x="2" y="8" width="14" height="2" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-[12px] font-display uppercase tracking-wider">
            FAB PREVIEW AREA
          </div>
        </div>
      </ComponentPreview>

      {/* Comments */}
      <ComponentPreview
        id="comments"
        title={t("comments.title", { defaultValue: "Comments" })}
        description={t("comments.description", { defaultValue: "Threaded comment layout with diamond avatar, nested replies, and ◆ like counter." })}
        code={`.comment { display: flex; gap: 12px; }
.comment--nested {
  margin-left: 32px;
  border-left: 1px solid hsl(var(--border-subtle));
  padding-left: 16px;
}
.comment-avatar {
  width: 32px; height: 32px;
  background: hsl(var(--surface-2));
  border: 1px solid hsl(var(--border-subtle));
  flex-shrink: 0;
}
.comment-username {
  font-family: 'Bender', sans-serif;
  font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
}`}
      >
        <div className="space-y-4 max-w-lg">
          {[
            { user: "OPERATOR_7", time: "2 hours ago", text: "The new deployment strategy for chapter 9 is brilliant. Diamond formation with ranged support.", likes: 42, level: 0 },
            { user: "ANALYST_R", time: "1 hour ago", text: "Agreed. The key is positioning Eyjafjalla at node 3 to cover the right flank.", likes: 18, level: 1 },
          ].map((comment) => (
            <div key={comment.user} className={`flex gap-3 ${comment.level > 0 ? "ml-8 border-l border-border pl-4" : ""}`}>
              <div className="w-8 h-8 bg-surface-2 border border-border flex items-center justify-center shrink-0">
                <span className="text-primary text-[10px]">◆</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display text-[12px] font-bold uppercase text-foreground">{comment.user}</span>
                  <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{comment.text}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="font-display text-[10px] uppercase text-muted-foreground hover:text-primary transition-colors">
                    ◆ {comment.likes}
                  </button>
                  <button className="font-display text-[10px] uppercase text-muted-foreground hover:text-primary transition-colors">
                    REPLY
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Spoiler Tags */}
      <ComponentPreview
        id="spoiler-tags"
        title={t("spoiler_tags.title", { defaultValue: "Spoiler Tags" })}
        description={t("spoiler_tags.description", { defaultValue: "SpoilerBlock wraps content in a blur overlay with a reveal button. SpoilerInline hides inline text." })}
        code={`import { SpoilerBlock, SpoilerInline } from "reend-components";

// Block spoiler
<SpoilerBlock title="Chapter 9 Boss Identity">
  <p>The final boss is revealed to be Closure's twin sister...</p>
</SpoilerBlock>

// Custom labels
<SpoilerBlock revealLabel="UNLOCK LORE" hideLabel="CONCEAL">
  <img src="/boss.jpg" alt="Boss reveal" />
</SpoilerBlock>

// Inline spoiler
<p>
  The operator's true name is{" "}
  <SpoilerInline>REDACTED</SpoilerInline>.
</p>`}
      >
        <div className="space-y-4 max-w-lg">
          <SpoilerBlock title="Chapter 9 Boss Identity">
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              The final boss of Chapter 9 is revealed to be <strong className="text-foreground">Closure&apos;s twin sister</strong>,
              who has been manipulating the faction war from behind the scenes.
            </p>
          </SpoilerBlock>
        </div>
      </ComponentPreview>

      {/* Ad Placements */}
      <ComponentPreview
        id="ad-placements"
        title={t("ad_placements.title", { defaultValue: "Ad Placements" })}
        description={t("ad_placements.description", { defaultValue: "Pre-sized ad slot containers with min-height reservations to prevent Cumulative Layout Shift (CLS = 0)." })}
        code={`/* Ad slot containers — reserves space to prevent CLS */
.ad-slot {
  background: hsl(var(--surface-0));
  border: 1px dashed hsl(var(--border) / 0.3);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; position: relative;
}
.ad-slot--leaderboard { min-height: 90px; width: 100%; max-width: 728px; }
.ad-slot--sidebar { width: 300px; min-height: 250px; }
.ad-slot--in-article { width: 100%; min-height: 250px; margin: 32px 0; }

.ad-label {
  font-family: 'Orbitron', monospace;
  font-size: 9px; letter-spacing: 0.15em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
  position: absolute; top: 4px; right: 8px;
}

@media (max-width: 768px) {
  .ad-slot--leaderboard { max-width: 320px; min-height: 100px; }
  .ad-slot--sidebar { display: none; }
}`}
      >
        <div className="space-y-4">
          <div
            className="w-full flex items-center justify-center border border-dashed border-border/40 text-muted-foreground font-mono text-[10px] uppercase tracking-widest bg-surface-1"
            style={{ minHeight: 60 }}
          >
            LEADERBOARD AD — 728×90
          </div>
          <div
            className="w-48 flex items-center justify-center border border-dashed border-border/40 text-muted-foreground font-mono text-[10px] uppercase tracking-widest bg-surface-1"
            style={{ minHeight: 100 }}
          >
            SIDEBAR AD 300×250
          </div>
        </div>
      </ComponentPreview>

      {/* Audio Player */}
      <ComponentPreview
        id="audio-player"
        title={t("audio_player.title", { defaultValue: "Audio Player" })}
        description={t("audio_player.description", { defaultValue: "Inline audio player with diamond play button, 4px progress track, and Orbitron time display." })}
        code={`/* Audio Player Pattern (CSS + React) */
const [playing, setPlaying] = useState(false);
const [progress, setProgress] = useState(34);

<div className="bg-surface-2 border border-border p-4 space-y-3">
  {/* Track info */}
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-surface-3 border border-border flex items-center justify-center text-primary text-xs">
      ◆
    </div>
    <div>
      <p className="font-display text-xs font-bold uppercase tracking-[0.05em]">ENDFIELD THEME</p>
      <p className="text-xs text-muted-foreground">EF-SYS Audio v2.4</p>
    </div>
  </div>

  {/* Progress bar */}
  <div className="relative h-1 bg-surface-3 cursor-pointer">
    <div className="h-full bg-primary" style={{ width: \`\${progress}%\` }} />
  </div>

  {/* Controls */}
  <div className="flex items-center justify-between">
    <span className="font-mono text-xs text-muted-foreground">1:24</span>
    <button
      onClick={() => setPlaying(!playing)}
      aria-label={playing ? "Pause" : "Play"}
      className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground"
    >
      {playing ? "⏸" : "▶"}
    </button>
    <span className="font-mono text-xs text-muted-foreground">4:07</span>
  </div>
</div>`}
      >
        <div className="bg-surface-1 border border-border p-4 max-w-lg">
          <div>
            <div className="font-display text-[14px] font-semibold text-foreground">Endfield — Main Theme</div>
            <div className="text-[12px] text-muted-foreground mb-3">Arknights: Endfield OST</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Play"
              className="w-9 h-9 bg-primary text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                <path d="M2 1L11 7L2 13V1Z" fill="currentColor"/>
              </svg>
            </button>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 h-1 bg-surface-3 relative cursor-pointer">
                <div className="h-full bg-primary" style={{ width: "38%" }} />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">02:06 / 05:32</span>
            </div>
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground shrink-0" aria-hidden="true">
                <path d="M2 5H4L7 2V12L4 9H2V5Z" fill="currentColor"/>
                <path d="M9 4.5C9.8 5.2 10.3 6.1 10.3 7C10.3 7.9 9.8 8.8 9 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                <path d="M11 2.5C12.3 3.8 13 5.3 13 7C13 8.7 12.3 10.2 11 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              </svg>
              <div className="w-12 h-1 bg-surface-3">
                <div className="h-full bg-primary" style={{ width: "70%" }} />
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}
