import { motion, useTransform, type MotionValue } from "framer-motion";
import { Box, Layers, Palette, Sparkles, Shield, Zap } from "lucide-react";
import {
  ScrollPinSection,
  ParallaxDepth,
  ScrollCounter,
  ScrollFade,
  useStorytellingConfig,
} from "@/components/home/scroll-storytelling";
import { TopoBg, MiniRadar, HoloCard } from "@/components/home/signature";

const radarData = [
  { label: "UI", value: 95 },
  { label: "A11Y", value: 80 },
  { label: "PERF", value: 90 },
  { label: "THEME", value: 85 },
  { label: "ANIM", value: 92 },
  { label: "DX", value: 88 },
];

const philosophyWords = [
  "Industrial",
  "precision",
  "meets",
  "digital",
  "craftsmanship.",
  "Every",
  "pixel",
  "engineered.",
  "Every",
  "interaction",
  "deliberate.",
  "Built",
  "for",
  "operators",
  "who",
  "demand",
  "excellence.",
];

const designPrinciples = [
  {
    icon: Shield,
    title: "TACTICAL PRECISION",
    subtitle: "Pixel-perfect components with zero visual noise",
  },
  {
    icon: Zap,
    title: "ZERO LATENCY",
    subtitle: "60fps animations, lazy-loaded, tree-shakeable",
  },
  {
    icon: Palette,
    title: "DARK-FIRST",
    subtitle: "94 design tokens, full light + dark theme support",
  },
  {
    icon: Sparkles,
    title: "MOTION SYSTEM",
    subtitle: "8 scroll primitives, parallax, glitch, glow effects",
  },
  {
    icon: Layers,
    title: "COMPOSABLE",
    subtitle: "Radix UI primitives, fully customizable via Tailwind",
  },
  {
    icon: Box,
    title: "PRODUCTION READY",
    subtitle: "TypeScript-first, accessible, thoroughly tested",
  },
];

const ChapterSystemOnline = () => {
  const { prefersReducedMotion } = useStorytellingConfig();

  return (
    <ScrollPinSection height="400vh" mobileHeight="250vh" id="chapter-system">
      {(progress) => (
        <section
          className="relative h-full flex items-center justify-center overflow-hidden"
          data-chapter
          aria-label="Chapter 2: System Online"
        >
          {/* BG Layer */}
          <ParallaxDepth
            progress={progress}
            layer="background"
            className="absolute inset-0"
          >
            <TopoBg className="opacity-30" />
            <DiamondGrid progress={progress} />
          </ParallaxDepth>

          {/* Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
            <div className="space-y-12">
              {/* Section title */}
              <ScrollFade progress={progress} from={0} to={0.06}>
                <div className="text-center">
                  <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
                    ◆ DIAGNOSTIC SCAN
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.05em] uppercase text-foreground mt-3">
                    SYSTEM{" "}
                    <span className="text-primary text-glow-yellow">
                      ONLINE
                    </span>
                  </h2>
                  <p className="font-mono text-[10px] text-muted-foreground/50 mt-2 tracking-[0.15em]">
                    ALL SUBSYSTEMS OPERATIONAL — SCANNING CAPABILITIES
                  </p>
                </div>
              </ScrollFade>

              {/* Stats row + Radar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Stats counters — left */}
                <div className="grid grid-cols-2 gap-6">
                  <CounterReveal
                    progress={progress}
                    value={70}
                    label="Components"
                    index={0}
                    suffix="+"
                  />
                  <CounterReveal
                    progress={progress}
                    value={11}
                    label="Categories"
                    index={1}
                    suffix=""
                  />
                  <CounterReveal
                    progress={progress}
                    value={94}
                    label="Design Tokens"
                    index={2}
                    suffix=""
                  />
                  <CounterReveal
                    progress={progress}
                    value={8}
                    label="Motion Systems"
                    index={3}
                    suffix=""
                  />
                </div>

                {/* Radar chart — center */}
                <RadarReveal progress={progress} />

                {/* Status panel — right */}
                <StatusPanel progress={progress} />
              </div>

              {/* Design principles — HoloCards */}
              <PrinciplesGrid progress={progress} />

              {/* Philosophy text */}
              <PhilosophyText
                progress={progress}
                reduced={prefersReducedMotion}
              />
            </div>
          </div>

          {/* Section fade out */}
          <SectionFadeOut progress={progress} />
        </section>
      )}
    </ScrollPinSection>
  );
};

// ═══ Sub-components ═══

const CounterReveal = ({
  progress,
  value,
  label,
  index,
  suffix = "+",
}: {
  progress: MotionValue<number>;
  value: number;
  label: string;
  index: number;
  suffix?: string;
}) => {
  const start = 0.06 + index * 0.04;
  const end = start + 0.18;
  const opacity = useTransform(progress, [start, start + 0.06], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.06], [0.85, 1]);
  const y = useTransform(progress, [start, start + 0.06], [15, 0]);

  return (
    <motion.div style={{ opacity, scale, y }}>
      <ScrollCounter
        progress={progress}
        value={value}
        from={start}
        to={end}
        label={label}
        suffix={suffix}
      />
    </motion.div>
  );
};

const RadarReveal = ({ progress }: { progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0.1, 0.2], [0, 1]);
  const scale = useTransform(progress, [0.1, 0.2], [0.8, 1]);

  return (
    <motion.div style={{ opacity, scale }} className="flex justify-center">
      <div className="relative">
        <MiniRadar data={radarData} size={220} />
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          <span className="font-mono text-[8px] text-muted-foreground/40 tracking-[0.15em] uppercase">
            CAPABILITY INDEX
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const StatusPanel = ({ progress }: { progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0.12, 0.22], [0, 1]);
  const x = useTransform(progress, [0.12, 0.22], [20, 0]);

  const statuses = [
    { label: "THEME ENGINE", status: "ACTIVE", color: "text-ef-green" },
    { label: "MOTION PIPELINE", status: "60 FPS", color: "text-ef-cyan" },
    { label: "TYPE SAFETY", status: "STRICT", color: "text-ef-blue" },
    { label: "ACCESSIBILITY", status: "WCAG 2.1", color: "text-ef-green" },
    { label: "BUNDLE SIZE", status: "OPTIMAL", color: "text-primary" },
    { label: "TREE SHAKING", status: "ENABLED", color: "text-ef-green" },
  ];

  return (
    <motion.div
      style={{ opacity, x }}
      className="border border-border/50 bg-surface-1/50 backdrop-blur-sm clip-corner overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50 bg-surface-0/50">
        <div
          className="w-1.5 h-1.5 bg-ef-green animate-pulse"
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
        />
        <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-[0.1em]">
          SUBSYSTEM STATUS
        </span>
      </div>
      <div className="p-3 space-y-2">
        {statuses.map((s, i) => (
          <div
            key={i}
            className="flex items-center justify-between font-mono text-[10px]"
          >
            <span className="text-muted-foreground/60">{s.label}</span>
            <span className={`${s.color} flex items-center gap-1`}>
              <span
                className="w-1 h-1 bg-current"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const PrinciplesGrid = ({ progress }: { progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0.28, 0.38], [0, 1]);

  return (
    <motion.div style={{ opacity }}>
      <div className="text-center mb-6">
        <span className="font-mono text-[9px] text-muted-foreground/50 tracking-[0.2em] uppercase">
          ◆ DESIGN PRINCIPLES ◆
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {designPrinciples.map((p, i) => (
          <PrincipleCard key={i} principle={p} index={i} progress={progress} />
        ))}
      </div>
    </motion.div>
  );
};

const PrincipleCard = ({
  principle,
  index,
  progress,
}: {
  principle: (typeof designPrinciples)[number];
  index: number;
  progress: MotionValue<number>;
}) => {
  const start = 0.32 + index * 0.04;
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const y = useTransform(progress, [start, start + 0.08], [30, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <HoloCard
        icon={principle.icon}
        title={principle.title}
        subtitle={principle.subtitle}
      />
    </motion.div>
  );
};

const PhilosophyText = ({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) => {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="gradient-line-h mb-6" />
      <p className="font-body text-base sm:text-lg leading-relaxed">
        {philosophyWords.map((word, i) => (
          <PhilosophyWord
            key={`${word}-${i}`}
            progress={progress}
            word={word}
            index={i}
            total={philosophyWords.length}
            reduced={reduced}
          />
        ))}
      </p>
      <div className="gradient-line-h mt-6" />
    </div>
  );
};

const PhilosophyWord = ({
  progress,
  word,
  index,
  total,
  reduced,
}: {
  progress: MotionValue<number>;
  word: string;
  index: number;
  total: number;
  reduced: boolean;
}) => {
  const start = 0.6 + (index / total) * 0.2;
  const end = start + 0.04;
  const opacity = useTransform(
    progress,
    [start, end],
    reduced ? [1, 1] : [0.15, 1],
  );
  const isHighlight =
    word.includes("precision") ||
    word.includes("engineered") ||
    word.includes("deliberate") ||
    word.includes("operators") ||
    word.includes("excellence");
  const color = isHighlight ? "text-primary" : "text-muted-foreground";

  return (
    <motion.span
      style={{ opacity }}
      className={`${color} inline-block mr-[0.3em]`}
    >
      {word}
    </motion.span>
  );
};

const DiamondGrid = ({ progress }: { progress: MotionValue<number> }) => {
  const pathLength = useTransform(progress, [0.4, 0.7], [0, 1]);
  const gridOpacity = useTransform(
    progress,
    [0.35, 0.45, 0.8, 0.9],
    [0, 0.15, 0.15, 0],
  );

  return (
    <motion.div
      style={{ opacity: gridOpacity }}
      className="absolute inset-0 pointer-events-none"
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        {Array.from({ length: 8 }, (_, i) => {
          const x = 100 + i * 100;
          return (
            <motion.line
              key={`v-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={600}
              stroke="hsl(var(--primary))"
              strokeWidth={0.5}
              style={{ pathLength }}
            />
          );
        })}
        {Array.from({ length: 6 }, (_, i) => {
          const y = 100 + i * 100;
          return (
            <motion.line
              key={`h-${i}`}
              x1={0}
              y1={y}
              x2={800}
              y2={y}
              stroke="hsl(var(--primary))"
              strokeWidth={0.5}
              style={{ pathLength }}
            />
          );
        })}
        {[
          [200, 200],
          [400, 200],
          [600, 200],
          [300, 300],
          [500, 300],
          [200, 400],
          [400, 400],
          [600, 400],
        ].map(([cx, cy], i) => (
          <motion.path
            key={`d-${i}`}
            d={`M ${cx} ${cy! - 8} L ${cx! + 8} ${cy} L ${cx} ${cy! + 8} L ${cx! - 8} ${cy} Z`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={1}
            style={{ pathLength }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

const SectionFadeOut = ({ progress }: { progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0.88, 1], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 bg-background pointer-events-none z-20"
    />
  );
};

export default ChapterSystemOnline;
