import { motion, useTransform, type MotionValue } from "framer-motion";
import { Box, Layers, Palette, Sparkles, Shield, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
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

const capabilityIcons = [Shield, Zap, Palette, Sparkles, Layers, Box];
const capabilityKeys = [
  "tactical",
  "latency",
  "dark",
  "motion",
  "composable",
  "production",
] as const;

const ChapterSystemOnline = () => {
  const { prefersReducedMotion } = useStorytellingConfig();
  const { t } = useTranslation("home");

  return (
    <ScrollPinSection height="400vh" mobileHeight="250vh" id="chapter-system">
      {(progress) => (
        <section
          className="relative h-full flex items-center justify-center overflow-hidden"
          data-chapter
          aria-label={t("system_online.aria_label")}
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
                    {t("system_online.diagnostic")}
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.05em] uppercase text-foreground mt-3">
                    {t("system_online.system")}
                    <span className="text-primary text-glow-yellow">
                      {t("system_online.online")}
                    </span>
                  </h2>
                  <p className="font-mono text-[10px] text-muted-foreground/50 mt-2 tracking-[0.15em]">
                    {t("system_online.all_subsystems")}
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
                    label={t("system_online.counter_components")}
                    index={0}
                    suffix="+"
                  />
                  <CounterReveal
                    progress={progress}
                    value={11}
                    label={t("system_online.counter_categories")}
                    index={1}
                    suffix=""
                  />
                  <CounterReveal
                    progress={progress}
                    value={94}
                    label={t("system_online.counter_tokens")}
                    index={2}
                    suffix=""
                  />
                  <CounterReveal
                    progress={progress}
                    value={8}
                    label={t("system_online.counter_motions")}
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
              <PrinciplesGrid progress={progress} t={t} />

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
  const { t } = useTranslation("home");
  const opacity = useTransform(progress, [0.1, 0.2], [0, 1]);
  const scale = useTransform(progress, [0.1, 0.2], [0.8, 1]);

  return (
    <motion.div style={{ opacity, scale }} className="flex justify-center">
      <div className="relative">
        <MiniRadar data={radarData} size={220} />
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          <span className="font-mono text-[8px] text-muted-foreground/40 tracking-[0.15em] uppercase">
            {t("system_online.capability_index")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const StatusPanel = ({ progress }: { progress: MotionValue<number> }) => {
  const { t } = useTranslation("home");
  const opacity = useTransform(progress, [0.12, 0.22], [0, 1]);
  const x = useTransform(progress, [0.12, 0.22], [20, 0]);

  const statuses = [
    {
      label: t("system_online.status_theme_label"),
      status: t("system_online.status_theme_value"),
      color: "text-ef-green",
    },
    {
      label: t("system_online.status_motion_label"),
      status: t("system_online.status_motion_value"),
      color: "text-ef-cyan",
    },
    {
      label: t("system_online.status_type_label"),
      status: t("system_online.status_type_value"),
      color: "text-ef-blue",
    },
    {
      label: t("system_online.status_a11y_label"),
      status: t("system_online.status_a11y_value"),
      color: "text-ef-green",
    },
    {
      label: t("system_online.status_bundle_label"),
      status: t("system_online.status_bundle_value"),
      color: "text-primary",
    },
    {
      label: t("system_online.status_tree_label"),
      status: t("system_online.status_tree_value"),
      color: "text-ef-green",
    },
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
          {t("system_online.subsystem_status")}
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

const PrinciplesGrid = ({
  progress,
  t,
}: {
  progress: MotionValue<number>;
  t: TFunction;
}) => {
  const opacity = useTransform(progress, [0.28, 0.38], [0, 1]);

  const designPrinciples = capabilityKeys.map((key, i) => ({
    icon: capabilityIcons[i],
    title: t(`system_online.capabilities.${key}_title`),
    subtitle: t(`system_online.capabilities.${key}_desc`),
  }));

  return (
    <motion.div style={{ opacity }}>
      <div className="text-center mb-6">
        <span className="font-mono text-[9px] text-muted-foreground/50 tracking-[0.2em] uppercase">
          {t("system_online.design_principles")}
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
  principle: { icon: typeof Shield; title: string; subtitle: string };
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
  const { t } = useTranslation("home");
  const words = t("system_online.philosophy").split(/\s+/);
  const highlights = t("system_online.philosophy_highlights").split(",");

  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="gradient-line-h mb-6" />
      <p className="font-body text-base sm:text-lg leading-relaxed">
        {words.map((word, i) => (
          <PhilosophyWord
            key={`${word}-${i}`}
            progress={progress}
            word={word}
            index={i}
            total={words.length}
            reduced={reduced}
            highlights={highlights}
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
  highlights,
}: {
  progress: MotionValue<number>;
  word: string;
  index: number;
  total: number;
  reduced: boolean;
  highlights: string[];
}) => {
  const start = 0.6 + (index / total) * 0.2;
  const end = start + 0.04;
  const opacity = useTransform(
    progress,
    [start, end],
    reduced ? [1, 1] : [0.15, 1],
  );
  const isHighlight = highlights.some((h) =>
    word.toLowerCase().includes(h.toLowerCase()),
  );
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
