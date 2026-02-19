import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../docs/ComponentPreview";
import { ArrowRight, Play } from "lucide-react";
import SignatureContentSection from "./signature/SignatureContentSection";
import { Separator } from "../ui/separator";

export function ContentMediaSection() {
  const { t } = useTranslation("content");
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
        code={`/* Syntax Highlighting Colors */
Keyword:   #FF79C6   String:    #F1FA8C
Number:    #BD93F9   Comment:   #6272A4
Function:  #50FA7B   Operator:  #FF5555
Variable:  #F8F8F2   Type:      #8BE9FD`}
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
                <span style={{ color: "#FF79C6" }}>import</span>{" "}
                <span style={{ color: "#F8F8F2" }}>{"{ Button }"}</span>{" "}
                <span style={{ color: "#FF79C6" }}>from</span>{" "}
                <span style={{ color: "#F1FA8C" }}>'endfield-ui'</span>;<br />
                <br />
                <span style={{ color: "#FF79C6" }}>const</span>{" "}
                <span style={{ color: "#50FA7B" }}>App</span>{" "}
                <span style={{ color: "#FF5555" }}>=</span> (){" "}
                <span style={{ color: "#FF79C6" }}>=&gt;</span> {"("}
                <br />
                {"  "}
                <span style={{ color: "#F8F8F2" }}>&lt;</span>
                <span style={{ color: "#8BE9FD" }}>Button</span>{" "}
                <span style={{ color: "#50FA7B" }}>variant</span>
                <span style={{ color: "#FF5555" }}>=</span>
                <span style={{ color: "#F1FA8C" }}>"primary"</span>
                <span style={{ color: "#F8F8F2" }}>&gt;</span>
                <br />
                {"    "}DEPLOY
                <br />
                {"  "}
                <span style={{ color: "#F8F8F2" }}>&lt;/</span>
                <span style={{ color: "#8BE9FD" }}>Button</span>
                <span style={{ color: "#F8F8F2" }}>&gt;</span>
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
        props={[
          {
            name: "showProgress",
            type: "boolean",
            default: "false",
            required: false,
            description: t("_props.scroll-cursor.showProgress"),
          },
          {
            name: "customCursor",
            type: "boolean",
            default: "false",
            required: false,
            description: t("_props.scroll-cursor.customCursor"),
          },
        ]}
      >
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {t("scroll.scroll_progress")}
            </p>
            <div className="h-0.5 bg-ef-dark-gray w-full">
              <div className="h-full bg-primary w-2/3" />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              {t("scroll.custom_scrollbar")}
            </p>
            <div
              className="h-32 overflow-y-auto bg-surface-1 border border-border p-4 text-sm text-muted-foreground"
              style={{ scrollbarWidth: "thin" }}
            >
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} className="py-1">
                  {t("scroll.scroll_line_text", { number: i + 1 })}
                </p>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>
      <SignatureContentSection />
    </>
  );
}
