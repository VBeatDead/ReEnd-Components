import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  Code2,
  BookOpen,
  Github,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Copy,
} from "lucide-react";
import { TopoBg, TacticalBadge } from "@/components/home/signature";
import { Particles } from "@/components/home/animations";
import { useStorytellingConfig } from "@/components/home/scroll-storytelling";

const ChapterDeploy = () => {
  const { isMobile, prefersReducedMotion } = useStorytellingConfig();
  const navigate = useNavigate();
  const { t } = useTranslation("home");
  const lp = useLocalizedPath();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Title zoom
  const titleScale = useTransform(smoothProgress, [0, 0.2], [0.85, 1]);
  const titleBlur = useTransform(smoothProgress, [0, 0.2], [4, 0]);
  const titleBlurFilter = useTransform(titleBlur, (v) => `blur(${v}px)`);
  const titleOpacity = useTransform(smoothProgress, [0, 0.12], [0.6, 1]);

  // Tagline
  const taglineOpacity = useTransform(smoothProgress, [0.1, 0.22], [0, 1]);
  const taglineY = useTransform(smoothProgress, [0.1, 0.22], [15, 0]);

  // Terminal section
  const terminalOpacity = useTransform(smoothProgress, [0.2, 0.35], [0, 1]);
  const terminalScale = useTransform(smoothProgress, [0.2, 0.35], [0.95, 1]);

  // Feature highlights
  const featuresOpacity = useTransform(smoothProgress, [0.35, 0.48], [0, 1]);

  // CTA buttons stagger
  const btn1Opacity = useTransform(smoothProgress, [0.48, 0.58], [0, 1]);
  const btn1Y = useTransform(smoothProgress, [0.48, 0.58], [20, 0]);

  const btn2Opacity = useTransform(smoothProgress, [0.54, 0.64], [0, 1]);
  const btn2Y = useTransform(smoothProgress, [0.54, 0.64], [20, 0]);

  const btn3Opacity = useTransform(smoothProgress, [0.6, 0.7], [0, 1]);
  const btn3Y = useTransform(smoothProgress, [0.6, 0.7], [20, 0]);

  // BG
  const bgOpacity = useTransform(smoothProgress, [0, 0.5], [0.05, 0.2]);
  const particleOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 0.6]);

  // Convergence lines
  const lineScale = useTransform(smoothProgress, [0, 0.35], [1.5, 1]);
  const lineOpacity = useTransform(smoothProgress, [0, 0.25], [0, 0.3]);

  // Tech footer
  const techOpacity = useTransform(smoothProgress, [0.65, 0.75], [0, 1]);

  const height = isMobile ? "200vh" : "300vh";

  return (
    <div
      ref={containerRef}
      id="chapter-deploy"
      className="relative"
      data-chapter
      aria-label={t("deploy.aria_label")}
      style={{ height }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Layered BG */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: bgOpacity }}
          >
            <TopoBg className="opacity-100" />
          </motion.div>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: particleOpacity }}
          >
            <Particles />
          </motion.div>

          {/* Convergence lines */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ scale: lineScale, opacity: lineOpacity }}
            >
              <ConvergenceLines />
            </motion.div>
          )}

          {/* Corner HUD */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {[
              "top-4 left-4 border-t border-l",
              "top-4 right-4 border-t border-r",
              "bottom-4 left-4 border-b border-l",
              "bottom-4 right-4 border-b border-r",
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute w-8 h-8 ${pos} border-primary/20`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div style={{ opacity: titleOpacity }}>
              <TacticalBadge>{t("deploy.operation_commence")}</TacticalBadge>
            </motion.div>

            {/* Title */}
            <motion.div
              className="mt-6"
              style={{
                scale: prefersReducedMotion ? 1 : titleScale,
                opacity: titleOpacity,
              }}
            >
              <motion.h2
                className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.05em] uppercase text-foreground"
                style={{
                  filter: prefersReducedMotion ? "none" : titleBlurFilter,
                }}
              >
                <span className="text-primary text-glow-yellow">
                  {t("deploy.deploy_title")}
                </span>
                <br />
                <span className="text-lg sm:text-2xl lg:text-3xl font-display tracking-[0.15em] text-muted-foreground">
                  {t("deploy.your_interface")}
                </span>
              </motion.h2>
            </motion.div>

            {/* Tagline */}
            <motion.p
              style={{ opacity: taglineOpacity, y: taglineY }}
              className="mt-4 font-body text-xs sm:text-sm text-muted-foreground/70 max-w-lg mx-auto leading-relaxed"
            >
              {t("deploy.description")}
            </motion.p>

            {/* Interactive Install Terminal */}
            <motion.div
              style={{ opacity: terminalOpacity, scale: terminalScale }}
              className="mt-8"
            >
              <InstallTerminal />
            </motion.div>

            {/* Quick features */}
            <motion.div
              style={{ opacity: featuresOpacity }}
              className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { label: t("deploy.feature_zero"), icon: "⚡" },
                { label: t("deploy.feature_ts"), icon: "◈" },
                { label: t("deploy.feature_tree"), icon: "◆" },
                { label: t("deploy.feature_theme"), icon: "◇" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="border border-border/40 bg-surface-1/30 backdrop-blur-sm px-3 py-2 text-center"
                >
                  <span className="text-primary text-sm">{f.icon}</span>
                  <p className="font-mono text-[9px] text-muted-foreground/60 mt-1 tracking-wider uppercase">
                    {f.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                style={{ opacity: btn1Opacity, y: btn1Y }}
                onClick={() => navigate(lp("/docs"))}
                className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground
                           px-6 py-3 font-display text-xs font-bold tracking-[0.15em] uppercase
                           hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:-translate-y-[1px] transition-all duration-300 clip-corner"
              >
                <BookOpen className="h-4 w-4" />
                {t("deploy.documentation")}
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                style={{ opacity: btn2Opacity, y: btn2Y }}
                onClick={() => navigate(lp("/docs/core-components"))}
                className="group flex items-center justify-center gap-2 border border-primary text-primary
                           px-6 py-3 font-display text-xs font-bold tracking-[0.15em] uppercase
                           hover:bg-primary/10 transition-all duration-300 clip-corner"
              >
                <Code2 className="h-4 w-4" />
                {t("deploy.components")}
              </motion.button>

              <motion.a
                style={{ opacity: btn3Opacity, y: btn3Y }}
                href="https://github.com/VBeatDead/ReEnd-Components"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 border border-border text-muted-foreground
                           px-6 py-3 font-display text-xs font-bold tracking-[0.15em] uppercase
                           hover:border-primary/50 hover:text-foreground transition-all duration-300 clip-corner"
              >
                <Github className="h-4 w-4" />
                {t("deploy.github")}
              </motion.a>
            </div>

            {/* Tech stack footer */}
            <motion.div style={{ opacity: techOpacity }} className="mt-10">
              <div className="gradient-line-h mb-4" />
              <div className="flex items-center justify-center gap-4 text-[9px] font-mono text-muted-foreground/40 tracking-wider">
                <span>REACT 18</span>
                <span className="text-primary/30">◆</span>
                <span>TAILWIND CSS</span>
                <span className="text-primary/30">◆</span>
                <span>FRAMER MOTION</span>
                <span className="text-primary/30">◆</span>
                <span>TYPESCRIPT</span>
                <span className="text-primary/30">◆</span>
                <span>RADIX UI</span>
              </div>
              <p className="font-mono text-[8px] text-muted-foreground/25 mt-3 tracking-wider">
                {t("deploy.open_source")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Interactive install terminal with animated typing and copy button */
const InstallTerminal = () => {
  const { t } = useTranslation("home");
  const [copied, setCopied] = useState(false);
  const [lines, setLines] = useState<{ text: string; type: string }[]>([]);
  const [step, setStep] = useState(0);

  const terminalSteps = [
    { text: "$ npx reend-components init", type: "command" },
    { text: t("deploy.term_detect"), type: "info" },
    { text: t("deploy.term_found"), type: "success" },
    { text: t("deploy.term_installing"), type: "info" },
    { text: t("deploy.term_tokens"), type: "success" },
    { text: t("deploy.term_theme"), type: "success" },
    { text: t("deploy.term_motion"), type: "success" },
    { text: t("deploy.term_ready"), type: "done" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= terminalSteps.length) return prev;
        setLines((l) => [...l, terminalSteps[prev]]);
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx reend-components init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-lg mx-auto border border-border bg-background/90 backdrop-blur-sm clip-corner overflow-hidden text-left">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-0/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div
              className="w-2.5 h-2.5 bg-ef-red/70"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
            <div
              className="w-2.5 h-2.5 bg-primary/50"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
            <div
              className="w-2.5 h-2.5 bg-ef-green/70"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
          </div>
          <div className="flex items-center gap-1.5 ml-3">
            <Terminal className="w-3 h-3 text-primary/60" />
            <span className="font-mono text-[9px] text-muted-foreground/60 tracking-wider uppercase">
              {t("deploy.terminal_title")}
            </span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-muted-foreground/40 hover:text-primary transition-colors"
        >
          {copied ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-ef-green" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span className="font-mono text-[8px] tracking-wider">
            {copied ? t("deploy.copied") : t("deploy.copy")}
          </span>
        </button>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-[11px] space-y-1 h-44 overflow-hidden">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={
                line.type === "command"
                  ? "text-foreground font-bold"
                  : line.type === "success"
                    ? "text-ef-green/80"
                    : line.type === "done"
                      ? "text-primary font-bold"
                      : "text-muted-foreground/60"
              }
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {step < terminalSteps.length && (
          <span className="inline-block w-1.5 h-3.5 bg-primary animate-cursor-blink" />
        )}
        {step >= terminalSteps.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary mt-2 text-xs"
          >
            <span className="text-ef-green">◆</span> {t("deploy.ready_deploy")}
          </motion.div>
        )}
      </div>
    </div>
  );
};

/** Radial lines converging toward center */
const ConvergenceLines = () => {
  const lines = 16;
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: lines }).map((_, i) => {
        const angle = (360 / lines) * i;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + Math.cos(rad) * 70;
        const y1 = 50 + Math.sin(rad) * 70;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={50}
            y2={50}
            stroke="currentColor"
            strokeWidth={0.12}
            className="text-primary/30"
          />
        );
      })}
      {/* Center diamond */}
      <path
        d="M 50 46 L 54 50 L 50 54 L 46 50 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={0.3}
        className="text-primary/20"
      />
    </svg>
  );
};

export default ChapterDeploy;
