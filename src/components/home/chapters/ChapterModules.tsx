import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type MotionValue,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Palette,
  Layers,
  BarChart3,
  Sparkles,
  LayoutGrid,
  MousePointerClick,
  MessageSquare,
  MonitorSmartphone,
  type LucideIcon,
  ChevronRight,
} from "lucide-react";
import { TopoBg, TacticalBadge } from "@/components/home/signature";
import { useStorytellingConfig } from "@/components/home/scroll-storytelling";

const features: {
  icon: LucideIcon;
  title: string;
  desc: string;
  count: string;
  slug: string;
  color: string;
  status: string;
}[] = [
  {
    icon: Palette,
    title: "FOUNDATIONS",
    desc: "Typography, color palette, spacing, and semantic design tokens for the Endfield aesthetic.",
    count: "12",
    slug: "foundations",
    color: "text-primary",
    status: "ACTIVE",
  },
  {
    icon: Layers,
    title: "CORE COMPONENTS",
    desc: "Buttons, Cards, Inputs, Dialogs — every element engineered with industrial precision.",
    count: "18",
    slug: "core-components",
    color: "text-ef-cyan",
    status: "ACTIVE",
  },
  {
    icon: BarChart3,
    title: "DATA DISPLAY",
    desc: "Tables, charts, badges, and status indicators for tactical data visualization.",
    count: "14",
    slug: "data-display",
    color: "text-ef-blue",
    status: "ACTIVE",
  },
  {
    icon: Sparkles,
    title: "ANIMATIONS",
    desc: "Parallax, glitch, glow, scroll-triggered motion systems — 8 animation primitives.",
    count: "8",
    slug: "animation",
    color: "text-ef-green",
    status: "ACTIVE",
  },
  {
    icon: LayoutGrid,
    title: "PATTERNS",
    desc: "Layout blueprints, form patterns, navigation structures for operator interfaces.",
    count: "10",
    slug: "patterns",
    color: "text-ef-orange",
    status: "ACTIVE",
  },
  {
    icon: MousePointerClick,
    title: "INTERACTIVE",
    desc: "Hover states, focus rings, transitions, micro-interactions tuned to 60fps.",
    count: "16",
    slug: "interactive",
    color: "text-ef-purple",
    status: "ACTIVE",
  },
  {
    icon: MessageSquare,
    title: "FEEDBACK",
    desc: "Toast, alert, dialog, loading — notification systems with tactical clarity.",
    count: "9",
    slug: "feedback",
    color: "text-ef-red",
    status: "ACTIVE",
  },
  {
    icon: MonitorSmartphone,
    title: "CONTENT & MEDIA",
    desc: "Image, video, carousel, avatar — media handling with responsive precision.",
    count: "11",
    slug: "content-media",
    color: "text-ef-cyan",
    status: "ACTIVE",
  },
];

const ChapterModules = () => {
  const { isMobile, prefersReducedMotion } = useStorytellingConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Title entrance
  const titleOpacity = useTransform(smoothProgress, [0, 0.08], [0.7, 1]);
  const titleY = useTransform(smoothProgress, [0, 0.08], [15, 0]);

  // Summary stats row
  const statsOpacity = useTransform(smoothProgress, [0.05, 0.12], [0, 1]);

  // Exit
  const exitScale = useTransform(smoothProgress, [0.88, 1], [1, 0.96]);
  const exitOpacity = useTransform(smoothProgress, [0.88, 1], [1, 0]);

  const height = isMobile ? "200vh" : "350vh";

  return (
    <div
      ref={containerRef}
      id="chapter-modules"
      className="relative"
      data-chapter
      aria-label="Chapter 4: Tactical Overview"
      style={{ height }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <motion.div
          style={{ scale: exitScale, opacity: exitOpacity }}
          className="flex-1 flex flex-col relative"
        >
          {/* BG */}
          <div className="absolute inset-0 pointer-events-none">
            <TopoBg className="opacity-10" />
            <HexagonPattern />
          </div>

          {/* Title */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center pt-6 pb-1 flex-shrink-0 relative z-10"
          >
            <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
              ◆ TACTICAL MAP
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.05em] uppercase text-foreground mt-2">
              SYSTEM{" "}
              <span className="text-primary text-glow-yellow">MODULES</span>
            </h2>
            <p className="font-mono text-[10px] text-muted-foreground/50 mt-1.5 tracking-[0.15em]">
              8 SECTORS · 98 COMPONENTS · FIELD READY
            </p>
          </motion.div>

          {/* Summary stats bar */}
          <motion.div
            style={{ opacity: statsOpacity }}
            className="flex items-center justify-center gap-6 py-2 relative z-10"
          >
            {[
              { label: "TOTAL", value: "98", color: "text-primary" },
              { label: "SECTORS", value: "8", color: "text-ef-cyan" },
              { label: "TOKENS", value: "94", color: "text-ef-blue" },
              { label: "THEMES", value: "2", color: "text-ef-green" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 font-mono text-[9px]"
              >
                <span
                  className={`font-display text-sm font-bold ${stat.color}`}
                >
                  {stat.value}
                </span>
                <span className="text-muted-foreground/40 tracking-[0.1em] uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Card grid */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl w-full">
              {features.map((feature, i) => (
                <FeatureCard
                  key={feature.slug}
                  feature={feature}
                  index={i}
                  progress={smoothProgress}
                  isMobile={isMobile}
                  reducedMotion={prefersReducedMotion}
                  onClick={() => navigate(`/docs/${feature.slug}`)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/** Subtle hexagon background pattern */
const HexagonPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.03]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="hex-pattern"
        width="56"
        height="100"
        patternUnits="userSpaceOnUse"
        patternTransform="scale(0.5)"
      >
        <path
          d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
        />
        <path
          d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex-pattern)" />
  </svg>
);

const FeatureCard = ({
  feature,
  index,
  progress,
  isMobile,
  reducedMotion,
  onClick,
}: {
  feature: (typeof features)[number];
  index: number;
  progress: MotionValue<number>;
  isMobile: boolean;
  reducedMotion: boolean;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  const staggerDelay = 0.06;
  const start = 0.12 + index * staggerDelay;
  const end = start + 0.1;

  const y = useTransform(progress, [start, end], [60, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.92, 1]);

  const Icon = feature.icon;

  const cardContent = (
    <>
      {/* Header with icon + count */}
      <div className="flex items-start justify-between mb-3">
        <div
          className={`p-2 border border-current/30 ${feature.color} group-hover:bg-current/10 transition-colors`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="text-right">
          <span className={`font-display text-lg font-bold ${feature.color}`}>
            {feature.count}
          </span>
          <p className="font-mono text-[8px] text-muted-foreground/40 tracking-wider">
            ITEMS
          </p>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-[11px] font-bold tracking-[0.1em] uppercase text-foreground mb-1.5">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="font-mono text-[10px] text-muted-foreground leading-relaxed mb-3">
        {feature.desc}
      </p>

      {/* Status + action */}
      <div className="flex items-center justify-between mt-auto">
        <TacticalBadge variant="success">{feature.status}</TacticalBadge>
        <div className="flex items-center gap-1 text-primary/60 group-hover:text-primary transition-colors">
          <span className="font-mono text-[8px] tracking-wider uppercase">
            DEPLOY
          </span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-700" />
    </>
  );

  if (reducedMotion) {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className="group relative clip-corner border border-border bg-surface-1 p-4 cursor-pointer
                   hover:border-primary/30 transition-all duration-300 overflow-hidden"
      >
        {cardContent}
      </div>
    );
  }

  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="group relative clip-corner border border-border bg-surface-1 p-4 cursor-pointer
                   hover:border-primary/30 transition-all duration-300 overflow-hidden"
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      onClick={onClick}
      className="group relative clip-corner border border-border bg-surface-1 p-4 cursor-pointer
                 hover:border-primary/30 transition-all duration-300 overflow-hidden"
    >
      {cardContent}
    </motion.div>
  );
};

export default ChapterModules;
