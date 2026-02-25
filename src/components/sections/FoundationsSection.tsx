import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../docs/ComponentPreview";

export function FoundationsSection() {
  const { t } = useTranslation("foundations");

  return (
    <>
      {/* Design Philosophy */}
      <ComponentPreview
        id="design-philosophy"
        title={t("philosophy.title")}
        description={t("philosophy.description")}
        code={`/* ReEnd Design Philosophy — 5 Pillars */

/* 1. TACTICAL — Military-grade precision */
.ef-component {
  border-radius: 0; /* Sharp corners — var(--radius) = 0px */
  font-family: var(--font-display); /* Orbitron for headings */
}

/* 2. DARK FIRST — Dark mode is the default */
:root { --background: 0 0% 4%; }
.light { --background: 0 0% 96%; }

/* 3. PRECISION — 4px grid, pixel-perfect */
/* Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px */

/* 4. FUNCTIONAL — Every element serves a purpose */
/* No decorative shadows. Glow = status indicator. */

/* 5. SIGNATURE — Endfield-exclusive identity */
/* ◆ Diamond motif, tactical panels, HUD overlays */`}
      >
        <div className="space-y-8">
          {/* Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(
              [
                "dark_first",
                "geometric",
                "utilitarian",
                "glitch",
                "contrast",
              ] as const
            ).map((key) => (
              <div
                key={key}
                className="corner-brackets border border-border bg-surface-1 p-5"
              >
                <h4 className="font-display text-xs font-bold tracking-[0.1em] text-primary mb-2">
                  {t(`philosophy.cards.${key}.title`)}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t(`philosophy.cards.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>

          {/* Principles */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-[0.08em] uppercase text-foreground mb-4">
              {t("philosophy.principles_heading")}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left">
                      {t("philosophy.table_principle")}
                    </th>
                    <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left">
                      {t("philosophy.table_description")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    t("philosophy.principles", {
                      returnObjects: true,
                    }) as Array<{ name: string; desc: string }>
                  ).map((item) => (
                    <tr
                      key={item.name}
                      className="border-b border-border hover:bg-primary/[0.03] transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-foreground">
                        {item.name}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-ef-green/30 bg-ef-green/[0.05] p-5">
              <h4 className="font-display text-xs font-bold tracking-[0.1em] text-ef-green mb-3">
                {t("philosophy.do_heading")}
              </h4>
              <ul className="space-y-2 text-sm text-card-foreground">
                {(t("philosophy.dos", { returnObjects: true }) as string[]).map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-ef-green text-[8px] mt-1.5">◆</span>
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="border border-ef-red/30 bg-ef-red/[0.05] p-5">
              <h4 className="font-display text-xs font-bold tracking-[0.1em] text-ef-red mb-3">
                {t("philosophy.dont_heading")}
              </h4>
              <ul className="space-y-2 text-sm text-card-foreground">
                {(
                  t("philosophy.donts", { returnObjects: true }) as string[]
                ).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-ef-red text-[8px] mt-1.5">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Color System */}
      <ComponentPreview
        id="color-system"
        title={t("colors.title")}
        description={t("colors.description")}
        code={`/* ── Dual Accent ──────────────────────────── */
--ef-yellow: #FFD429;       /* Community template accent */
--ef-lime:   #CBFF40;       /* Official gryphline.com accent */
--accent-active: /* whichever is active for the brand context */

/* ── Semantic ──────────────────────────────────────── */
--ef-blue: #4DA8DA;    /* Link, info */
--ef-red: #FF4757;     /* Error, danger */
--ef-green: #2ED573;   /* Success */
--ef-orange: #FFA502;  /* Warning */`}
      >
        <div className="space-y-8">
          {/* Grayscale */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("colors.primary_heading")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                {
                  nameKey: "black",
                  hex: "#0A0A0A",
                  cls: "bg-[#0A0A0A]",
                  light: true,
                },
                {
                  nameKey: "soft",
                  hex: "#111111",
                  cls: "bg-[#111111]",
                  light: true,
                },
                {
                  nameKey: "muted",
                  hex: "#1A1A1A",
                  cls: "bg-[#1A1A1A]",
                  light: true,
                },
                {
                  nameKey: "dark_gray",
                  hex: "#222222",
                  cls: "bg-[#222222]",
                  light: true,
                },
                {
                  nameKey: "gray",
                  hex: "#333333",
                  cls: "bg-[#333333]",
                  light: true,
                },
                {
                  nameKey: "gray_mid",
                  hex: "#666666",
                  cls: "bg-[#666666]",
                  light: true,
                },
                {
                  nameKey: "gray_light",
                  hex: "#999999",
                  cls: "bg-[#999999]",
                  light: false,
                },
                {
                  nameKey: "white_muted",
                  hex: "#CCCCCC",
                  cls: "bg-[#CCCCCC]",
                  light: false,
                },
                {
                  nameKey: "white_soft",
                  hex: "#E0E0E0",
                  cls: "bg-[#E0E0E0]",
                  light: false,
                },
                {
                  nameKey: "white",
                  hex: "#F0F0F0",
                  cls: "bg-[#F0F0F0]",
                  light: false,
                },
                {
                  nameKey: "pure_white",
                  hex: "#FFFFFF",
                  cls: "bg-[#FFFFFF]",
                  light: false,
                },
              ].map((c) => (
                <div key={c.nameKey} className="space-y-2">
                  <div className={`h-16 border border-border ${c.cls}`} />
                  <div>
                    <p
                      className={`text-xs font-semibold ${c.light ? "text-foreground" : "text-foreground"}`}
                    >
                      {t(`colors.names.${c.nameKey}`)}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {c.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dual Accent */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-3">
              {t("colors.dual_accent_heading")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="border border-border bg-surface-1 p-4 corner-brackets">
                <div className="h-12 clip-corner-sm bg-primary mb-3" />
                <p className="font-display text-xs font-bold uppercase text-primary">
                  --ef-yellow · #FFD429
                </p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">
                  Community / template accent · Orbitron brand color
                </p>
              </div>
              <div className="border border-border bg-surface-1 p-4 corner-brackets">
                <div className="h-12 clip-corner-sm bg-ef-lime mb-3" />
                <p className="font-display text-xs font-bold uppercase text-ef-lime">
                  --ef-lime · #CBFF40
                </p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">
                  Official gryphline.com accent · HG primary brand
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border border-border bg-surface-1 text-xs font-mono text-muted-foreground">
              <span className="text-primary text-[8px]">◆</span>
              <span>
                Use <code className="text-primary">--accent-active</code> to
                swap between accents in your theme context
              </span>
            </div>
          </div>

          {/* Accents */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("colors.accent_heading")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { nameKey: "yellow", hex: "#FFD429", cls: "bg-primary" },
                { nameKey: "lime", hex: "#CBFF40", cls: "bg-ef-lime" },
                { nameKey: "blue", hex: "#4DA8DA", cls: "bg-ef-blue" },
                { nameKey: "cyan", hex: "#00E5FF", cls: "bg-ef-cyan" },
                { nameKey: "red", hex: "#FF4757", cls: "bg-ef-red" },
                { nameKey: "green", hex: "#2ED573", cls: "bg-ef-green" },
                { nameKey: "orange", hex: "#FFA502", cls: "bg-ef-orange" },
                { nameKey: "purple", hex: "#A55EEA", cls: "bg-ef-purple" },
              ].map((c) => (
                <div key={c.nameKey} className="space-y-2">
                  <div className={`h-16 clip-corner-sm ${c.cls}`} />
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      ef-{c.nameKey}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {c.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradients */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("colors.gradients_heading")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-16 bg-gradient-to-r from-primary to-ef-orange clip-corner" />
                <p className="text-xs text-muted-foreground">
                  {t("colors.gradient_primary")}
                </p>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #FFD429 50%, transparent 100%)",
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  {t("colors.gradient_line")}
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-16 scanline-overlay bg-surface-1 border border-border" />
                <p className="text-xs text-muted-foreground">
                  {t("colors.gradient_scanline")}
                </p>
              </div>
              <div className="space-y-2">
                <div
                  className="h-16"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,212,41,0.05) 0%, transparent 60%), #141414",
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  {t("colors.gradient_card_hover")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Typography */}
      <ComponentPreview
        id="typography"
        title={t("typography.title")}
        description={t("typography.description")}
        code={`/* Font Stack */
--font-display: 'Orbitron', monospace;
--font-ui: 'Orbitron', monospace;
--font-mono: 'JetBrains Mono', monospace;
--font-body: 'Inter', sans-serif;`}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {t("typography.display_xl")}
              </p>
              <p className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold tracking-[0.05em] uppercase text-foreground">
                ENDFIELD
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {t("typography.h1")}
              </p>
              <p className="font-display text-4xl font-bold tracking-[0.03em] uppercase text-foreground">
                HEADING ONE
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {t("typography.h2")}
              </p>
              <p className="font-display text-3xl font-semibold tracking-[0.02em] uppercase text-foreground">
                HEADING TWO
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {t("typography.h3")}
              </p>
              <p className="font-display text-2xl font-semibold tracking-[0.02em] uppercase text-foreground">
                HEADING THREE
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {t("typography.h4")}
              </p>
              <p className="font-display text-xl font-semibold tracking-[0.01em] uppercase text-foreground">
                HEADING FOUR
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {t("typography.body")}
              </p>
              <p className="text-base text-card-foreground leading-relaxed">
                {t("typography.body_sample")}
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {t("typography.body_sm")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("typography.body_sm_sample")}
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {t("typography.overline")}
              </p>
              <p className="font-ui text-[11px] font-bold tracking-[0.15em] uppercase text-primary">
                {t("typography.overline_sample")}
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {t("typography.code")}
              </p>
              <p className="font-mono text-sm text-card-foreground">
                {t("typography.code_sample")}
              </p>
            </div>
            <div>
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                {t("typography.stat_number")}
              </p>
              <p className="font-display text-5xl font-bold text-primary">
                12,847
              </p>
            </div>
          </div>

          {/* Type Utility Classes*/}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("typography.utility_classes_heading")}
            </h3>
            <div className="space-y-3 border border-border bg-surface-1 p-4">
              <div className="border-b border-border pb-3">
                <p className="font-mono text-[9px] text-muted-foreground mb-1">
                  .ef-display — lh: 0.95, uppercase
                </p>
                <p className="ef-display text-2xl text-foreground">
                  ENDFIELD SYSTEM
                </p>
              </div>
              <div className="border-b border-border pb-3">
                <p className="font-mono text-[9px] text-muted-foreground mb-1">
                  .ef-heading — lh: 1.0, uppercase
                </p>
                <p className="ef-heading text-xl text-foreground">
                  CHAPTER HEADER
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-muted-foreground mb-1">
                  .ef-overline — 11px, muted, mono
                </p>
                <p className="ef-overline">SECTION LABEL · FOUNDATIONS</p>
              </div>
            </div>
          </div>

          {/* Text Colors */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("typography.text_colors_heading")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                {
                  labelKey: "text_color_heading",
                  color: "#F0F0F0",
                  token: "--text-primary",
                },
                {
                  labelKey: "text_color_body",
                  color: "#E0E0E0",
                  token: "--text-secondary",
                },
                {
                  labelKey: "text_color_caption",
                  color: "#999999",
                  token: "--text-muted",
                },
                {
                  labelKey: "text_color_accent",
                  color: "#FFD429",
                  token: "--text-accent",
                },
                {
                  labelKey: "text_color_link",
                  color: "#4DA8DA",
                  token: "--text-link",
                },
                {
                  labelKey: "text_color_error",
                  color: "#FF4757",
                  token: "--text-error",
                },
                {
                  labelKey: "text_color_success",
                  color: "#2ED573",
                  token: "--text-success",
                },
                {
                  labelKey: "text_color_placeholder",
                  color: "#666666",
                  token: "--text-placeholder",
                },
                {
                  labelKey: "text_color_disabled",
                  color: "#444444",
                  token: "--text-disabled",
                },
              ].map((tc) => (
                <div key={tc.labelKey} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 border border-border shrink-0"
                    style={{ backgroundColor: `var(${tc.token})` }}
                  />
                  <div>
                    <p className="text-xs" style={{ color: `var(${tc.token})` }}>
                      {t(`typography.${tc.labelKey}`)}
                    </p>
                    <p className="font-mono text-[9px] text-muted-foreground">
                      {tc.token}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Spacing & Grid */}
      <ComponentPreview
        id="spacing-grid"
        title={t("spacing.title")}
        description={t("spacing.description")}
        code={`--space-1: 4px;   --space-2: 8px;    --space-3: 12px;
--space-4: 16px;  --space-6: 24px;   --space-8: 32px;
--space-10: 40px; --space-12: 48px;  --space-16: 64px;
--container-max: 1280px; --grid-columns: 12;`}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            {[
              { label: "space-1", val: "4px" },
              { label: "space-2", val: "8px" },
              { label: "space-3", val: "12px" },
              { label: "space-4", val: "16px" },
              { label: "space-6", val: "24px" },
              { label: "space-8", val: "32px" },
              { label: "space-12", val: "48px" },
              { label: "space-16", val: "64px" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <span className="font-mono text-xs text-muted-foreground w-20">
                  {s.label}
                </span>
                <div
                  className="bg-primary/30 border border-primary/50 h-4"
                  style={{ width: s.val }}
                />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {s.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      {/* Background & Surface */}
      <ComponentPreview
        id="background-surface"
        title={t("surfaces.title")}
        description={t("surfaces.description")}
        code={`/* Surface Layer System — 7 levels */

/* Import in your project */
@import "reend-components/variables.css";

/* Usage — each layer adds visual depth */
.card   { background: hsl(var(--surface-1)); }  /* +1 above base */
.panel  { background: hsl(var(--surface-2)); }  /* +2 above base */
.modal  { background: hsl(var(--surface-3)); }  /* +3 above base */
.popover { background: hsl(var(--surface-4)); } /* +4 above base */

/* Or use Tailwind utilities */
<div className="bg-background" />   /* base (#0A0A0A dark) */
<div className="bg-surface-1" />    /* #111 dark */
<div className="bg-surface-2" />    /* #1A1A1A dark */
<div className="bg-surface-3" />    /* #222 dark */`}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { nameKey: "canvas", hex: "#0A0A0A", bg: "bg-background" },
              { nameKey: "surface_0", hex: "#0F0F0F", bg: "bg-surface-0" },
              { nameKey: "surface_1", hex: "#141414", bg: "bg-surface-1" },
              { nameKey: "surface_2", hex: "#1A1A1A", bg: "bg-surface-2" },
              { nameKey: "surface_3", hex: "#222222", bg: "bg-surface-3" },
              { nameKey: "hover", hex: "#1E1E1E", bg: "bg-surface-hover" },
              { nameKey: "active", hex: "#252525", bg: "bg-surface-active" },
            ].map((s) => (
              <div key={s.nameKey} className="space-y-2">
                <div className={`h-20 border border-border ${s.bg}`} />
                <p className="text-xs font-semibold text-foreground">
                  {t(`surfaces.names.${s.nameKey}`)}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {s.hex}
                </p>
              </div>
            ))}
          </div>

          {/* Decorations */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("surfaces.decorations_heading")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="corner-brackets bg-surface-1 p-6 h-32 flex items-center justify-center">
                <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                  {t("surfaces.corner_brackets")}
                </span>
              </div>
              <div className="scanline-overlay bg-surface-1 p-6 h-32 flex items-center justify-center">
                <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                  {t("surfaces.scanline_overlay")}
                </span>
              </div>
            </div>
          </div>

          {/* Background Decoration Utilities */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("surfaces.decorations_heading")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="bg-grid-pattern bg-surface-1 h-32 border border-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-muted-foreground bg-surface-2/90 px-2 py-1">
                    .bg-grid-pattern
                  </span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground">
                  60×60px grid overlay — --bg-grid-color
                </p>
              </div>
              <div className="space-y-2">
                <div className="bg-radial-glow bg-surface-1 h-32 border border-border flex items-center justify-center overflow-hidden">
                  <span className="font-mono text-[10px] text-muted-foreground bg-surface-2/90 px-2 py-1">
                    .bg-radial-glow
                  </span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground">
                  Primary radial glow at top — --bg-glow-primary
                </p>
              </div>
              <div className="space-y-2">
                <div
                  className="h-32 border border-border flex items-center justify-center overflow-hidden bg-surface-1"
                  style={{
                    backgroundImage: "var(--bg-glow-lime)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center top",
                    backgroundSize: "100% 200%",
                  }}
                >
                  <span className="font-mono text-[10px] text-muted-foreground bg-surface-2/90 px-2 py-1">
                    .bg-radial-glow-lime
                  </span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground">
                  Lime accent glow — --bg-glow-lime
                </p>
              </div>
              <div className="space-y-2">
                <div className="bg-diagonal-lines bg-surface-1 h-32 border border-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-muted-foreground bg-surface-2/90 px-2 py-1">
                    .bg-diagonal-lines
                  </span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground">
                  Diagonal stripe texture
                </p>
              </div>
              <div className="space-y-2">
                <div className="bg-grid-pattern bg-radial-glow bg-surface-1 h-32 border border-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-muted-foreground bg-surface-2/90 px-2 py-1">
                    Grid + Glow
                  </span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground">
                  Combine classes freely
                </p>
              </div>
              <div className="space-y-2">
                <div className="bg-noise-overlay bg-surface-1 h-32 border border-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-muted-foreground bg-surface-2/90 px-2 py-1">
                    .bg-noise-overlay
                  </span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground">
                  SVG fractal noise at 2.5% opacity
                </p>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Iconography */}
      <ComponentPreview
        id="iconography"
        title={t("icons.title")}
        description={t("icons.description")}
        code={`/* Iconography — Diamond (◆) system */

/* Primary diamond motif — inline in JSX */
<span className="text-primary">◆</span>           /* filled */
<span className="text-muted-foreground">◇</span>  /* outline */
<span className="text-primary">◆</span>           /* bullet */

/* Lucide React icons (peer dep) */
import { Shield, Zap, Target, Radio } from "lucide-react";

<Shield className="w-5 h-5 text-primary" />
<Zap className="w-5 h-5 text-ef-yellow" />

/* Icon sizing scale */
/* w-3 h-3 (12px) — inline/micro */
/* w-4 h-4 (16px) — button icons */
/* w-5 h-5 (20px) — card icons */
/* w-6 h-6 (24px) — feature icons */
/* w-8 h-8 (32px) — hero icons */`}
      >
        <div>
          <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
            {t("icons.sizes_heading")}
          </h3>
          <div className="flex items-end gap-6 flex-wrap">
            {[
              { size: "xs", px: 16, useKey: "xs" },
              { size: "sm", px: 20, useKey: "sm" },
              { size: "md", px: 24, useKey: "md" },
              { size: "lg", px: 32, useKey: "lg" },
              { size: "xl", px: 48, useKey: "xl" },
              { size: "2xl", px: 64, useKey: "xxl" },
            ].map((i) => (
              <div key={i.size} className="flex flex-col items-center gap-2">
                <div
                  className="border border-border bg-surface-2 flex items-center justify-center"
                  style={{ width: i.px, height: i.px }}
                >
                  <span
                    className="text-primary"
                    style={{ fontSize: i.px * 0.5 }}
                  >
                    ◆
                  </span>
                </div>
                <span className="font-display text-[10px] font-bold text-muted-foreground uppercase">
                  {i.size}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">
                  {i.px}px
                </span>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      {/* Illustration */}
      <ComponentPreview
        id="illustration"
        title={t("illustration.title")}
        description={t("illustration.description")}
        code={`/* Illustration — Topographic & Tactical Patterns */

/* Topographic contour lines (CSS only) */
.topo-pattern {
  background-image: repeating-radial-gradient(
    circle at 50% 50%,
    transparent 0px,
    transparent 20px,
    hsl(var(--foreground) / 0.06) 20px,
    hsl(var(--foreground) / 0.06) 21px
  );
}

/* Diagonal stripe decoration */
.stripe-bg {
  background-image: repeating-linear-gradient(
    45deg,
    hsl(var(--foreground) / 0.03) 0px,
    hsl(var(--foreground) / 0.03) 1px,
    transparent 1px,
    transparent 8px
  );
}

/* MatrixGrid signature component */
import { MatrixGrid } from "reend-components";
<MatrixGrid rows={8} cols={12} className="opacity-30" />`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { ratio: "16:9", labelKey: "aspect_banner", cls: "aspect-video" },
            { ratio: "4:3", labelKey: "aspect_feature", cls: "aspect-[4/3]" },
            { ratio: "3:4", labelKey: "aspect_portrait", cls: "aspect-[3/4]" },
            { ratio: "1:1", labelKey: "aspect_avatar", cls: "aspect-square" },
          ].map((r) => (
            <div key={r.ratio} className="space-y-2">
              <div
                className={`${r.cls} bg-surface-2 border border-border flex items-center justify-center`}
              >
                <span className="font-display text-sm font-bold text-muted-foreground">
                  {r.ratio}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t(`illustration.${r.labelKey}`)}
              </p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Panel Glass */}
      <ComponentPreview
        id="panel-glass"
        title={t("panel_glass.title")}
        description={t("panel_glass.description")}
        code={`/* No import needed — CSS utilities */
.panel-glass        /* dark: rgba(20,20,20,0.55)·blur(16px) | light: rgba(255,255,255,0.75) */
.panel-glass-light  /* dark: rgba(20,20,20,0.35)·blur(12px) | light: rgba(255,255,255,0.55) */
.panel-glass-dark   /* rgba(10,10,10,0.65)·blur(12px) — always dark overlay */`}
      >
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 min-h-[180px] bg-surface-0 overflow-hidden">
          {/* Background: diagonal yellow stripes */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 14px, rgba(255,212,41,0.07) 14px, rgba(255,212,41,0.07) 15px)",
            }}
          />
          {/* Soft primary glow blobs — visible content for backdrop-filter to blur */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          {/* Large decorative diamond */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/20 text-[130px] leading-none select-none pointer-events-none">
            ◆
          </div>
          {/* Horizontal accent lines */}
          <div className="absolute left-6 right-6 top-[18%] h-px bg-primary/25 pointer-events-none" />
          <div className="absolute left-6 right-6 bottom-[18%] h-px bg-primary/15 pointer-events-none" />
          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/40 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/40 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/40 pointer-events-none" />
          {/* Tactical label */}
          <div className="absolute bottom-3 right-10 font-mono text-[9px] text-primary/30 tracking-widest select-none pointer-events-none uppercase">
            glassmorphism//reend
          </div>
          {/* Glass panels — rendered above background decorations */}
          <div className="relative panel-glass p-4">
            <p className="text-xs font-display uppercase text-foreground/80 mb-1">
              panel-glass
            </p>
            <p className="text-xs text-foreground/60">dark:55% | light:75%</p>
          </div>
          <div className="relative panel-glass-light p-4">
            <p className="text-xs font-display uppercase text-foreground/80 mb-1">
              panel-glass-light
            </p>
            <p className="text-xs text-foreground/60">dark:35% | light:55%</p>
          </div>
          <div className="relative panel-glass-dark p-4">
            <p className="text-xs font-display uppercase mb-1">
              panel-glass-dark
            </p>
            <p className="text-xs opacity-70">Always dark — 65% black</p>
          </div>
        </div>
      </ComponentPreview>

      {/* Glow Shadows */}
      <ComponentPreview
        id="glow-shadows"
        title={t("glow_shadows.title")}
        description={t("glow_shadows.description")}
        code={`/* No Y-offset — pure radial glow (website resmi style) */
--shadow-glow-sm:  0 0  6px rgba(0,0,0,0.25);
--shadow-glow-md:  0 0 12px rgba(0,0,0,0.35);
--shadow-glow-lg:  0 0 24px rgba(0,0,0,0.50);
--shadow-accent:   0 0 16px hsl(var(--primary) / 0.35);

/* Tailwind usage */
shadow-glow-sm | shadow-glow-md | shadow-glow-lg | shadow-accent`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
          {[
            { cls: "shadow-glow-sm", label: "shadow-glow-sm", desc: "0 0 6px" },
            {
              cls: "shadow-glow-md",
              label: "shadow-glow-md",
              desc: "0 0 12px",
            },
            {
              cls: "shadow-glow-lg",
              label: "shadow-glow-lg",
              desc: "0 0 24px",
            },
            {
              cls: "shadow-accent",
              label: "shadow-accent",
              desc: "primary tint",
            },
          ].map((s) => (
            <div key={s.cls} className="space-y-3 flex flex-col items-center">
              <div
                className={`w-16 h-16 bg-surface-2 border border-border flex items-center justify-center ${s.cls}`}
              >
                <span className="text-primary text-lg">◆</span>
              </div>
              <div className="text-center">
                <p className="font-mono text-[9px] text-primary">.{s.label}</p>
                <p className="font-mono text-[9px] text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Search Highlight */}
      <ComponentPreview
        id="search-highlight"
        title={t("search_highlight.title")}
        description={t("search_highlight.description")}
        code={`/* Search Highlight & Spoiler Patterns */

/* Search highlight — uses <mark> with Tailwind */
<p>
  Results for{" "}
  <mark className="bg-primary/20 text-primary px-0.5">
    "operator"
  </mark>
  : 24 matches found.
</p>

/* CSS custom property approach */
::highlight(search-results) {
  background-color: hsl(var(--primary) / 0.2);
  color: hsl(var(--primary));
}

/* Spoiler block — import from library */
import { SpoilerBlock, SpoilerInline } from "reend-components";

<SpoilerBlock label="Chapter 9 Boss Identity">
  <p>The final operator is Endministrator-0.</p>
</SpoilerBlock>

<p>The answer is <SpoilerInline>42</SpoilerInline>.</p>`}
      >
        <div className="space-y-6 p-4">
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
              mark element
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              Search results for <mark>Arknights Endfield</mark> found 42
              matches containing <mark>Endfield</mark> design tokens.
            </p>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
              .spoiler — hover to reveal
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              The secret password is{" "}
              <span className="spoiler px-1">TACTICAL-OVERRIDE-7734</span>.
            </p>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}
