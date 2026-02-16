import { ComponentPreview } from "../docs/ComponentPreview";
import { ArrowRight, Play } from "lucide-react";

export const ContentMediaSection = () => {
  return (
    <>
      {/* 41. Hero Section */}
      <ComponentPreview
        id="hero-section"
        title="41. Hero / Landing Section"
        showViewport
        description="Min-height 100vh. Overline: Orbitron yellow pill. Heading: 56-72px uppercase."
        props={[
          {
            name: "overline",
            type: "string",
            required: false,
            description: "Pill-shaped overline label (e.g. 'VERSION 2.0')",
          },
          {
            name: "title",
            type: "string",
            required: true,
            description: "Main heading text (56-72px)",
          },
          {
            name: "subtitle",
            type: "string",
            required: false,
            description: "Supporting paragraph text",
          },
          {
            name: "primaryAction",
            type: "{ label: string; onClick: () => void }",
            required: false,
            description: "Primary CTA button",
          },
          {
            name: "secondaryAction",
            type: "{ label: string; onClick: () => void }",
            required: false,
            description: "Secondary outline CTA button",
          },
          {
            name: "terminal",
            type: "string",
            required: false,
            description: "Terminal command to display below CTAs",
          },
        ]}
      >
        <div className="relative scanline-overlay bg-surface-0 -m-8 p-0">
          <div
            className="min-h-[50vh] flex flex-col items-center justify-center text-center px-8 py-16"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,212,41,0.08), transparent 70%)",
            }}
          >
            <span className="font-ui text-[11px] tracking-[0.15em] uppercase text-primary border border-primary/40 bg-primary/[0.08] px-4 py-1 mb-6">
              VERSION 2.0
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-[0.04em] uppercase text-foreground mb-4 text-glow-yellow">
              BUILD BEYOND
              <br />
              BOUNDARIES
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              Comprehensive design system for the frontier of web development.
            </p>
            <div className="flex gap-4">
              <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 hover:brightness-110 hover:shadow-[0_0_20px_hsl(47_100%_56%/0.3)] transition-all">
                GET STARTED
              </button>
              <button className="clip-corner border border-foreground/25 text-card-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-8 py-3.5 hover:border-primary hover:text-primary transition-all bg-transparent">
                VIEW DOCS
              </button>
            </div>
            {/* Terminal box */}
            <div className="mt-10 bg-surface-1 border border-border p-4 text-left max-w-md w-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-ui text-[10px] text-muted-foreground uppercase tracking-widest">
                  TERMINAL
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

      {/* 42. Code Block */}
      <ComponentPreview
        id="code-block-terminal"
        title="42. Code Block & Terminal"
        description="JetBrains Mono 14px. Syntax highlighting. Copy button on hover. Terminal with blinking cursor."
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
            description: "Code content to display",
          },
          {
            name: "language",
            type: "string",
            default: '"tsx"',
            required: false,
            description: "Language for syntax highlighting",
          },
          {
            name: "showLineNumbers",
            type: "boolean",
            default: "false",
            required: false,
            description: "Display line numbers",
          },
          {
            name: "copyable",
            type: "boolean",
            default: "true",
            required: false,
            description: "Show copy button on hover",
          },
          {
            name: "variant",
            type: '"code" | "terminal"',
            default: '"code"',
            required: false,
            description: "Visual style variant",
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
                TERMINAL
              </span>
            </div>
            <div className="p-4 font-mono text-sm">
              <p className="text-muted-foreground">
                $ <span className="text-ef-green">endfield</span> init
                my-project
              </p>
              <p className="text-muted-foreground">Creating project...</p>
              <p className="text-ef-green">✓ Project created successfully.</p>
              <p className="text-muted-foreground">
                ${" "}
                <span className="inline-block w-2 h-4 bg-primary animate-cursor-blink" />
              </p>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 43. Blog Layout */}
      <ComponentPreview
        id="blog-layout"
        title="43. Blog / Content Layout"
        showViewport
        description="Content max-width 680px. Para spacing 24px. Blockquote: 3px left border yellow."
        props={[
          {
            name: "title",
            type: "string",
            required: true,
            description: "Article heading",
          },
          {
            name: "category",
            type: "string",
            required: false,
            description: "Category label (e.g. 'ENGINEERING')",
          },
          {
            name: "date",
            type: "string",
            required: false,
            description: "Publication date",
          },
          {
            name: "readTime",
            type: "string",
            required: false,
            description: "Estimated read time",
          },
          {
            name: "children",
            type: "ReactNode",
            required: true,
            description: "Article body content (markdown-rendered)",
          },
        ]}
      >
        <div className="max-w-[680px] mx-auto">
          <div className="mb-6">
            <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-primary">
              ENGINEERING
            </span>
            <span className="text-muted-foreground mx-2">·</span>
            <span className="font-mono text-[11px] text-muted-foreground">
              15.02.2026
            </span>
            <span className="text-muted-foreground mx-2">·</span>
            <span className="text-xs text-muted-foreground">5 min read</span>
          </div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-[0.02em] text-foreground mb-6">
            BUILDING THE NEXT FRONTIER
          </h2>
          <p className="text-sm text-card-foreground leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <blockquote className="border-l-[3px] border-primary bg-primary/[0.03] px-5 py-4 mb-6 text-sm text-card-foreground italic">
            "Design is not just what it looks like. Design is how it works."
          </blockquote>
          <p className="text-sm text-card-foreground leading-relaxed mb-6">
            Ut enim ad minim veniam, quis nostrud exercitation. Read more about{" "}
            <a className="text-ef-blue hover:text-ef-blue-light underline">
              advanced patterns
            </a>
            .
          </p>
          <div className="gradient-line-h opacity-50" />
        </div>
      </ComponentPreview>

      {/* 44. Image & Media */}
      <ComponentPreview
        id="image-media"
        title="44. Image & Media"
        description="Container overflow hidden. Border overlay. Hover: img scale(1.05). Caption: 12px italic."
        props={[
          {
            name: "src",
            type: "string",
            required: true,
            description: "Image source URL",
          },
          {
            name: "alt",
            type: "string",
            required: true,
            description: "Alt text for accessibility",
          },
          {
            name: "caption",
            type: "string",
            required: false,
            description: "Caption text below image",
          },
          {
            name: "aspectRatio",
            type: '"16:9" | "4:3" | "1:1"',
            default: '"16:9"',
            required: false,
            description: "Image aspect ratio",
          },
          {
            name: "hover",
            type: "boolean",
            default: "true",
            required: false,
            description: "Enable scale hover effect",
          },
        ]}
      >
        <div className="max-w-md">
          <div className="overflow-hidden bg-surface-1 border border-border group">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-ef-blue/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <span className="font-display text-lg text-muted-foreground">
                16:9 IMAGE
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            Caption: Desaturated, cool-toned photography with dark overlay.
          </p>
        </div>
      </ComponentPreview>

      {/* 45. Video Player */}
      <ComponentPreview
        id="video-player"
        title="45. Video Player"
        description="Play button: diamond 64px. Progress: 3px track. Dark overlay when paused."
        props={[
          {
            name: "src",
            type: "string",
            required: true,
            description: "Video source URL",
          },
          {
            name: "poster",
            type: "string",
            required: false,
            description: "Poster image URL",
          },
          {
            name: "autoplay",
            type: "boolean",
            default: "false",
            required: false,
            description: "Auto-play on mount",
          },
          {
            name: "controls",
            type: "boolean",
            default: "true",
            required: false,
            description: "Show playback controls",
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

      {/* 46. Dividers */}
      <ComponentPreview
        id="dividers"
        title="46. Dividers & Decorative Lines"
        description="Standard, tech glow, with label, corner brackets, diamond bullet."
        props={[
          {
            name: "variant",
            type: '"standard" | "glow" | "labeled" | "diamond"',
            default: '"standard"',
            required: false,
            description: "Divider visual style",
          },
          {
            name: "label",
            type: "string",
            required: false,
            description: "Center label text (for labeled variant)",
          },
        ]}
      >
        <div className="space-y-8">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Standard</p>
            <div className="border-t border-border" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Tech Glow</p>
            <div className="gradient-line-h" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">With Label</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-border" />
              <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                SECTION
              </span>
              <div className="flex-1 border-t border-border" />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Diamond Bullet</p>
            <div className="flex items-center justify-center">
              <span className="text-primary text-xs">◆</span>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 47. Scroll & Cursor */}
      <ComponentPreview
        id="scroll-cursor"
        title="47. Scroll & Cursor"
        description="Scrollbar 6px, thumb square. Scroll progress bar fixed top. Custom cursor optional."
        props={[
          {
            name: "showProgress",
            type: "boolean",
            default: "false",
            required: false,
            description: "Show fixed top scroll progress bar",
          },
          {
            name: "customCursor",
            type: "boolean",
            default: "false",
            required: false,
            description: "Enable custom Endfield cursor",
          },
        ]}
      >
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Scroll Progress Bar
            </p>
            <div className="h-0.5 bg-ef-dark-gray w-full">
              <div className="h-full bg-primary w-2/3" />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Custom Scrollbar (6px, square thumb)
            </p>
            <div
              className="h-32 overflow-y-auto bg-surface-1 border border-border p-4 text-sm text-muted-foreground"
              style={{ scrollbarWidth: "thin" }}
            >
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} className="py-1">
                  Line {i + 1}: Scroll content for testing custom scrollbar
                  style.
                </p>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
};
