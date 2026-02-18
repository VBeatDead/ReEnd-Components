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
        code={`/* Primary Accent */
--ef-yellow: #FFD429;      /* CTA, brand */
--ef-yellow-dark: #B8960F;  /* Hover/pressed */
--ef-yellow-glow: rgba(255,212,41,0.15); /* Glow */

/* Semantic */
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

          {/* Accents */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("colors.accent_heading")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { nameKey: "yellow", hex: "#FFD429", cls: "bg-primary" },
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
                <div
                  className="h-16"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
                  }}
                />
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
                    className="w-3 h-3 border border-border"
                    style={{ backgroundColor: tc.color }}
                  />
                  <div>
                    <p className="text-xs" style={{ color: tc.color }}>
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
        </div>
      </ComponentPreview>

      {/* Iconography */}
      <ComponentPreview
        id="iconography"
        title={t("icons.title")}
        description={t("icons.description")}
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
    </>
  );
}
