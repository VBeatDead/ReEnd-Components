import { useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../docs/ComponentPreview";
import { Play } from "lucide-react";
import SignatureContentSection from "./signature/SignatureContentSection";
import { Separator } from "../ui/separator";

const CURSOR_STYLES = [
  { cursor: "default", label: "default" },
  { cursor: "pointer", label: "pointer" },
  { cursor: "crosshair", label: "crosshair" },
  { cursor: "cell", label: "cell" },
  { cursor: "move", label: "move" },
  { cursor: "text", label: "text" },
  { cursor: "not-allowed", label: "not-allowed" },
  { cursor: "grab", label: "grab" },
  { cursor: "zoom-in", label: "zoom-in" },
] as const;

export function ContentMediaSection() {
  const { t } = useTranslation("content");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pct = el.scrollHeight - el.clientHeight > 0
      ? (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      : 0;
    setScrollPct(Math.round(pct));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <ComponentPreview
        id="hero-section"
        title={t("hero.title")}
        showViewport
        description={t("hero.description")}
        props={[
          {
            name: "overline",
            type: "string",
            required: false,
            description: t("_props.hero-section.overline"),
          },
          {
            name: "title",
            type: "string",
            required: true,
            description: t("_props.hero-section.title"),
          },
          {
            name: "subtitle",
            type: "string",
            required: false,
            description: t("_props.hero-section.subtitle"),
          },
          {
            name: "primaryAction",
            type: "{ label: string; onClick: () => void }",
            required: false,
            description: t("_props.hero-section.primaryAction"),
          },
          {
            name: "secondaryAction",
            type: "{ label: string; onClick: () => void }",
            required: false,
            description: t("_props.hero-section.secondaryAction"),
          },
          {
            name: "terminal",
            type: "string",
            required: false,
            description: t("_props.hero-section.terminal"),
          },
        ]}
        code={`/* Hero Section Pattern */
<section className="relative min-h-screen flex items-center bg-surface-1 overflow-hidden">
  {/* Background decorations */}
  <div className="absolute inset-0 scanline-overlay pointer-events-none" />
  <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-3xl" />

  <div className="container mx-auto px-6 relative z-10">
    <p className="font-display text-xs tracking-[0.3em] text-primary mb-4 uppercase">
      ◆ ENDFIELD SYSTEM v2.4.1
    </p>
    <h1 className="font-display text-6xl font-black uppercase tracking-tight text-foreground mb-6">
      BUILD FASTER.<br />DEPLOY FURTHER.
    </h1>
    <p className="text-lg text-muted-foreground max-w-xl mb-8">
      Tactical React components for mission-critical interfaces.
    </p>
    <button className="bg-primary text-primary-foreground px-8 py-3 font-display font-bold uppercase tracking-[0.1em]">
      INITIALIZE SYSTEM ◆
    </button>
  </div>
</section>`}
      >
        <div className="relative scanline-overlay bg-surface-0 -mx-6 sm:-mx-8 -my-6 sm:-my-8 p-0">
          <div
            className="min-h-[50vh] flex flex-col items-center justify-center text-center px-8 py-16"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,212,41,0.08), transparent 70%)",
            }}
          >
            <span className="font-ui text-[11px] tracking-[0.15em] uppercase text-primary border border-primary/40 bg-primary/[0.08] px-4 py-1 mb-6">
              {t("hero.version_badge")}
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-[0.04em] uppercase text-foreground mb-4 text-glow-yellow">
              {t("hero.heading")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 w-full max-w-md justify-center">
              <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 sm:px-8 py-3.5 flex-1 min-w-[140px] hover:brightness-110 hover:shadow-[0_0_20px_hsl(47_100%_56%/0.3)] transition-all">
                {t("hero.get_started")}
              </button>
              <button className="clip-corner border border-foreground/25 text-card-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 sm:px-8 py-3.5 flex-1 min-w-[140px] hover:border-primary hover:text-primary transition-all bg-transparent">
                {t("hero.view_docs")}
              </button>
            </div>
            {/* Terminal box */}
            <div className="mt-10 bg-surface-1 border border-border p-4 text-left max-w-md w-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-ui text-[10px] text-muted-foreground uppercase tracking-widest">
                  {t("hero.terminal_label")}
                </span>
              </div>
              <div className="font-mono text-sm text-ef-green">
                <span className="text-muted-foreground">$</span> npm install
                endfield-ui
                <span className="inline-block w-2 h-4 bg-primary ml-1 animate-cursor-blink" />
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Code Block */}
      <ComponentPreview
        id="code-block-terminal"
        title={t("code_block.title")}
        description={t("code_block.description")}
        code={`/* Syntax Highlighting — Endfield Design Tokens */
Keyword:   text-ef-blue       String:   text-ef-green
Function:  text-primary       Operator: text-ef-red
Type/JSX:  text-ef-blue-light Default:  text-foreground
Comment:   text-muted-foreground`}
        props={[
          {
            name: "code",
            type: "string",
            required: true,
            description: t("_props.code-block-terminal.code"),
          },
          {
            name: "language",
            type: "string",
            default: '"tsx"',
            required: false,
            description: t("_props.code-block-terminal.language"),
          },
          {
            name: "showLineNumbers",
            type: "boolean",
            default: "false",
            required: false,
            description: t("_props.code-block-terminal.showLineNumbers"),
          },
          {
            name: "copyable",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.code-block-terminal.copyable"),
          },
          {
            name: "variant",
            type: '"code" | "terminal"',
            default: '"code"',
            required: false,
            description: t("_props.code-block-terminal.variant"),
          },
        ]}
      >
        <div className="space-y-4">
          <div className="border border-border bg-surface-0 overflow-hidden group">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <span className="font-ui text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
                TSX
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
              <code>
                <span className="text-ef-blue">import</span>{" "}
                <span className="text-foreground">{"{ Button }"}</span>{" "}
                <span className="text-ef-blue">from</span>{" "}
                <span className="text-ef-green">'endfield-ui'</span>;<br />
                <br />
                <span className="text-ef-blue">const</span>{" "}
                <span className="text-primary">App</span>{" "}
                <span className="text-ef-red">=</span> (){" "}
                <span className="text-ef-blue">=&gt;</span> {"("}
                <br />
                {"  "}
                <span className="text-foreground">&lt;</span>
                <span className="text-ef-blue-light">Button</span>{" "}
                <span className="text-primary">variant</span>
                <span className="text-ef-red">=</span>
                <span className="text-ef-green">"primary"</span>
                <span className="text-foreground">&gt;</span>
                <br />
                {"    "}DEPLOY
                <br />
                {"  "}
                <span className="text-foreground">&lt;/</span>
                <span className="text-ef-blue-light">Button</span>
                <span className="text-foreground">&gt;</span>
                <br />
                {")"}
              </code>
            </pre>
          </div>
          {/* Terminal */}
          <div className="border border-border bg-surface-1">
            <div className="px-4 py-2 border-b border-border">
              <span className="font-ui text-[10px] text-muted-foreground uppercase tracking-widest">
                {t("code_block.terminal_label")}
              </span>
            </div>
            <div className="p-4 font-mono text-sm">
              <p className="text-muted-foreground">
                $ <span className="text-ef-green">endfield</span> init
                my-project
              </p>
              <p className="text-muted-foreground">
                {t("code_block.creating_project")}
              </p>
              <p className="text-ef-green">{t("code_block.project_created")}</p>
              <p className="text-muted-foreground">
                ${" "}
                <span className="inline-block w-2 h-4 bg-primary animate-cursor-blink" />
              </p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Blog Layout */}
      <ComponentPreview
        id="blog-layout"
        title={t("blog.title")}
        showViewport
        description={t("blog.description")}
        props={[
          {
            name: "title",
            type: "string",
            required: true,
            description: t("_props.blog-layout.title"),
          },
          {
            name: "category",
            type: "string",
            required: false,
            description: t("_props.blog-layout.category"),
          },
          {
            name: "date",
            type: "string",
            required: false,
            description: t("_props.blog-layout.date"),
          },
          {
            name: "readTime",
            type: "string",
            required: false,
            description: t("_props.blog-layout.readTime"),
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: t("_props.blog-layout.children"),
          },
        ]}
        code={`/* Blog/Article Layout Pattern */
<article className="max-w-3xl mx-auto">
  {/* Meta */}
  <div className="flex items-center gap-3 mb-6 text-muted-foreground text-xs font-display tracking-[0.1em] uppercase">
    <span>15.02.2026</span>
    <span className="text-primary">◆</span>
    <span>FIELD REPORT</span>
    <span className="text-primary">◆</span>
    <span>8 MIN READ</span>
  </div>

  <h1 className="font-display text-4xl font-black uppercase tracking-tight mb-6">
    SECTOR 7 ANOMALY RESOLVED
  </h1>

  <p className="text-muted-foreground mb-4 leading-relaxed">
    After 72 hours of continuous monitoring, EF-SYS has confirmed...
  </p>

  {/* Section divider */}
  <div className="my-8 border-t border-border" />

  <p className="leading-relaxed">Article body continues here...</p>
</article>`}
      >
        <div className="max-w-[680px] mx-auto">
          <div className="mb-6">
            <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-primary">
              {t("blog.category")}
            </span>
            <span className="text-muted-foreground mx-2">·</span>
            <span className="font-mono text-[11px] text-muted-foreground">
              15.02.2026
            </span>
            <span className="text-muted-foreground mx-2">·</span>
            <span className="text-xs text-muted-foreground">
              {t("blog.read_time")}
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-[0.02em] text-foreground mb-6">
            {t("blog.blog_heading")}
          </h2>
          <p className="text-sm text-card-foreground leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <blockquote className="border-l-[3px] border-primary bg-primary/[0.03] px-5 py-4 mb-6 text-sm text-card-foreground italic">
            {t("blog.blockquote")}
          </blockquote>
          <p className="text-sm text-card-foreground leading-relaxed mb-6">
            Ut enim ad minim veniam, quis nostrud exercitation. Read more about{" "}
            <a className="text-ef-blue hover:text-ef-blue-light underline">
              {t("blog.advanced_patterns")}
            </a>
            .
          </p>
          <div className="gradient-line-h opacity-50" />
        </div>
      </ComponentPreview>

      {/* Image & Media */}
      <ComponentPreview
        id="image-media"
        title={t("image.title")}
        description={t("image.description")}
        props={[
          {
            name: "src",
            type: "string",
            required: true,
            description: t("_props.image-media.src"),
          },
          {
            name: "alt",
            type: "string",
            required: true,
            description: t("_props.image-media.alt"),
          },
          {
            name: "caption",
            type: "string",
            required: false,
            description: t("_props.image-media.caption"),
          },
          {
            name: "aspectRatio",
            type: '"16:9" | "4:3" | "1:1"',
            default: '"16:9"',
            required: false,
            description: t("_props.image-media.aspectRatio"),
          },
          {
            name: "hover",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.image-media.hover"),
          },
        ]}
        code={`/* Image / Media Pattern */

// Responsive image with caption
<figure className="space-y-2">
  <div className="relative aspect-video bg-surface-2 border border-border overflow-hidden">
    <img
      src="/mission-briefing.jpg"
      alt="Sector 7 aerial view"
      className="w-full h-full object-cover"
    />
    {/* Corner bracket overlay */}
    <div className="absolute inset-0 clip-corner pointer-events-none border border-primary/20" />
  </div>
  <figcaption className="font-display text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
    FIG. 01 — SECTOR 7 AERIAL RECONNAISSANCE
  </figcaption>
</figure>

// Aspect ratio utilities: aspect-video (16:9) | aspect-square | aspect-[4/3]`}
      >
        <div className="max-w-md">
          <div className="overflow-hidden bg-surface-1 border border-border group">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-ef-blue/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <span className="font-display text-lg text-muted-foreground">
                {t("image.image_16_9")}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            {t("image.caption_text")}
          </p>
        </div>
      </ComponentPreview>

      {/* Video Player */}
      <ComponentPreview
        id="video-player"
        title={t("video.title")}
        description={t("video.description")}
        props={[
          {
            name: "src",
            type: "string",
            required: true,
            description: t("_props.video-player.src"),
          },
          {
            name: "poster",
            type: "string",
            required: false,
            description: t("_props.video-player.poster"),
          },
          {
            name: "autoplay",
            type: "boolean",
            default: "false",
            required: false,
            description: t("_props.video-player.autoplay"),
          },
          {
            name: "controls",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.video-player.controls"),
          },
        ]}
        code={`/* Video Player Pattern */
<div className="relative aspect-video bg-surface-1 border border-border overflow-hidden group">
  {/* Thumbnail */}
  <img src="/video-thumb.jpg" alt="" className="w-full h-full object-cover" />

  {/* Play button */}
  <button
    aria-label="Play video"
    className="absolute inset-0 flex items-center justify-center"
    onClick={() => setPlaying(true)}
  >
    <div className="w-16 h-16 bg-primary/90 flex items-center justify-center clip-corner group-hover:bg-primary transition-colors">
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground fill-current ml-1">
        <polygon points="5,3 19,12 5,21" />
      </svg>
    </div>
  </button>

  {/* Scanline overlay */}
  <div className="absolute inset-0 scanline-overlay pointer-events-none" />
</div>`}
      >
        <div className="max-w-md">
          <div
            className="aspect-video bg-surface-2 border border-border relative flex items-center justify-center"
            style={{ background: "rgba(10,10,10,0.5)" }}
          >
            <button className="w-16 h-16 bg-primary clip-corner flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_hsl(47_100%_56%/0.3)] transition-all">
              <Play className="w-6 h-6 text-primary-foreground ml-1" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-ef-gray">
              <div className="h-full bg-primary w-1/3" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Dividers */}
      <ComponentPreview
        id="dividers"
        title={t("dividers.title")}
        description={t("dividers.description")}
        props={[
          {
            name: "variant",
            type: '"standard" | "glow" | "labeled" | "diamond"',
            default: '"standard"',
            required: false,
            description: t("_props.dividers.variant"),
          },
          {
            name: "label",
            type: "string",
            required: false,
            description: t("_props.dividers.label"),
          },
        ]}
        code={`import { Separator } from "reend-components";

// Horizontal variants
<Separator variant="default" />
<Separator variant="subtle" />
<Separator variant="strong" />
<Separator variant="glow" />
<Separator variant="accent" />

// Vertical separator
<div className="flex items-center gap-4 h-8">
  <span>LEFT</span>
  <Separator orientation="vertical" variant="default" />
  <span>RIGHT</span>
</div>

// Variants: "default" | "subtle" | "strong" | "glow" | "accent"
// Orientation: "horizontal" | "vertical"`}
      >
        <div className="space-y-8">
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {t("dividers.standard")}
            </p>
            <Separator />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {t("dividers.tech_glow")}
            </p>
            <Separator variant="glow" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {t("dividers.with_label")}
            </p>
            <div className="flex items-center gap-4">
              <Separator className="flex-1 w-auto" />
              <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                {t("dividers.section_label")}
              </span>
              <Separator className="flex-1 w-auto" />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {t("dividers.diamond_bullet")}
            </p>
            <div className="flex items-center justify-center">
              <span className="text-primary text-xs">◆</span>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Scroll & Cursor */}
      <ComponentPreview
        id="scroll-cursor"
        title={t("scroll.title")}
        description={t("scroll.description")}
        code={`// ScrollProgress — fixed top bar, tracks window.scrollY
import { ScrollProgress } from 'reend-components';

<ScrollProgress />              // default: 2px height, primary color
<ScrollProgress height={3} color="hsl(var(--ef-blue))" />

// BackToTop — button that appears after 300px scroll
import { BackToTop } from 'reend-components';
<BackToTop threshold={300} />`}
        props={[
          {
            name: "color",
            type: "string",
            default: "hsl(var(--primary))",
            required: false,
            description: t("_props.scroll-cursor.showProgress"),
          },
          {
            name: "height",
            type: "number",
            default: "2",
            required: false,
            description: t("_props.scroll-cursor.customCursor"),
          },
        ]}
      >
        <div className="space-y-6">
          {/* Live scroll progress demo */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {t("scroll.scroll_progress")}
            </p>
            <div className="border border-border overflow-hidden">
              {/* Sticky progress bar inside container */}
              <div className="h-0.5 bg-border sticky top-0 z-10">
                <div
                  className="h-full bg-primary transition-[width] duration-100"
                  style={{ width: `${scrollPct}%` }}
                  role="progressbar"
                  aria-valuenow={scrollPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="h-32 overflow-y-auto bg-surface-1 p-4 text-sm text-muted-foreground"
                style={{ scrollbarWidth: "thin" }}
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className="py-0.5">
                    {t("scroll.scroll_line_text", { number: i + 1 })}
                  </p>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-border flex items-center gap-3 bg-surface-2">
                <div className="h-0.5 flex-1 bg-border">
                  <div
                    className="h-full bg-primary/50 transition-[width] duration-100"
                    style={{ width: `${scrollPct}%` }}
                  />
                </div>
                <span className="font-mono text-[11px] text-primary shrink-0 min-w-[3ch] text-right">
                  {scrollPct}%
                </span>
              </div>
            </div>
          </div>

          {/* Cursor styles */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {t("scroll.cursor_styles")}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {CURSOR_STYLES.map(({ cursor, label }) => (
                <div
                  key={cursor}
                  className="border border-border bg-surface-1 px-2 py-2.5 text-center hover:border-primary/40 hover:bg-surface-2 transition-colors select-none"
                  style={{ cursor }}
                >
                  <p className="font-mono text-[10px] text-primary leading-none">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ScrollProgress component display */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {t("scroll.scroll_progress_component")}
            </p>
            <div className="bg-surface-0 border border-border p-3 flex items-stretch gap-3">
              {/* Visual representation */}
              <div className="w-24 border border-border bg-surface-1 relative overflow-hidden shrink-0">
                <div className="h-0.5 bg-primary absolute top-0 left-0" style={{ width: "60%" }} />
                <div className="p-2 pt-3">
                  <div className="space-y-1">
                    {[80, 60, 90, 50].map((w, i) => (
                      <div key={i} className="h-1 bg-border" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                <span className="text-ef-blue">import</span>{" "}
                <span className="text-foreground">{"{ ScrollProgress }"}</span>{" "}
                <span className="text-ef-blue">from</span>{" "}
                <span className="text-ef-green">'reend-components'</span>
                <br /><br />
                <span className="text-muted-foreground/60">{"// Fixed top bar, 2px height"}</span>
                <br />
                <span className="text-foreground">{"<ScrollProgress />"}</span>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>
      <SignatureContentSection />
    </>
  );
}
