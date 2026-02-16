import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Shield, Zap, Radio, Activity, Terminal, Crosshair, Wifi, ArrowRight } from "lucide-react";

// ═══ SHARED UTILITIES ════════════════════════════

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.8, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ParallaxLayer = ({ children, speed = 0.5, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -100]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRotateX(-((e.clientY - rect.top) / rect.height - 0.5) * 20);
    setRotateY(((e.clientX - rect.left) / rect.width - 0.5) * 20);
  }, []);
  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ═══ SIGNATURE COMPONENTS FOR HOMEPAGE ═══════════

const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{text}</span>
    <span className="absolute inset-0 text-ef-cyan/40 animate-glitch" style={{ clipPath: "inset(20% 0 40% 0)" }} aria-hidden>{text}</span>
    <span className="absolute inset-0 text-ef-red/30 animate-glitch" style={{ clipPath: "inset(60% 0 10% 0)", animationDelay: "0.1s" }} aria-hidden>{text}</span>
  </span>
);

const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 20 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-primary/20"
        style={{ left: `${5 + (i * 17) % 90}%`, top: `${5 + (i * 23) % 90}%`, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const DiamondLoader = ({ size = 28, label }: { size?: number; label?: string }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="relative" style={{ width: size * 2, height: size * 2 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute inset-0 border-2 border-primary" style={{
          transform: `rotate(45deg) scale(${1 - i * 0.25})`,
          animation: `diamondSpin ${1.2 + i * 0.4}s linear infinite ${i === 1 ? "reverse" : ""}`,
          opacity: 1 - i * 0.25,
        }} />
      ))}
    </div>
    {label && <span className="font-mono text-[10px] text-muted-foreground tracking-[0.15em] uppercase">{label}</span>}
  </div>
);

const Counter = ({ value, label }: { value: number; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(value / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); } else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-3xl sm:text-4xl font-bold text-primary">{count}+</span>
      <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-2">{label}</p>
    </div>
  );
};

// ─── TOPOGRAPHIC BACKGROUND (Endfield Contour Lines) ─────────
const TopoBg = ({ className = "" }: { className?: string }) => {
  const paths = useMemo(() => {
    // Generate organic closed contour loops around multiple "peaks"
    const peaks = [
      { cx: 200, cy: 150, rings: 6, scale: 1.2 },
      { cx: 500, cy: 250, rings: 5, scale: 1.0 },
      { cx: 700, cy: 120, rings: 4, scale: 0.8 },
      { cx: 350, cy: 350, rings: 3, scale: 0.7 },
      { cx: 100, cy: 320, rings: 4, scale: 0.9 },
    ];
    const result: { d: string; major: boolean }[] = [];
    peaks.forEach((peak) => {
      for (let r = 1; r <= peak.rings; r++) {
        const radius = r * 28 * peak.scale;
        const segments = 60;
        const pts: string[] = [];
        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const noise =
            Math.sin(angle * 3 + peak.cx * 0.01) * radius * 0.15 +
            Math.sin(angle * 5 + peak.cy * 0.02) * radius * 0.08 +
            Math.cos(angle * 2 + r) * radius * 0.12;
          const x = peak.cx + (radius + noise) * Math.cos(angle);
          const y = peak.cy + (radius + noise) * Math.sin(angle) * 0.7;
          pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }
        result.push({ d: `M ${pts.join(" L ")} Z`, major: r % 3 === 0 });
      }
    });
    return result;
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg width="100%" height="100%" className="opacity-[0.04]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke="hsl(var(--foreground))" strokeWidth={p.major ? 1 : 0.5} />
        ))}
      </svg>
    </div>
  );
};

// ─── RADAR CHART (Mini) ──────────────────────────
const MiniRadar = ({ data, size = 200, color = "--primary" }: { data: { label: string; value: number }[]; size?: number; color?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const cx = size / 2, cy = size / 2, r = size * 0.36;
  const n = data.length;
  const step = (Math.PI * 2) / n;
  const pt = (i: number, rad: number) => ({ x: cx + rad * Math.sin(i * step), y: cy - rad * Math.cos(i * step) });
  const grid = Array.from({ length: 4 }, (_, l) => {
    const lr = r * ((l + 1) / 4);
    return data.map((_, i) => pt(i, lr)).map(p => `${p.x},${p.y}`).join(" ");
  });
  const dp = data.map((d, i) => pt(i, (d.value / 100) * r));
  const path = dp.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div ref={ref}>
      <svg width={size} height={size} className="overflow-visible">
        {grid.map((pts, i) => <polygon key={i} points={pts} fill="none" stroke="hsl(var(--border))" strokeWidth={1} opacity={0.4} />)}
        {data.map((_, i) => { const p = pt(i, r); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="hsl(var(--border))" strokeWidth={1} opacity={0.2} />; })}
        <motion.polygon
          points={isInView ? path : data.map(() => `${cx},${cy}`).join(" ")}
          fill={`hsl(var(${color}) / 0.15)`}
          stroke={`hsl(var(${color}))`}
          strokeWidth={2}
          animate={isInView ? { points: path } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          style={{ filter: `drop-shadow(0 0 6px hsl(var(${color}) / 0.3))` }}
        />
        {dp.map((p, i) => (
          <motion.circle key={i} cx={isInView ? p.x : cx} cy={isInView ? p.y : cy} r={3} fill={`hsl(var(${color}))`} stroke="hsl(var(--background))" strokeWidth={2}
            animate={isInView ? { cx: p.x, cy: p.y } : {}} transition={{ duration: 0.8, delay: i * 0.05 }} style={{ filter: `drop-shadow(0 0 4px hsl(var(${color}) / 0.5))` }} />
        ))}
        {data.map((d, i) => { const p = pt(i, r + 18); return <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="font-display text-[8px] font-bold tracking-[0.1em] uppercase" fill="hsl(var(--muted-foreground))">{d.label}</text>; })}
      </svg>
    </div>
  );
};

// ─── DATA STREAM ─────────────────────────────────
const DataStreamMini = () => {
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const msgs = [
      "[SYS] ENDFIELD protocol initialized",
      "[NET] Latency: 12ms ◆ STABLE",
      "[SEC] Auth verified — Level: ALPHA",
      "[DAT] 94 design tokens loaded",
      "[GPU] Render: 60fps locked",
      "[SYS] 70+ modules online",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLines(prev => { const next = [...prev, msgs[i % msgs.length]]; return next.length > 5 ? next.slice(-5) : next; });
      i++;
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [lines]);
  return (
    <div className="border border-border bg-background clip-corner overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-surface-0">
        <Terminal className="w-3 h-3 text-primary" />
        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.1em]">LIVE FEED</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-ef-green animate-pulse" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
          <span className="font-mono text-[9px] text-ef-green">ACTIVE</span>
        </div>
      </div>
      <div ref={ref} className="p-3 h-32 overflow-hidden font-mono text-[11px] space-y-0.5">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div key={`${line}-${i}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              className={line.includes("[SEC]") ? "text-ef-green" : line.includes("[NET]") ? "text-ef-blue" : line.includes("[DAT]") ? "text-ef-cyan" : "text-muted-foreground"}>
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        <span className="inline-block w-1.5 h-3 bg-primary animate-cursor-blink" />
      </div>
    </div>
  );
};

// ─── HOLO CARD (Homepage version) ────────────────
const HoloCard = ({ icon: Icon, title, subtitle, value }: { icon: React.ElementType; title: string; subtitle: string; value?: string }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="relative clip-corner border border-border bg-surface-1 p-5 overflow-hidden group cursor-pointer transition-all duration-500 hover:border-primary/30"
      onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none transition-all duration-[2000ms]"
        style={{ top: hovering ? "100%" : "-10%", opacity: hovering ? 1 : 0 }} />
      <div className="relative z-10">
        <Icon className="w-4 h-4 text-primary mb-3 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all" />
        {value && <p className="font-display text-2xl font-bold text-primary mb-0.5">{value}</p>}
        <h4 className="font-display text-xs font-bold tracking-[0.08em] uppercase text-foreground mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="absolute bottom-2 right-3 text-primary/20 group-hover:text-primary/60 transition-colors text-[8px]">◆</div>
    </div>
  );
};

// ─── TACTICAL BADGE ──────────────────────────────
const TacticalBadge = ({ variant = "default", children }: { variant?: string; children: React.ReactNode }) => {
  const colors: Record<string, string> = {
    default: "border-primary/40 text-primary bg-primary/10",
    success: "border-ef-green/40 text-ef-green bg-ef-green/10",
    info: "border-ef-cyan/40 text-ef-cyan bg-ef-cyan/10",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 clip-corner-sm border px-2.5 py-1 font-display text-[9px] font-bold tracking-[0.15em] uppercase ${colors[variant] || colors.default}`}>
      <span style={{ fontSize: "5px" }}>◆</span>{children}
    </span>
  );
};

// ═══ FEATURES DATA ═══════════════════════════════
const features = [
  { icon: "◆", title: "FOUNDATIONS", desc: "Typography, color palette, spacing, dan semantic tokens.", count: "12 Tokens" },
  { icon: "⬡", title: "CORE COMPONENTS", desc: "Button, Card, Input, Dialog dengan Endfield aesthetic.", count: "18 Components" },
  { icon: "◇", title: "DATA DISPLAY", desc: "Tables, charts, badges, dan status indicators.", count: "14 Patterns" },
  { icon: "▣", title: "ANIMATIONS", desc: "Parallax, glitch, glow, dan scroll-triggered animations.", count: "8 Systems" },
  { icon: "◈", title: "PATTERNS", desc: "Layout patterns, form patterns, dan navigation blueprints.", count: "10 Blueprints" },
  { icon: "⬢", title: "INTERACTIVE", desc: "Hover states, focus rings, transitions, micro-interactions.", count: "16 States" },
];

// ═══ HOMEPAGE ════════════════════════════════════
const HomePage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left" style={{ scaleX }} />

      {/* ═══ HERO ═══ */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Particles />
        <TopoBg />
        <div className="absolute inset-0 scanline-overlay" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-muted-foreground">EF-SYS // ENDFIELD INDUSTRIES</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-bold tracking-[0.06em] uppercase mt-6 mb-4">
            <GlitchText text="DESIGN" />
            <br />
            <span className="text-primary text-glow-yellow">SYSTEM</span>
            <span className="text-muted-foreground text-2xl sm:text-4xl lg:text-5xl ml-3">v2.0</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mt-4 font-body">
            Sci-Fi Industrial Futurism — 70+ sections, live playground, signature components.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button onClick={() => navigate("/docs")}
              className="clip-corner bg-primary text-primary-foreground font-ui text-xs tracking-[0.15em] uppercase px-8 py-4 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-shadow duration-300">
              EXPLORE DOCS ◆
            </button>
            <button onClick={() => document.getElementById("signature")?.scrollIntoView({ behavior: "smooth" })}
              className="clip-corner border border-border bg-surface-1 text-foreground font-ui text-xs tracking-[0.15em] uppercase px-8 py-4 hover:border-primary/50 transition-colors duration-300">
              SIGNATURE ↓
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-2 bg-primary rounded-full" />
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
                <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-primary">◆ ENDFIELD SIGNATURE</span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.05em] uppercase text-foreground mt-3">
                  UNIQUE <span className="text-primary text-glow-yellow">IDENTITY</span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-body">
                  Komponen khas yang tidak ditemukan di design system manapun — murni identitas Endfield.
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
              { icon: Shield, title: "DEFENSE GRID", subtitle: "Clip-corner cards with holo scan", value: "A+" },
              { icon: Zap, title: "POWER OUTPUT", subtitle: "Diamond markers & glow effects", value: "847MW" },
              { icon: Radio, title: "COMMS ARRAY", subtitle: "Tactical HUD components", value: "12ch" },
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
                    <span className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-foreground">RADAR ANALYSIS</span>
                  </div>
                  <div className="flex justify-center">
                    <MiniRadar data={[
                      { label: "ATK", value: 85 }, { label: "DEF", value: 70 },
                      { label: "SPD", value: 92 }, { label: "RNG", value: 60 },
                      { label: "HP", value: 78 }, { label: "CRIT", value: 88 },
                    ]} />
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
                    FIELD <span className="text-primary text-glow-yellow">OPERATIVE</span>
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-2">CLEARANCE: ALPHA ◆ ALL SYSTEMS NOMINAL</p>
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
                <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-primary">◆ MODULES</span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.05em] uppercase text-foreground mt-3">COMPLETE ARSENAL</h2>
                <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-body">
                  Setiap aspek UI dirancang dengan presisi industrial. Dari fondasi token hingga pattern kompleks.
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
                      <h3 className="font-display text-sm font-bold tracking-[0.1em] uppercase text-foreground mt-4 mb-2">{f.title}</h3>
                      <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">{f.desc}</p>
                      <span className="font-mono text-[10px] text-primary/70 tracking-[0.1em] uppercase">{f.count}</span>
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
            <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-primary">◆ READY TO BUILD</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[0.05em] uppercase text-foreground mt-4 mb-6">
              START <span className="text-primary text-glow-yellow">EXPLORING</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-10 max-w-lg mx-auto">
              Akses seluruh 70+ section dokumentasi dengan live preview, interactive playground, dan signature components.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button onClick={() => navigate("/docs")} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                className="clip-corner-lg bg-primary text-primary-foreground font-ui text-sm tracking-[0.15em] uppercase px-12 py-5 hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-shadow duration-300">
                OPEN DOCUMENTATION ◆
              </motion.button>
              <motion.button onClick={() => navigate("/docs")} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                className="clip-corner-lg border border-border bg-surface-1 text-foreground font-ui text-sm tracking-[0.15em] uppercase px-12 py-5 hover:border-primary/50 transition-colors flex items-center gap-2 justify-center">
                SIGNATURE COMPONENTS <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-muted-foreground">Design System v2.0 — Complete Edition — February 2026</p>
          <p className="font-mono text-[10px] text-muted-foreground/50 mt-2">EF-SYS // ENDFIELD INDUSTRIES</p>
        </div>
      </footer>
    </div>
  );
};

// ─── HUD Frame (inline) ─────────────────────────
const HUDFrame = ({ children }: { children: React.ReactNode }) => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative border border-border bg-surface-0 aspect-video flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 scanline-overlay" />
      {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((pos, i) => (
        <div key={i} className={`absolute w-8 h-8 ${pos} border-primary/40 pointer-events-none`} />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-6 h-px bg-primary/20 absolute top-1/2 -left-3" />
        <div className="h-6 w-px bg-primary/20 absolute left-1/2 -top-3" />
      </div>
      <div className="absolute top-4 left-12 font-mono text-[9px] text-muted-foreground/60 space-y-0.5">
        <div>SYS::ENDFIELD v2.0</div>
        <div className="text-primary/60">{time}</div>
      </div>
      <div className="absolute top-4 right-12 font-mono text-[9px] text-muted-foreground/60 text-right space-y-0.5">
        <div>LAT 37.7749°N</div>
        <div>LON 122.4194°W</div>
      </div>
      <div className="absolute bottom-4 left-12 right-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-ef-green" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
          <span className="font-mono text-[9px] text-ef-green/80">LINK ACTIVE</span>
        </div>
        <div className="flex gap-4">
          {["FPS:60", "MEM:47%", "NET:12ms"].map(s => <span key={s} className="font-mono text-[9px] text-muted-foreground/50">{s}</span>)}
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default HomePage;
