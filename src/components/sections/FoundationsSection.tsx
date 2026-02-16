import { ComponentPreview } from "../docs/ComponentPreview";

export const FoundationsSection = () => {
  return (
    <>
      {/* 1. Design Philosophy */}
      <ComponentPreview
        id="design-philosophy"
        title="1. Design Philosophy & Principles"
        description="Arknights: Endfield mengusung estetika Sci-Fi Industrial Futurism — perpaduan dunia teknologi tinggi yang dingin dengan atmosfer frontier planet Talos-II."
      >
        <div className="space-y-8">
          {/* Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "DARK-FIRST",
                desc: "Seluruh interface berbasis gelap, nuansa terminal operasi",
              },
              {
                title: "GEOMETRIC PRECISION",
                desc: "Garis tajam, sudut tegas (clip-path bukan border-radius)",
              },
              {
                title: "UTILITARIAN ELEGANCE",
                desc: "Fungsional dan teknis namun elegan — dashboard kontrol misi",
              },
              {
                title: "GLITCH & TECH",
                desc: "Efek glitch, scanline, noise sebagai dekorasi sci-fi",
              },
              {
                title: "HIGH CONTRAST",
                desc: "Teks terang di permukaan gelap, aksen warna untuk hierarki",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="corner-brackets border border-border bg-surface-1 p-5"
              >
                <h4 className="font-display text-xs font-bold tracking-[0.1em] text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Principles */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-[0.08em] uppercase text-foreground mb-4">
              ◆ PRINSIP DESAIN
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left">
                      PRINSIP
                    </th>
                    <th className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground py-3 px-4 text-left">
                      DESKRIPSI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Function-First", "Setiap elemen visual memiliki tujuan"],
                    [
                      "Data Density",
                      "Informasi padat namun terorganisir — HUD style",
                    ],
                    [
                      "Progressive Disclosure",
                      "Informasi bertahap, tidak sekaligus",
                    ],
                    [
                      "Immersive Consistency",
                      "Semua elemen terasa di 'dunia' yang sama",
                    ],
                    [
                      "Tactile Feedback",
                      "Setiap interaksi ada respons visual jelas",
                    ],
                    ["Respectful Restraint", "Animasi dan efek secukupnya"],
                  ].map(([p, d]) => (
                    <tr
                      key={p}
                      className="border-b border-border hover:bg-primary/[0.03] transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-foreground">
                        {p}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{d}</td>
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
                ✅ DO
              </h4>
              <ul className="space-y-2 text-sm text-card-foreground">
                {[
                  "clip-path untuk sudut terpotong",
                  "Warna gelap sebagai base",
                  "Uppercase untuk heading & label",
                  "Diamond ◆ sebagai bullet/marker",
                  "Monospace untuk data/angka",
                  "Border tipis semi-transparent",
                  "Glow effect subtle (opacity < 0.3)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-ef-green text-[8px] mt-1.5">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-ef-red/30 bg-ef-red/[0.05] p-5">
              <h4 className="font-display text-xs font-bold tracking-[0.1em] text-ef-red mb-3">
                ❌ DON'T
              </h4>
              <ul className="space-y-2 text-sm text-card-foreground">
                {[
                  "border-radius besar (rounded)",
                  "Light-mode sebagai default",
                  "Uppercase untuk body text",
                  "Circle bullet biasa",
                  "Monospace untuk body",
                  "Border tebal solid color",
                  "Glow berlebihan (neon)",
                ].map((item) => (
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

      {/* 2. Color System */}
      <ComponentPreview
        id="color-system"
        title="2. Color System"
        description="Primary palette berbasis grayscale dengan aksen kuning sebagai brand color utama."
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
              PRIMARY PALETTE (GRAYSCALE)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                {
                  name: "Black",
                  hex: "#0A0A0A",
                  cls: "bg-[#0A0A0A]",
                  light: true,
                },
                {
                  name: "Soft",
                  hex: "#111111",
                  cls: "bg-[#111111]",
                  light: true,
                },
                {
                  name: "Muted",
                  hex: "#1A1A1A",
                  cls: "bg-[#1A1A1A]",
                  light: true,
                },
                {
                  name: "Dark Gray",
                  hex: "#222222",
                  cls: "bg-[#222222]",
                  light: true,
                },
                {
                  name: "Gray",
                  hex: "#333333",
                  cls: "bg-[#333333]",
                  light: true,
                },
                {
                  name: "Gray Mid",
                  hex: "#666666",
                  cls: "bg-[#666666]",
                  light: true,
                },
                {
                  name: "Gray Light",
                  hex: "#999999",
                  cls: "bg-[#999999]",
                  light: false,
                },
                {
                  name: "White Muted",
                  hex: "#CCCCCC",
                  cls: "bg-[#CCCCCC]",
                  light: false,
                },
                {
                  name: "White Soft",
                  hex: "#E0E0E0",
                  cls: "bg-[#E0E0E0]",
                  light: false,
                },
                {
                  name: "White",
                  hex: "#F0F0F0",
                  cls: "bg-[#F0F0F0]",
                  light: false,
                },
                {
                  name: "Pure White",
                  hex: "#FFFFFF",
                  cls: "bg-[#FFFFFF]",
                  light: false,
                },
              ].map((c) => (
                <div key={c.name} className="space-y-2">
                  <div className={`h-16 border border-border ${c.cls}`} />
                  <div>
                    <p
                      className={`text-xs font-semibold ${c.light ? "text-foreground" : "text-foreground"}`}
                    >
                      {c.name}
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
              ACCENT COLORS
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { name: "Yellow", hex: "#FFD429", cls: "bg-primary" },
                { name: "Blue", hex: "#4DA8DA", cls: "bg-ef-blue" },
                { name: "Cyan", hex: "#00E5FF", cls: "bg-ef-cyan" },
                { name: "Red", hex: "#FF4757", cls: "bg-ef-red" },
                { name: "Green", hex: "#2ED573", cls: "bg-ef-green" },
                { name: "Orange", hex: "#FFA502", cls: "bg-ef-orange" },
                { name: "Purple", hex: "#A55EEA", cls: "bg-ef-purple" },
              ].map((c) => (
                <div key={c.name} className="space-y-2">
                  <div className={`h-16 clip-corner-sm ${c.cls}`} />
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {c.name}
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
              GRADIENTS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-16 bg-gradient-to-r from-primary to-ef-orange clip-corner" />
                <p className="text-xs text-muted-foreground">
                  Primary Gradient: #FFD429 → #FFA502
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
                  Line Gradient: transparent → #FFD429 → transparent
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
                  Scanline Gradient
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
                  Card Hover Gradient
                </p>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 3. Typography */}
      <ComponentPreview
        id="typography"
        title="3. Typography"
        description="Font stack: Orbitron (display/UI), JetBrains Mono (code), Inter (body)."
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
                DISPLAY XL — 72px / 700 / UPPERCASE
              </p>
              <p className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold tracking-[0.05em] uppercase text-foreground">
                ENDFIELD
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                H1 — 40px / 700 / UPPERCASE
              </p>
              <p className="font-display text-4xl font-bold tracking-[0.03em] uppercase text-foreground">
                HEADING ONE
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                H2 — 32px / 600 / UPPERCASE
              </p>
              <p className="font-display text-3xl font-semibold tracking-[0.02em] uppercase text-foreground">
                HEADING TWO
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                H3 — 24px / 600 / UPPERCASE
              </p>
              <p className="font-display text-2xl font-semibold tracking-[0.02em] uppercase text-foreground">
                HEADING THREE
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                H4 — 20px / 600 / UPPERCASE
              </p>
              <p className="font-display text-xl font-semibold tracking-[0.01em] uppercase text-foreground">
                HEADING FOUR
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                BODY — 16px / 400
              </p>
              <p className="text-base text-card-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                BODY SM — 14px / 400
              </p>
              <p className="text-sm text-muted-foreground">
                Secondary body text for descriptions and metadata.
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                OVERLINE — 11px / 700 / 0.15em / UPPERCASE
              </p>
              <p className="font-ui text-[11px] font-bold tracking-[0.15em] uppercase text-primary">
                OVERLINE TEXT
              </p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                CODE — JetBrains Mono 14px
              </p>
              <p className="font-mono text-sm text-card-foreground">
                const endfield = "Talos-II";
              </p>
            </div>
            <div>
              <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                STAT NUMBER — Orbitron 48px / 700
              </p>
              <p className="font-display text-5xl font-bold text-primary">
                12,847
              </p>
            </div>
          </div>

          {/* Text Colors */}
          <div>
            <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              TEXT COLOR ASSIGNMENT
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: "Heading", color: "#F0F0F0", token: "--text-primary" },
                { label: "Body", color: "#E0E0E0", token: "--text-secondary" },
                { label: "Caption", color: "#999999", token: "--text-muted" },
                { label: "Accent", color: "#FFD429", token: "--text-accent" },
                { label: "Link", color: "#4DA8DA", token: "--text-link" },
                { label: "Error", color: "#FF4757", token: "--text-error" },
                { label: "Success", color: "#2ED573", token: "--text-success" },
                {
                  label: "Placeholder",
                  color: "#666666",
                  token: "--text-placeholder",
                },
                {
                  label: "Disabled",
                  color: "#444444",
                  token: "--text-disabled",
                },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 border border-border"
                    style={{ backgroundColor: t.color }}
                  />
                  <div>
                    <p className="text-xs" style={{ color: t.color }}>
                      {t.label}
                    </p>
                    <p className="font-mono text-[9px] text-muted-foreground">
                      {t.token}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 4. Spacing & Grid */}
      <ComponentPreview
        id="spacing-grid"
        title="4. Spacing & Grid"
        description="Base 4px spacing scale. Container max 1280px, 12-column grid."
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

      {/* 5. Background & Surface */}
      <ComponentPreview
        id="background-surface"
        title="5. Background & Surface"
        description="Surface levels dari Canvas hingga Active, dengan corner brackets sebagai Endfield signature element."
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { name: "Canvas", hex: "#0A0A0A", bg: "bg-background" },
              { name: "Surface 0", hex: "#0F0F0F", bg: "bg-surface-0" },
              { name: "Surface 1", hex: "#141414", bg: "bg-surface-1" },
              { name: "Surface 2", hex: "#1A1A1A", bg: "bg-surface-2" },
              { name: "Surface 3", hex: "#222222", bg: "bg-surface-3" },
              { name: "Hover", hex: "#1E1E1E", bg: "bg-surface-hover" },
              { name: "Active", hex: "#252525", bg: "bg-surface-active" },
            ].map((s) => (
              <div key={s.name} className="space-y-2">
                <div className={`h-20 border border-border ${s.bg}`} />
                <p className="text-xs font-semibold text-foreground">
                  {s.name}
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
              BACKGROUND DECORATIONS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="corner-brackets bg-surface-1 p-6 h-32 flex items-center justify-center">
                <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                  CORNER BRACKETS
                </span>
              </div>
              <div className="scanline-overlay bg-surface-1 p-6 h-32 flex items-center justify-center">
                <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                  SCANLINE OVERLAY
                </span>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 6. Iconography */}
      <ComponentPreview
        id="iconography"
        title="6. Iconography"
        description="Outlined blueprint aesthetic. Stroke 1.5px at 24px, currentColor."
      >
        <div>
          <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
            ICON SIZES
          </h3>
          <div className="flex items-end gap-6 flex-wrap">
            {[
              { size: "xs", px: 16, use: "Inline" },
              { size: "sm", px: 20, use: "Button" },
              { size: "md", px: 24, use: "Nav" },
              { size: "lg", px: 32, use: "Feature" },
              { size: "xl", px: 48, use: "Empty state" },
              { size: "2xl", px: 64, use: "Hero" },
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

      {/* 7. Illustration */}
      <ComponentPreview
        id="illustration"
        title="7. Illustration & Imagery Style"
        description="Photography desaturated, cool-toned. Line art thin geometric, wireframe, blueprint style."
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { ratio: "16:9", label: "Banner", cls: "aspect-video" },
            { ratio: "4:3", label: "Feature", cls: "aspect-[4/3]" },
            { ratio: "3:4", label: "Portrait", cls: "aspect-[3/4]" },
            { ratio: "1:1", label: "Avatar", cls: "aspect-square" },
          ].map((r) => (
            <div key={r.ratio} className="space-y-2">
              <div
                className={`${r.cls} bg-surface-2 border border-border flex items-center justify-center`}
              >
                <span className="font-display text-sm font-bold text-muted-foreground">
                  {r.ratio}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{r.label}</p>
            </div>
          ))}
        </div>
      </ComponentPreview>
    </>
  );
};
