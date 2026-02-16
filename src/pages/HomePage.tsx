import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Shield, Zap, Radio, Crosshair, ArrowRight } from "lucide-react";

import {
  Reveal,
  ParallaxLayer,
  TiltCard,
  Particles,
} from "@/components/home/animations";
import {
  GlitchText,
  DiamondLoader,
  Counter,
  TopoBg,
  MiniRadar,
  DataStreamMini,
  HoloCard,
  TacticalBadge,
  HUDFrame,
} from "@/components/home/signature";

// ═══ FEATURES DATA ═══════════════════════════════
const features = [
  {
    icon: "◆",
    title: "FOUNDATIONS",
    desc: "Typography, color palette, spacing, dan semantic tokens.",
    count: "12 Tokens",
  },
  {
    icon: "⬡",
    title: "CORE COMPONENTS",
    desc: "Button, Card, Input, Dialog dengan Endfield aesthetic.",
    count: "18 Components",
  },
  {
    icon: "◇",
    title: "DATA DISPLAY",
    desc: "Tables, charts, badges, dan status indicators.",
    count: "14 Patterns",
  },
  {
    icon: "▣",
    title: "ANIMATIONS",
    desc: "Parallax, glitch, glow, dan scroll-triggered animations.",
    count: "8 Systems",
  },
  {
    icon: "◈",
    title: "PATTERNS",
    desc: "Layout patterns, form patterns, dan navigation blueprints.",
    count: "10 Blueprints",
  },
  {
    icon: "⬢",
    title: "INTERACTIVE",
    desc: "Hover states, focus rings, transitions, micro-interactions.",
    count: "16 States",
  },
];

// ═══ HOMEPAGE ════════════════════════════════════
const HomePage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    document.title = "Arknights: Endfield — Design System v2.0";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* ═══ HERO ═══ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <Particles />
        <TopoBg />
        <div className="absolute inset-0 scanline-overlay" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              EF-SYS // ENDFIELD INDUSTRIES
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-bold tracking-[0.06em] uppercase mt-6 mb-4"
          >
            <GlitchText text="DESIGN" />
            <br />
            <span className="text-primary text-glow-yellow">SYSTEM</span>
            <span className="text-muted-foreground text-2xl sm:text-4xl lg:text-5xl ml-3">
              v2.0
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mt-4 font-body"
          >
            Sci-Fi Industrial Futurism — 70+ sections, live playground,
            signature components.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <button
              onClick={() => navigate("/docs")}
              className="clip-corner bg-primary text-primary-foreground font-ui text-xs tracking-[0.15em] uppercase px-8 py-4 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-shadow duration-300"
            >
              EXPLORE DOCS ◆
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("signature")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="clip-corner border border-border bg-surface-1 text-foreground font-ui text-xs tracking-[0.15em] uppercase px-8 py-4 hover:border-primary/50 transition-colors duration-300"
            >
              SIGNATURE ↓
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ STATS ═══ */}
      <section className="relative py-20 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <Counter value={70} label="Sections" />
              <Counter value={45} label="Components" />
              <Counter value={12} label="Signature Items" />
              <Counter value={8} label="Animation Systems" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SIGNATURE SHOWCASE ═══ */}
      <section id="signature" className="relative py-32 overflow-hidden">
        <TopoBg className="opacity-30" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ParallaxLayer speed={0.15}>
            <Reveal>
              <div className="text-center mb-16">
                <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-primary">
                  ◆ ENDFIELD SIGNATURE
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.05em] uppercase text-foreground mt-3">
                  UNIQUE{" "}
                  <span className="text-primary text-glow-yellow">
                    IDENTITY
                  </span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-body">
                  Komponen khas yang tidak ditemukan di design system manapun —
                  murni identitas Endfield.
                </p>
              </div>
            </Reveal>
          </ParallaxLayer>

          {/* Signature badges */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <TacticalBadge variant="default">CLIP-CORNER</TacticalBadge>
              <TacticalBadge variant="success">DIAMOND ◆</TacticalBadge>
              <TacticalBadge variant="info">SCANLINE</TacticalBadge>
              <TacticalBadge variant="default">CORNER-BRACKETS</TacticalBadge>
              <TacticalBadge variant="info">HUD OVERLAY</TacticalBadge>
            </div>
          </Reveal>

          {/* Row 1: Holo Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: Shield,
                title: "DEFENSE GRID",
                subtitle: "Clip-corner cards with holo scan",
                value: "A+",
              },
              {
                icon: Zap,
                title: "POWER OUTPUT",
                subtitle: "Diamond markers & glow effects",
                value: "847MW",
              },
              {
                icon: Radio,
                title: "COMMS ARRAY",
                subtitle: "Tactical HUD components",
                value: "12ch",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <HoloCard {...card} />
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* Row 2: Radar + Data Stream */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Reveal delay={0.1}>
              <TiltCard>
                <div className="border border-border bg-surface-1 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Crosshair className="w-3.5 h-3.5 text-primary" />
                    <span className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-foreground">
                      RADAR ANALYSIS
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <MiniRadar
                      data={[
                        { label: "ATK", value: 85 },
                        { label: "DEF", value: 70 },
                        { label: "SPD", value: 92 },
                        { label: "RNG", value: 60 },
                        { label: "HP", value: 78 },
                        { label: "CRIT", value: 88 },
                      ]}
                    />
                  </div>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.2}>
              <TiltCard>
                <DataStreamMini />
              </TiltCard>
            </Reveal>
          </div>

          {/* Row 3: HUD Overlay */}
          <Reveal delay={0.15}>
            <TiltCard>
              <HUDFrame>
                <div className="text-center">
                  <DiamondLoader size={20} />
                  <p className="font-display text-xl sm:text-2xl font-bold tracking-[0.08em] uppercase text-foreground mt-6">
                    FIELD{" "}
                    <span className="text-primary text-glow-yellow">
                      OPERATIVE
                    </span>
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-2">
                    CLEARANCE: ALPHA ◆ ALL SYSTEMS NOMINAL
                  </p>
                </div>
              </HUDFrame>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="relative py-32 border-t border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <ParallaxLayer speed={0.2}>
            <Reveal>
              <div className="text-center mb-20">
                <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-primary">
                  ◆ MODULES
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.05em] uppercase text-foreground mt-3">
                  COMPLETE ARSENAL
                </h2>
                <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-body">
                  Setiap aspek UI dirancang dengan presisi industrial. Dari
                  fondasi token hingga pattern kompleks.
                </p>
              </div>
            </Reveal>
          </ParallaxLayer>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <div className="relative h-full border border-border bg-surface-1 p-8 group hover:border-primary/40 transition-colors duration-500 cursor-default">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-500" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors duration-500" />
                    <div className="relative z-10">
                      <span className="text-primary text-2xl">{f.icon}</span>
                      <h3 className="font-display text-sm font-bold tracking-[0.1em] uppercase text-foreground mt-4 mb-2">
                        {f.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
                        {f.desc}
                      </p>
                      <span className="font-mono text-[10px] text-primary/70 tracking-[0.1em] uppercase">
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
            <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-primary">
              ◆ READY TO BUILD
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[0.05em] uppercase text-foreground mt-4 mb-6">
              START{" "}
              <span className="text-primary text-glow-yellow">EXPLORING</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-10 max-w-lg mx-auto">
              Akses seluruh 70+ section dokumentasi dengan live preview,
              interactive playground, dan signature components.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate("/docs")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="clip-corner-lg bg-primary text-primary-foreground font-ui text-sm tracking-[0.15em] uppercase px-12 py-5 hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-shadow duration-300"
              >
                OPEN DOCUMENTATION ◆
              </motion.button>
              <motion.button
                onClick={() => navigate("/docs")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="clip-corner-lg border border-border bg-surface-1 text-foreground font-ui text-sm tracking-[0.15em] uppercase px-12 py-5 hover:border-primary/50 transition-colors flex items-center gap-2 justify-center"
              >
                SIGNATURE COMPONENTS <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            Design System v2.0 — Complete Edition — February 2026
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/50 mt-2">
            EF-SYS // ENDFIELD INDUSTRIES
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
