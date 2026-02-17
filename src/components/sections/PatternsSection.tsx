import { ComponentPreview } from "../docs/ComponentPreview";

export const PatternsSection = () => {
  return (
    <>
      {/* Page Templates */}
      <ComponentPreview
        id="page-templates"
        title="Page Templates"
        showViewport
        description="Homepage, Documentation, Blog List, Blog Post, dan Error Page layouts."
        props={[
          {
            name: "template",
            type: '"homepage" | "documentation" | "blog-list" | "blog-post" | "error"',
            required: true,
            description: "Page template type",
          },
          {
            name: "header",
            type: "ReactNode",
            required: false,
            description: "Custom header override",
          },
          {
            name: "sidebar",
            type: "ReactNode",
            required: false,
            description: "Sidebar content (documentation template)",
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: "Main page content",
          },
        ]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: "HOMEPAGE",
              blocks: [
                "Header",
                "Hero 100vh",
                "Features 3-col",
                "Stats 4-grid",
                "CTA",
                "Footer",
              ],
            },
            {
              name: "DOCUMENTATION",
              blocks: [
                "Header",
                "Sidebar 280px",
                "Breadcrumb",
                "Content 680px",
                "TOC",
                "Footer",
              ],
            },
            {
              name: "BLOG LIST",
              blocks: [
                "Header",
                "Title",
                "Filter Tags",
                "Post Grid 2-col",
                "Pagination",
                "Footer",
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
        title="Section Patterns"
        showViewport
        description="Overline section, alternating layout, feature grid, testimonial, CTA."
        props={[
          {
            name: "overline",
            type: "string",
            required: false,
            description: "Section overline label",
          },
          {
            name: "heading",
            type: "string",
            required: true,
            description: "Section heading text",
          },
          {
            name: "layout",
            type: '"standard" | "alternating" | "grid"',
            default: '"standard"',
            required: false,
            description: "Content layout pattern",
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: "Section content",
          },
        ]}
      >
        <div className="space-y-8">
          {/* Overline Section Pattern */}
          <div>
            <span className="font-ui text-[11px] tracking-[0.15em] uppercase text-primary">
              OVERLINE
            </span>
            <div className="gradient-line-h mt-2 mb-4 opacity-50" />
            <h3 className="font-display text-2xl font-bold uppercase tracking-[0.02em] text-foreground mb-2">
              SECTION HEADING
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Description of this section goes here.
            </p>
            <button className="text-primary font-display text-xs font-bold tracking-[0.1em] uppercase flex items-center gap-2 bg-transparent">
              VIEW ALL →
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
                  FEATURE {n}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Description text.
                </p>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      {/* Responsive */}
      <ComponentPreview
        id="responsive"
        title="Responsive Breakpoints"
        description="Mobile 480px, Tablet 768px, Laptop 1024px, Desktop 1280px, Wide 1536px."
        props={[
          {
            name: "breakpoints",
            type: "Record<string, number>",
            required: false,
            description: "Custom breakpoint overrides",
          },
        ]}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                {["ELEMENT", "<768px", "768-1024px", ">1024px"].map((h) => (
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
                ["Container pad", "16px", "24px", "24px"],
                ["H1", "28px", "36px", "40px"],
                ["Card grid", "1 col", "2 col", "3 col"],
                ["Nav", "Hamburger", "Hamburger", "Inline"],
                ["Sidebar", "Overlay", "Overlay", "Fixed"],
                ["Hero height", "80vh", "90vh", "100vh"],
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
        title="Accessibility"
        description="Contrast ratios AAA. ARIA requirements. Skip navigation."
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              CONTRAST RATIOS
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
              ARIA REQUIREMENTS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                ["Modal", 'role="dialog", aria-modal'],
                ["Tab", 'role="tablist", aria-selected'],
                ["Accordion", "aria-expanded, aria-controls"],
                ["Toast", 'role="alert", aria-live'],
                ["Icon button", "aria-label (always)"],
                ["Loading", "aria-busy, aria-live"],
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
        title="Performance Guidelines"
        description="Images: WebP, lazy loading. Fonts: font-display swap, WOFF2. GPU animations."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "IMAGES",
              items: [
                "WebP + JPEG fallback",
                'loading="lazy"',
                "srcset responsive",
                "Max 2× display",
              ],
            },
            {
              title: "FONTS",
              items: [
                "font-display: swap",
                "WOFF2 format",
                "Critical fonts first",
                "Subset for CJK",
              ],
            },
            {
              title: "CSS",
              items: [
                "Critical CSS inline",
                "clip-path GPU accelerated",
                "contain: layout paint",
                "Non-critical deferred",
              ],
            },
            {
              title: "ANIMATION",
              items: [
                "transform + opacity only",
                "Avoid width/height/top/left",
                "will-change sparingly",
                "prefers-reduced-motion",
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
        title="Design Tokens (Complete)"
        description="Complete CSS variables reference — colors, surfaces, typography, spacing, shadows, transitions, z-index."
        code={`:root {
  /* Colors */
  --ef-black: #0A0A0A;      --ef-yellow: #FFD429;
  --ef-blue: #4DA8DA;        --ef-red: #FF4757;
  --ef-green: #2ED573;       --ef-orange: #FFA502;

  /* Surfaces */
  --surface-canvas: #0A0A0A; --surface-1: #141414;
  --surface-2: #1A1A1A;      --surface-3: #222222;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.4);
  --shadow-lg: 0 16px 48px rgba(0,0,0,0.5);
  --shadow-glow: 0 0 20px rgba(255,212,41,0.2);

  /* Z-Index */
  --z-dropdown: 100;  --z-header: 1000;
  --z-modal: 2000;    --z-toast: 3000;
}`}
      >
        <p className="text-sm text-muted-foreground">
          Lihat code block di bawah untuk referensi lengkap semua design tokens.
        </p>
      </ComponentPreview>

      {/* Naming Conventions */}
      <ComponentPreview
        id="naming-conventions"
        title="Naming Conventions"
        description="BEM-inspired CSS class naming. Color token naming convention."
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
            FILE STRUCTURE
          </h4>
          <div className="font-mono text-xs text-muted-foreground bg-surface-1 border border-border p-4 space-y-1">
            <p>src/</p>
            <p className="pl-4">├── components/</p>
            <p className="pl-8">
              ├── ui/{" "}
              <span className="text-ef-gray-mid">
                → Button, Input, Tag, Badge, Avatar
              </span>
            </p>
            <p className="pl-8">
              ├── layout/{" "}
              <span className="text-ef-gray-mid">
                → Header, Footer, Sidebar
              </span>
            </p>
            <p className="pl-8">
              ├── content/{" "}
              <span className="text-ef-gray-mid">
                → Card, CodeBlock, Timeline
              </span>
            </p>
            <p className="pl-8">
              ├── feedback/{" "}
              <span className="text-ef-gray-mid">→ Toast, Modal, Alert</span>
            </p>
            <p className="pl-8">
              └── navigation/{" "}
              <span className="text-ef-gray-mid">
                → Tabs, Breadcrumb, Pagination
              </span>
            </p>
            <p className="pl-4">├── styles/</p>
            <p className="pl-8">
              ├── tokens.css{" "}
              <span className="text-ef-gray-mid">→ Design tokens</span>
            </p>
            <p className="pl-8">
              ├── base.css{" "}
              <span className="text-ef-gray-mid">→ Reset, typography</span>
            </p>
            <p className="pl-8">
              └── animations.css{" "}
              <span className="text-ef-gray-mid">→ Keyframes</span>
            </p>
            <p className="pl-4">└── assets/</p>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
};
