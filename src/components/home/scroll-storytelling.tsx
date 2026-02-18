import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useTranslation } from "react-i18next";

// ═══ MOTION CONFIG ═══
export const MOTION_CONFIG = {
  scrollSpring: { stiffness: 100, damping: 30, restDelta: 0.001 },
  easeOut: [0.25, 0.8, 0.25, 1] as const,
  easeInOut: [0.65, 0, 0.35, 1] as const,
  layerSpeed: {
    background: 0.2,
    midground: 0.5,
    foreground: 1.0,
  },
} as const;

// ═══ RESPONSIVE HOOK ═══
export const useStorytellingConfig = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return {
    isMobile,
    isTablet,
    prefersReducedMotion: !!prefersReducedMotion,
    parallaxIntensity: prefersReducedMotion ? 0 : isMobile ? 0.3 : 1,
    enableHorizontalScroll: !isMobile,
    particleCount: isMobile ? 8 : 20,
    enableTiltCard: !isMobile,
  };
};

// ═══ SCROLL PIN SECTION ═══
// Creates a tall scroll container with a sticky viewport inside.
// scrollYProgress goes 0→1 as user scrolls through the container.
export const ScrollPinSection = ({
  children,
  height = "300vh",
  mobileHeight,
  className = "",
  id,
}: {
  children: (progress: MotionValue<number>) => React.ReactNode;
  height?: string;
  mobileHeight?: string;
  className?: string;
  id?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, MOTION_CONFIG.scrollSpring);
  const { isMobile } = useStorytellingConfig();
  const resolvedHeight = isMobile && mobileHeight ? mobileHeight : height;

  return (
    <div
      ref={containerRef}
      id={id}
      style={{ height: resolvedHeight }}
      className={`relative ${className}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {children(smoothProgress)}
      </div>
    </div>
  );
};

// ═══ PARALLAX DEPTH ═══
// Multi-layer parallax within a sticky section.
// Uses CENTERED bidirectional movement so layers float around their natural position.
// Foreground content has NO y-drift (its own scroll transforms handle positioning).
export const ParallaxDepth = ({
  progress,
  layer,
  intensity = 1,
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  layer: "background" | "midground" | "foreground";
  intensity?: number;
  children: React.ReactNode;
  className?: string;
}) => {
  const prefersReducedMotion = useReducedMotion();
  // Centered parallax: starts slightly below, ends slightly above.
  // Background moves the LEAST (far away = less perceived motion).
  // Foreground has NO drift — its own scroll-linked transforms handle positioning.
  const ranges = {
    background: { from: 30 * intensity, to: -30 * intensity },
    midground: { from: 15 * intensity, to: -15 * intensity },
    foreground: { from: 0, to: 0 },
  };
  const { from: yFrom, to: yTo } = ranges[layer];
  const y = useTransform(
    progress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [yFrom, yTo],
  );

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// ═══ SCROLL FADE ═══
// Opacity fade linked to scroll progress
export const ScrollFade = ({
  progress,
  from = 0,
  to = 1,
  fadeIn = true,
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  from?: number;
  to?: number;
  fadeIn?: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  const opacity = useTransform(progress, [from, to], fadeIn ? [0, 1] : [1, 0]);
  return (
    <motion.div style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// ═══ SCROLL SCALE ═══
export const ScrollScale = ({
  progress,
  from = 0,
  to = 1,
  scaleFrom = 0.8,
  scaleTo = 1,
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  from?: number;
  to?: number;
  scaleFrom?: number;
  scaleTo?: number;
  children: React.ReactNode;
  className?: string;
}) => {
  const scale = useTransform(progress, [from, to], [scaleFrom, scaleTo]);
  const opacity = useTransform(
    progress,
    [from, from + (to - from) * 0.3],
    [0, 1],
  );
  return (
    <motion.div style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// ═══ SCROLL CLIP REVEAL ═══
export const ScrollRevealClip = ({
  progress,
  from = 0,
  to = 1,
  direction = "left",
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  from?: number;
  to?: number;
  direction?: "left" | "right" | "top" | "bottom" | "center";
  children: React.ReactNode;
  className?: string;
}) => {
  const clipPaths: Record<string, [string, string]> = {
    left: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
    right: ["inset(0 0 0 100%)", "inset(0 0 0 0%)"],
    top: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
    bottom: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
    center: ["inset(0 50% 0 50%)", "inset(0 0% 0 0%)"],
  };
  const clipPath = useTransform(progress, [from, to], clipPaths[direction]);
  return (
    <motion.div style={{ clipPath }} className={className}>
      {children}
    </motion.div>
  );
};

// ═══ SCROLL BLUR ═══
export const ScrollBlur = ({
  progress,
  from = 0,
  to = 1,
  blurFrom = 20,
  blurTo = 0,
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  from?: number;
  to?: number;
  blurFrom?: number;
  blurTo?: number;
  children: React.ReactNode;
  className?: string;
}) => {
  const filter = useTransform(
    progress,
    [from, to],
    [`blur(${blurFrom}px)`, `blur(${blurTo}px)`],
  );
  return (
    <motion.div style={{ filter }} className={className}>
      {children}
    </motion.div>
  );
};

// ═══ SCROLL COUNTER ═══
// Counter that counts based on scroll progress instead of timer
export const ScrollCounter = ({
  progress,
  value,
  from = 0,
  to = 1,
  label,
  suffix = "+",
}: {
  progress: MotionValue<number>;
  value: number;
  from?: number;
  to?: number;
  label: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const mappedProgress = useTransform(progress, [from, to], [0, 1]);

  useMotionValueEvent(mappedProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    const eased = 1 - Math.pow(1 - clamped, 3);
    setCount(Math.round(eased * value));
  });

  return (
    <div className="text-center">
      <span className="font-display text-3xl sm:text-4xl font-bold text-primary">
        {count}
        {suffix}
      </span>
      <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-2">
        {label}
      </p>
    </div>
  );
};

// ═══ CHAPTER INDICATOR ═══
// Sidebar navigation dots showing current chapter
export const ChapterIndicator = ({
  chapters,
  labels,
}: {
  chapters: number;
  labels?: string[];
}) => {
  const { t } = useTranslation("home");
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(chapters - 1, Math.floor(v * chapters));
    setActive(idx);
  });

  const defaultLabels = ["I", "II", "III", "IV", "V"];
  const displayLabels = labels || defaultLabels;

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      {Array.from({ length: chapters }, (_, i) => (
        <button
          key={i}
          onClick={() => {
            const sections = document.querySelectorAll("[data-chapter]");
            sections[i]?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group relative flex items-center justify-center"
          aria-label={t("scroll.chapter_label", { number: i + 1 })}
        >
          {/* Label — positioned absolutely so it doesn't shift the dot */}
          <span
            className={`hidden sm:block absolute right-full mr-2 font-mono text-[9px] tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 ${
              active === i
                ? "text-primary opacity-100"
                : "text-muted-foreground/40 opacity-0 group-hover:opacity-100"
            }`}
          >
            {displayLabels[i]}
          </span>
          <div
            className={`w-2 h-2 transition-all duration-300 ${
              active === i
                ? "bg-primary scale-125 shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                : "bg-muted-foreground/30 scale-100 hover:bg-muted-foreground/60"
            }`}
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          />
        </button>
      ))}
    </div>
  );
};

// ═══ HORIZONTAL SCROLL SECTION ═══
export const HorizontalScrollSection = ({
  children,
  height = "400vh",
  mobileHeight = "auto",
  className = "",
  id,
}: {
  children: React.ReactNode;
  height?: string;
  mobileHeight?: string;
  className?: string;
  id?: string;
}) => {
  const { t } = useTranslation("home");
  const { isMobile } = useStorytellingConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, MOTION_CONFIG.scrollSpring);
  const x = useTransform(smoothProgress, [0.05, 0.95], ["0%", "-80%"]);
  const progressBar = useTransform(smoothProgress, [0.05, 0.95], [0, 1]);

  if (isMobile) {
    return (
      <div id={id} className={className} data-chapter>
        <div className="px-4 py-16 space-y-6">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={id}
      style={{ height }}
      className={`relative ${className}`}
      data-chapter
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full items-center gap-8 px-[10vw]"
          >
            {children}
          </motion.div>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48">
          <div className="h-[2px] bg-border overflow-hidden">
            <motion.div
              className="h-full bg-primary origin-left"
              style={{ scaleX: progressBar }}
            />
          </div>
          <p className="font-mono text-[9px] text-muted-foreground/50 text-center mt-2 tracking-[0.1em]">
            {t("scroll.scroll_to_explore")}
          </p>
        </div>
      </div>
    </div>
  );
};
