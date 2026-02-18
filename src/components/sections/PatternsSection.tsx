import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../docs/ComponentPreview";

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
        </div>
      </ComponentPreview>

      {/* Responsive */}
      <ComponentPreview
        id="responsive"
        title={t("responsive.title")}
        description={t("responsive.description")}
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
          {t("tokens.reference_text")}
        </p>
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
              <span className="text-ef-gray-mid">{t("naming.arrow_ui")}</span>
            </p>
            <p className="pl-8">
              ├── layout/{" "}
              <span className="text-ef-gray-mid">
                {t("naming.arrow_layout")}
              </span>
            </p>
            <p className="pl-8">
              ├── content/{" "}
              <span className="text-ef-gray-mid">
                {t("naming.arrow_content")}
              </span>
            </p>
            <p className="pl-8">
              ├── feedback/{" "}
              <span className="text-ef-gray-mid">
                {t("naming.arrow_feedback")}
              </span>
            </p>
            <p className="pl-8">
              └── navigation/{" "}
              <span className="text-ef-gray-mid">
                {t("naming.arrow_navigation")}
              </span>
            </p>
            <p className="pl-4">├── styles/</p>
            <p className="pl-8">
              ├── tokens.css{" "}
              <span className="text-ef-gray-mid">
                {t("naming.arrow_tokens")}
              </span>
            </p>
            <p className="pl-8">
              ├── base.css{" "}
              <span className="text-ef-gray-mid">{t("naming.arrow_base")}</span>
            </p>
            <p className="pl-8">
              └── animations.css{" "}
              <span className="text-ef-gray-mid">
                {t("naming.arrow_animations")}
              </span>
            </p>
            <p className="pl-4">└── assets/</p>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}
