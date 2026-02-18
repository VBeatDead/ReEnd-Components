import {
  motion,
  useTransform,
  type MotionValue,
  AnimatePresence,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { Particles } from "@/components/home/animations";
import { GlitchText, TopoBg, TacticalBadge } from "@/components/home/signature";
import {
  ScrollPinSection,
  ParallaxDepth,
  useStorytellingConfig,
} from "@/components/home/scroll-storytelling";

const EASE = [0.25, 0.8, 0.25, 1] as const;

const ChapterAwakening = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("home");
  const lp = useLocalizedPath();
  const { prefersReducedMotion } = useStorytellingConfig();

  return (
    <ScrollPinSection
      height="150vh"
      mobileHeight="130vh"
      id="chapter-awakening"
    >
      {(progress) => {
        return (
          <SectionFadeOut
            progress={progress}
            reducedMotion={prefersReducedMotion}
          >
            <section
              className="relative h-full flex items-center justify-center overflow-hidden"
              data-chapter
              aria-label={t("awakening.aria_label")}
            >
              {/* BG Layer: TopoBg + gradient */}
              <ParallaxDepth
                progress={progress}
                layer="background"
                className="absolute inset-0"
              >
                <TopoBg />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
              </ParallaxDepth>

              {/* MG Layer: Particles + scanlines */}
              <ParallaxDepth
                progress={progress}
                layer="midground"
                className="absolute inset-0"
              >
                <Particles />
                <div className="absolute inset-0 scanline-overlay" />
              </ParallaxDepth>

              {/* HUD Corner Brackets */}
              <HUDCorners reduced={prefersReducedMotion} />

              {/* HUD Status — top */}
              <HUDStatusBar />

              {/* FG Layer: Content */}
              <ParallaxDepth
                progress={progress}
                layer="foreground"
                className="relative z-10 text-center px-6 max-w-4xl mx-auto"
              >
                {/* System init badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <TacticalBadge variant="success">
                    {t("awakening.system_init")}
                  </TacticalBadge>
                </motion.div>

                {/* Protocol identifier */}
                <InitSequence reduced={prefersReducedMotion} />

                {/* Title with zoom + blur */}
                <TitleZoom reduced={prefersReducedMotion}>
                  <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl font-bold tracking-[0.06em] uppercase mt-6 mb-2">
                    <GlitchText text="ReEnd" />
                  </h1>
                </TitleZoom>

                {/* COMPONENTS text with clipPath wipe */}
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                >
                  <p className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold tracking-[0.06em] uppercase text-primary text-glow-yellow">
                    {t("awakening.components")}
                  </p>
                </motion.div>

                {/* Subtitle — Arknights themed */}
                <DescriptionFade>
                  <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mt-4 font-body leading-relaxed tracking-wide">
                    <span className="text-primary">
                      {t("awakening.description_accent")}
                    </span>{" "}
                    {t("awakening.description_text")}{" "}
                    <span className="text-foreground">
                      {t("awakening.description_highlight")}
                    </span>
                    {t("awakening.description_suffix")}
                  </p>
                </DescriptionFade>

                {/* CTA Buttons */}
                <CTAButtons navigate={navigate} lp={lp} t={t} />

                {/* Tech stack — tactical style */}
                <TechStack />
              </ParallaxDepth>

              {/* Boot Log — bottom left */}
              <BootLog progress={progress} reduced={prefersReducedMotion} />

              {/* Scroll indicator */}
              <ScrollIndicator progress={progress} />

              {/* HUD bottom status */}
              <HUDBottomBar />
            </section>
          </SectionFadeOut>
        );
      }}
    </ScrollPinSection>
  );
};

// ═══ HUD ELEMENTS ═══

const HUDCorners = ({ reduced }: { reduced: boolean }) => {
  const positions = [
    "top-6 left-6 border-t-2 border-l-2",
    "top-6 right-6 border-t-2 border-r-2",
    "bottom-6 left-6 border-b-2 border-l-2",
    "bottom-6 right-6 border-b-2 border-r-2",
  ];

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, scale: 1.1 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 z-20 pointer-events-none"
    >
      {positions.map((pos, i) => (
        <div
          key={i}
          className={`absolute w-12 h-12 ${pos} border-primary/40`}
        />
      ))}
    </motion.div>
  );
};

const HUDStatusBar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="absolute top-8 left-8 right-8 z-20 flex items-start justify-between pointer-events-none"
    >
      <div className="font-mono text-[9px] text-muted-foreground/50 space-y-1">
        <div>
          SYS::ENDFIELD <span className="text-primary/60">v2.0</span>
        </div>
        <div className="text-primary/50">{time}</div>
      </div>
      <div className="font-mono text-[9px] text-muted-foreground/50 text-right space-y-1">
        <div>PROTOCOL::DESIGN_SYSTEM</div>
        <div className="flex items-center gap-1.5 justify-end">
          <div
            className="w-1.5 h-1.5 bg-ef-green animate-pulse"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          />
          <span className="text-ef-green/80">LINK ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
};

const HUDBottomBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="absolute bottom-6 left-8 right-8 z-20 flex items-end justify-between pointer-events-none"
    >
      <div className="flex gap-4">
        {["FPS:60", "MEM:47%", "NET:12ms"].map((s) => (
          <span
            key={s}
            className="font-mono text-[9px] text-muted-foreground/40"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="font-mono text-[9px] text-muted-foreground/40">
        LAT 37.7749°N · LON 122.4194°W
      </div>
    </motion.div>
  );
};

const InitSequence = ({ reduced }: { reduced: boolean }) => {
  const { t } = useTranslation("home");
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-4"
    >
      <span className="font-mono text-[10px] text-muted-foreground/60 tracking-[0.25em] uppercase">
        {t("awakening.protocol_label")}
      </span>
    </motion.div>
  );
};

const BootLog = ({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) => {
  const exitOpacity = useTransform(progress, [0.5, 0.7], [1, 0]);
  const { t } = useTranslation("home");
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (reduced) return;
    const msgs = [
      t("awakening.boot_log_0"),
      t("awakening.boot_log_1"),
      t("awakening.boot_log_2"),
      t("awakening.boot_log_3"),
      t("awakening.boot_log_4"),
      t("awakening.boot_log_5"),
      t("awakening.boot_log_6"),
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, msgs[i % msgs.length]];
        return next.length > 5 ? next.slice(-5) : next;
      });
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, [reduced, t]);

  return (
    <motion.div
      style={{ opacity: exitOpacity }}
      className="absolute bottom-16 left-6 z-20 w-72 hidden lg:block"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <div className="border border-border/50 bg-background/80 backdrop-blur-sm clip-corner overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/50 bg-surface-0/50">
            <div
              className="w-1.5 h-1.5 bg-ef-green animate-pulse"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
            <span className="font-mono text-[8px] text-muted-foreground/60 uppercase tracking-[0.1em]">
              {t("awakening.system_log")}
            </span>
          </div>
          <div className="p-2 font-mono text-[10px] space-y-0.5 h-24 overflow-hidden">
            <AnimatePresence>
              {lines.map((line, i) => (
                <motion.div
                  key={`${line}-${i}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    line.includes("[AUTH]")
                      ? "text-ef-green/80"
                      : line.includes("[NET]")
                        ? "text-ef-blue/80"
                        : line.includes("[GPU]")
                          ? "text-ef-cyan/80"
                          : "text-muted-foreground/60"
                  }
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
            <span className="inline-block w-1.5 h-3 bg-primary/60 animate-cursor-blink" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ═══ CONTENT SUB-COMPONENTS ═══

const SectionFadeOut = ({
  progress,
  reducedMotion,
  children,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  children: React.ReactNode;
}) => {
  const opacity = useTransform(
    progress,
    [0.5, 0.85],
    reducedMotion ? [1, 1] : [1, 0],
  );
  const scale = useTransform(
    progress,
    [0.5, 0.85],
    reducedMotion ? [1, 1] : [1, 0.97],
  );

  return (
    <motion.div style={{ opacity, scale }} className="h-full">
      {children}
    </motion.div>
  );
};

const TitleZoom = ({
  reduced,
  children,
}: {
  reduced: boolean;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={
        reduced ? undefined : { scale: 1.1, opacity: 0.85, filter: "blur(3px)" }
      }
      animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

const DescriptionFade = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

const CTAButtons = ({
  navigate,
  lp,
  t,
}: {
  navigate: ReturnType<typeof useNavigate>;
  lp: (path: string) => string;
  t: (key: string) => string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
    >
      <button
        onClick={() => navigate(lp("/docs"))}
        className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:brightness-110 hover:-translate-y-[1px] transition-all duration-300"
      >
        {t("awakening.cta_docs")}
      </button>
      <button
        onClick={() =>
          document
            .getElementById("chapter-arsenal")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="clip-corner border border-border bg-surface-1 text-foreground font-display text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:border-primary/50 transition-colors duration-300"
      >
        {t("awakening.cta_preview")}
      </button>
    </motion.div>
  );
};

const TechStack = () => {
  const techs = [
    { label: "REACT 18", color: "text-ef-cyan" },
    { label: "TYPESCRIPT", color: "text-ef-blue" },
    { label: "TAILWIND CSS", color: "text-primary" },
    { label: "RADIX UI", color: "text-ef-purple" },
    { label: "FRAMER MOTION", color: "text-ef-green" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-10">
      {techs.map((tech, i) => (
        <TechItem key={tech.label} tech={tech} index={i} />
      ))}
    </div>
  );
};

const TechItem = ({
  tech,
  index,
}: {
  tech: { label: string; color: string };
  index: number;
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.1 + index * 0.08 }}
      className="inline-flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground/60 border border-border/40 px-3 py-1.5 tracking-[0.1em]"
    >
      <span className={`text-[5px] ${tech.color}`}>◆</span>
      {tech.label}
    </motion.span>
  );
};

const ScrollIndicator = ({ progress }: { progress: MotionValue<number> }) => {
  const { t } = useTranslation("home");
  const opacity = useTransform(progress, [0, 0.12], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[8px] text-muted-foreground/40 tracking-[0.15em] uppercase">
          {t("awakening.scroll_to_deploy")}
        </span>
        <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ChapterAwakening;
