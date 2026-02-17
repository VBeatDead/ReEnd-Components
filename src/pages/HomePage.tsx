import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Palette,
  Layers,
  BarChart3,
  Sparkles,
  LayoutGrid,
  MousePointerClick,
  MessageSquare,
  MonitorSmartphone,
  Code2,
  BookOpen,
  Github,
  Search,
  Eye,
  EyeOff,
  Terminal,
  ChevronDown,
} from "lucide-react";

import {
  Reveal,
  ParallaxLayer,
  TiltCard,
  Particles,
} from "@/components/home/animations";
import { GlitchText, Counter, TopoBg } from "@/components/home/signature";

// ═══ FEATURES DATA ═══════════════════════════════
const features = [
  {
    icon: Palette,
    title: "FOUNDATIONS",
    desc: "Typography, color palette, spacing, and semantic design tokens.",
    count: "12 Tokens",
    slug: "foundations",
  },
  {
    icon: Layers,
    title: "CORE COMPONENTS",
    desc: "Buttons, Cards, Inputs, Dialogs with industrial aesthetic.",
    count: "18 Components",
    slug: "core-components",
  },
  {
    icon: BarChart3,
    title: "DATA DISPLAY",
    desc: "Tables, charts, badges, and status indicators.",
    count: "14 Patterns",
    slug: "data-display",
  },
  {
    icon: Sparkles,
    title: "ANIMATIONS",
    desc: "Parallax, glitch, glow, and scroll-triggered animations.",
    count: "8 Systems",
    slug: "animation",
  },
  {
    icon: LayoutGrid,
    title: "PATTERNS",
    desc: "Layout patterns, form patterns, and navigation blueprints.",
    count: "10 Blueprints",
    slug: "patterns",
  },
  {
    icon: MousePointerClick,
    title: "INTERACTIVE",
    desc: "Hover states, focus rings, transitions, micro-interactions.",
    count: "16 States",
    slug: "interactive",
  },
  {
    icon: MessageSquare,
    title: "FEEDBACK",
    desc: "Toast, alert, dialog, loading, and notification systems.",
    count: "9 Components",
    slug: "feedback",
  },
  {
    icon: MonitorSmartphone,
    title: "CONTENT & MEDIA",
    desc: "Image, video, carousel, avatar, and media handling.",
    count: "11 Components",
    slug: "content-media",
  },
];

// ═══ COLORS ═══
const colorTokens = [
  { name: "Primary", var: "--primary", sample: "bg-primary" },
  { name: "Destructive", var: "--destructive", sample: "bg-destructive" },
  { name: "Cyan", var: "--ef-cyan", sample: "bg-ef-cyan" },
  { name: "Blue", var: "--ef-blue", sample: "bg-ef-blue" },
  { name: "Green", var: "--ef-green", sample: "bg-ef-green" },
  { name: "Orange", var: "--ef-orange", sample: "bg-ef-orange" },
  { name: "Purple", var: "--ef-purple", sample: "bg-ef-purple" },
  { name: "Red", var: "--ef-red", sample: "bg-ef-red" },
];

// ═══ LIVE BUTTON DEMO ═══
const ButtonShowcase = () => (
  <div className="space-y-6">
    <div>
      <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
        VARIANTS
      </p>
      <div className="flex flex-wrap gap-3 items-center">
        <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 hover:brightness-110 hover:shadow-[0_0_20px_hsl(47_100%_56%/0.3)] transition-all active:brightness-90">
          PRIMARY
        </button>
        <button className="clip-corner border border-foreground/25 text-card-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 hover:border-primary hover:text-primary transition-all bg-transparent">
          SECONDARY
        </button>
        <button className="text-muted-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-4 py-3 hover:text-primary transition-all bg-transparent">
          GHOST
        </button>
        <button className="clip-corner bg-ef-red text-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 hover:brightness-110 transition-all">
          DANGER
        </button>
      </div>
    </div>
    <div>
      <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
        SIZES
      </p>
      <div className="flex flex-wrap gap-3 items-end">
        {[
          { label: "XS", px: "4px 12px", font: "10px", h: "28px" },
          { label: "SM", px: "6px 16px", font: "11px", h: "32px" },
          { label: "MD", px: "10px 24px", font: "13px", h: "40px" },
          { label: "LG", px: "14px 32px", font: "15px", h: "48px" },
        ].map((s) => (
          <button
            key={s.label}
            className="clip-corner bg-primary text-primary-foreground font-display font-bold tracking-[0.1em] uppercase transition-all hover:brightness-110"
            style={{ padding: s.px, fontSize: s.font, minHeight: s.h }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
    <div>
      <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
        STATES
      </p>
      <div className="flex flex-wrap gap-3 items-center">
        <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 ring-2 ring-primary ring-offset-2 ring-offset-background">
          FOCUS
        </button>
        <button className="clip-corner bg-primary/80 text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 flex items-center gap-2">
          <span className="inline-block w-3.5 h-3.5 border-2 border-primary-foreground clip-corner-sm animate-diamond-spin" />
          LOADING
        </button>
        <button
          className="clip-corner bg-ef-gray text-ef-gray-mid font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 cursor-not-allowed"
          disabled
        >
          DISABLED
        </button>
      </div>
    </div>
  </div>
);

// ═══ CARD DEMO ═══
const CardShowcase = () => (
  <div className="grid sm:grid-cols-2 gap-4">
    {/* Content Card */}
    <div className="relative border border-border bg-surface-1 p-6 group hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 cursor-pointer overflow-hidden">
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors" />
      <div className="relative z-10">
        <div className="w-8 h-8 clip-corner-sm bg-primary/10 flex items-center justify-center mb-4">
          <Code2 className="w-4 h-4 text-primary" />
        </div>
        <h4 className="font-display text-xs font-bold tracking-[0.08em] uppercase text-foreground mb-2">
          COMPONENT CARD
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Corner brackets, hover lift, border glow transition on interaction.
        </p>
        <div className="flex items-center gap-2 mt-4 text-primary font-display text-[10px] font-bold tracking-[0.1em] uppercase group-hover:gap-3 transition-all">
          VIEW MORE <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
    {/* Stat Card */}
    <div className="clip-corner border border-border bg-surface-1 p-6 overflow-hidden group hover:border-primary/30 transition-all duration-500">
      <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1">
        TOTAL COMPONENTS
      </p>
      <p className="font-display text-4xl font-bold text-primary text-glow-yellow">
        70+
      </p>
      <div className="gradient-line-h my-4" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted-foreground">
          11 Categories
        </span>
        <span className="inline-flex items-center gap-1 clip-corner-sm border border-ef-green/40 text-ef-green bg-ef-green/10 px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.1em] uppercase">
          <span style={{ fontSize: "5px" }}>◆</span> ACTIVE
        </span>
      </div>
    </div>
  </div>
);

// ═══ FORM DEMO ═══
const FormShowcase = () => {
  const [inputVal, setInputVal] = useState("ReEnd");
  const [showPw, setShowPw] = useState(false);
  const [toggled, setToggled] = useState(true);

  return (
    <div className="space-y-5">
      {/* Text Input */}
      <div>
        <label className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground block mb-2">
          OPERATOR NAME
        </label>
        <div className="relative">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full bg-surface-0 border border-border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)] outline-none transition-all"
            placeholder="Enter name..."
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4 text-muted-foreground/40" />
          </div>
        </div>
      </div>
      {/* Password Input */}
      <div>
        <label className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground block mb-2">
          ACCESS CODE <span className="text-ef-red">*</span>
        </label>
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            defaultValue="Endfield2026"
            className="w-full bg-surface-0 border border-ef-green px-4 py-3 font-body text-sm text-foreground shadow-[0_0_0_3px_hsl(var(--ef-green)/0.1)] outline-none transition-all"
          />
          <button
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPw ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="font-mono text-[10px] text-ef-green mt-1.5 flex items-center gap-1">
          <span style={{ fontSize: "6px" }}>◆</span> Verified
        </p>
      </div>
      {/* Toggle & Select */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setToggled(!toggled)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${toggled ? "bg-primary" : "bg-surface-3"}`}
          >
            <motion.div
              animate={{ x: toggled ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 bg-background rounded-full shadow-sm"
            />
          </button>
          <span className="font-display text-[10px] font-bold tracking-[0.1em] uppercase text-muted-foreground">
            {toggled ? "ENABLED" : "DISABLED"}
          </span>
        </div>
        <div className="flex-1">
          <div className="relative">
            <select className="w-full bg-surface-0 border border-border px-4 py-2.5 font-body text-sm text-foreground outline-none appearance-none cursor-pointer hover:border-primary/50 transition-colors">
              <option>ALPHA</option>
              <option>BETA</option>
              <option>GAMMA</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══ LIVE TERMINAL DEMO ═══
const TerminalDemo = () => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const msgs = [
      "$ npm install reend-components",
      "[1/4] Resolving packages...",
      "[2/4] Fetching packages...",
      "[3/4] Linking dependencies...",
      "[4/4] Building fresh packages...",
      "✓ Installed 70+ components",
      "✓ Design tokens loaded",
      "✓ Ready to use",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < msgs.length) {
        const msg = msgs[i];
        setLines((prev) => [...prev, msg]);
        i++;
      } else {
        i = 0;
        setLines([]);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-border bg-background clip-corner overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-surface-0">
        <Terminal className="w-3 h-3 text-primary" />
        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
          TERMINAL
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-ef-red/60" />
          <div className="w-2 h-2 rounded-full bg-ef-yellow/60" />
          <div className="w-2 h-2 rounded-full bg-ef-green/60" />
        </div>
      </div>
      <div className="p-4 h-[180px] overflow-hidden font-mono text-[11px] space-y-0.5">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={`${line}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={
                line.startsWith("$")
                  ? "text-primary"
                  : line.startsWith("✓")
                    ? "text-ef-green"
                    : "text-muted-foreground"
              }
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        <span className="inline-block w-1.5 h-3 bg-primary animate-cursor-blink" />
      </div>
    </div>
  );
};

// ═══ HOMEPAGE ════════════════════════════════════
const HomePage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    document.title = "ReEnd — Design System Components";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Particles />
        <TopoBg />
        <div className="absolute inset-0 scanline-overlay" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 clip-corner-sm border border-primary/30 bg-primary/5 px-4 py-1.5 font-display text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
              <span style={{ fontSize: "6px" }}>◆</span> OPEN SOURCE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-bold tracking-[0.06em] uppercase mt-8 mb-4"
          >
            <GlitchText text="ReEnd" />
            <br />
            <span className="text-primary text-glow-yellow">COMPONENTS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mt-4 font-body leading-relaxed"
          >
            A sci-fi industrial design system built with React, TypeScript, and
            Tailwind CSS. 70+ documented components with live previews,
            interactive playgrounds, and full theme support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <button
              onClick={() => navigate("/docs")}
              className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:brightness-110 transition-all duration-300"
            >
              EXPLORE DOCS ◆
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("showcase")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="clip-corner border border-border bg-surface-1 text-foreground font-display text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:border-primary/50 transition-colors duration-300"
            >
              SEE COMPONENTS ↓
            </button>
          </motion.div>

          {/* Tech stack badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-2 mt-12"
          >
            {[
              "REACT",
              "TYPESCRIPT",
              "TAILWIND CSS",
              "RADIX UI",
              "FRAMER MOTION",
            ].map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] text-muted-foreground/60 border border-border/50 px-2.5 py-1 tracking-[0.1em]"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            y: { duration: 2, repeat: Infinity },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative py-16 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <Counter value={70} label="Components" />
              <Counter value={11} label="Categories" />
              <Counter value={8} label="Animation Systems" />
              <Counter value={2} label="Theme Modes" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ COMPONENT SHOWCASE ═══ */}
      <section id="showcase" className="relative py-32 overflow-hidden">
        <TopoBg className="opacity-20" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ParallaxLayer speed={0.1}>
            <Reveal>
              <div className="text-center mb-16">
                <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
                  ◆ LIVE PREVIEW
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.05em] uppercase text-foreground mt-3">
                  BUILT WITH{" "}
                  <span className="text-primary text-glow-yellow">
                    OUR COMPONENTS
                  </span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-body">
                  Every element below uses the design system's own CSS
                  utilities, design tokens, and patterns. What you see is what
                  you get.
                </p>
              </div>
            </Reveal>
          </ParallaxLayer>

          {/* Row 1: Buttons + Cards */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Reveal delay={0.1}>
              <TiltCard className="h-full">
                <div className="border border-border bg-surface-1 p-6 h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="w-1.5 h-1.5 bg-primary"
                      style={{
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      }}
                    />
                    <span className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-foreground">
                      BUTTONS
                    </span>
                    <span className="ml-auto font-mono text-[9px] text-primary/60">
                      clip-corner
                    </span>
                  </div>
                  <ButtonShowcase />
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.2}>
              <TiltCard className="h-full">
                <div className="border border-border bg-surface-1 p-6 h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="w-1.5 h-1.5 bg-primary"
                      style={{
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      }}
                    />
                    <span className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-foreground">
                      CARDS
                    </span>
                    <span className="ml-auto font-mono text-[9px] text-primary/60">
                      corner-brackets
                    </span>
                  </div>
                  <CardShowcase />
                </div>
              </TiltCard>
            </Reveal>
          </div>

          {/* Row 2: Forms + Terminal */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Reveal delay={0.1}>
              <TiltCard className="h-full">
                <div className="border border-border bg-surface-1 p-6 h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="w-1.5 h-1.5 bg-primary"
                      style={{
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      }}
                    />
                    <span className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-foreground">
                      FORMS & INPUT
                    </span>
                    <span className="ml-auto font-mono text-[9px] text-primary/60">
                      focus-glow
                    </span>
                  </div>
                  <FormShowcase />
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.2}>
              <TiltCard className="h-full">
                <div className="border border-border bg-surface-1 p-6 h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="w-1.5 h-1.5 bg-primary"
                      style={{
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      }}
                    />
                    <span className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-foreground">
                      QUICK START
                    </span>
                    <span className="ml-auto font-mono text-[9px] text-primary/60">
                      terminal
                    </span>
                  </div>
                  <TerminalDemo />
                </div>
              </TiltCard>
            </Reveal>
          </div>

          {/* Row 3: Color Tokens */}
          <Reveal delay={0.15}>
            <TiltCard>
              <div className="border border-border bg-surface-1 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="w-1.5 h-1.5 bg-primary"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    }}
                  />
                  <span className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-foreground">
                    DESIGN TOKENS
                  </span>
                  <span className="ml-auto font-mono text-[9px] text-primary/60">
                    CSS custom properties
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {colorTokens.map((c) => (
                    <div
                      key={c.name}
                      className="text-center group cursor-pointer"
                    >
                      <div
                        className={`w-full aspect-square ${c.sample} clip-corner-sm group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_hsl(var(${c.var})/0.4)]`}
                      />
                      <p className="font-mono text-[9px] text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                        {c.name}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="gradient-line-h my-5" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Surface 0", cls: "bg-surface-0" },
                    { label: "Surface 1", cls: "bg-surface-1" },
                    { label: "Surface 2", cls: "bg-surface-2" },
                    { label: "Surface 3", cls: "bg-surface-3" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 ${s.cls} border border-border clip-corner-sm shrink-0`}
                      />
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ═══ FEATURES GRID ═══ */}
      <section className="relative py-32 border-t border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <ParallaxLayer speed={0.15}>
            <Reveal>
              <div className="text-center mb-20">
                <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
                  ◆ DOCUMENTATION
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.05em] uppercase text-foreground mt-3">
                  EXPLORE{" "}
                  <span className="text-primary text-glow-yellow">
                    ALL MODULES
                  </span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-body">
                  Each category includes live previews, interactive playgrounds,
                  API references, and code examples.
                </p>
              </div>
            </Reveal>
          </ParallaxLayer>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <TiltCard className="h-full">
                  <div
                    onClick={() => navigate(`/docs/${f.slug}`)}
                    className="relative h-full border border-border bg-surface-1 p-6 group hover:border-primary/40 transition-all duration-500 cursor-pointer hover:-translate-y-1"
                  >
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/20 group-hover:border-primary/60 transition-colors duration-500" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/20 group-hover:border-primary/60 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors duration-500" />
                    <div className="relative z-10">
                      <f.icon className="w-5 h-5 text-primary mb-4 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all" />
                      <h3 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-foreground mb-2">
                        {f.title}
                      </h3>
                      <p className="text-muted-foreground text-xs font-body leading-relaxed mb-4">
                        {f.desc}
                      </p>
                      <span className="font-mono text-[9px] text-primary/70 tracking-[0.1em] uppercase">
                        {f.count}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-32 overflow-hidden">
        <Particles />
        <TopoBg />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
              ◆ GET STARTED
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[0.05em] uppercase text-foreground mt-4 mb-6">
              START{" "}
              <span className="text-primary text-glow-yellow">BUILDING</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-10 max-w-lg mx-auto">
              Clone the repo, explore 70+ documented components with live
              previews and interactive playgrounds.
            </p>

            {/* Install command */}
            <div className="max-w-md mx-auto mb-8">
              <div className="border border-border bg-surface-0 px-5 py-3 font-mono text-sm text-muted-foreground flex items-center justify-between clip-corner">
                <span>
                  <span className="text-primary">$</span> git clone
                  reend-components
                </span>
                <Code2 className="w-4 h-4 text-muted-foreground/40" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate("/docs")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="clip-corner-lg bg-primary text-primary-foreground font-display text-sm font-bold tracking-[0.15em] uppercase px-12 py-5 hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-shadow duration-300 flex items-center gap-2 justify-center"
              >
                <BookOpen className="w-4 h-4" /> DOCUMENTATION
              </motion.button>
              <motion.a
                href="https://github.com/VBeatDead/ReEnd-Components"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="clip-corner-lg border border-border bg-surface-1 text-foreground font-display text-sm font-bold tracking-[0.15em] uppercase px-12 py-5 hover:border-primary/50 transition-colors flex items-center gap-2 justify-center"
              >
                <Github className="w-4 h-4" /> GITHUB
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-foreground">
                ReEnd Components
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-1">
                MIT License — Open Source
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/VBeatDead/ReEnd-Components"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.1em]"
              >
                GitHub
              </a>
              <button
                onClick={() => navigate("/docs")}
                className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.1em]"
              >
                Docs
              </button>
            </div>
          </div>
          <div className="gradient-line-h my-6" />
          <p className="font-mono text-[9px] text-muted-foreground/40 text-center leading-relaxed">
            This is a community-driven, fan-made project inspired by the sci-fi
            industrial aesthetics of Arknights: Endfield. Not affiliated with,
            endorsed by, or connected to Hypergryph, Gryphline, or any of their
            subsidiaries. All game-related trademarks belong to their respective
            owners.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
