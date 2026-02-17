import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import {
  HorizontalScrollSection,
  ScrollFade,
  ScrollPinSection,
  useStorytellingConfig,
} from "@/components/home/scroll-storytelling";
import { TiltCard } from "@/components/home/animations";
import { TopoBg } from "@/components/home/signature";
import {
  ButtonShowcase,
  CardShowcase,
  ColorTokenShowcase,
} from "@/components/home/showcases/ButtonShowcase";
import { FormShowcase } from "@/components/home/showcases/FormShowcase";
import { TerminalDemo } from "@/components/home/showcases/TerminalDemo";

const panels = [
  {
    id: "buttons",
    label: "BUTTONS",
    tag: "clip-corner",
    Component: ButtonShowcase,
  },
  {
    id: "cards",
    label: "CARDS",
    tag: "corner-brackets",
    Component: CardShowcase,
  },
  {
    id: "forms",
    label: "FORMS & INPUT",
    tag: "focus-glow",
    Component: FormShowcase,
  },
  {
    id: "terminal",
    label: "QUICK START",
    tag: "terminal",
    Component: TerminalDemo,
  },
  {
    id: "tokens",
    label: "DESIGN TOKENS",
    tag: "CSS properties",
    Component: ColorTokenShowcase,
  },
];

const ChapterArsenal = () => {
  const { isMobile, enableTiltCard } = useStorytellingConfig();

  if (isMobile) {
    return (
      <section
        id="chapter-arsenal"
        data-chapter
        aria-label="Chapter 3: Component Arsenal"
        className="py-16 px-4"
      >
        <div className="text-center mb-10">
          <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
            ◆ LIVE PREVIEW
          </span>
          <h2 className="font-display text-2xl font-bold tracking-[0.05em] uppercase text-foreground mt-3">
            COMPONENT{" "}
            <span className="text-primary text-glow-yellow">ARSENAL</span>
          </h2>
        </div>
        <div className="space-y-6">
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="border border-border bg-surface-1 p-5"
            >
              <PanelHeader label={panel.label} tag={panel.tag} />
              <panel.Component />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return <ArsenalDesktop enableTiltCard={enableTiltCard} />;
};

const ArsenalDesktop = ({ enableTiltCard }: { enableTiltCard: boolean }) => {
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

  // Title animations — starts partially visible
  const titleOpacity = useTransform(smoothProgress, [0, 0.06], [0.7, 1]);
  const titleY = useTransform(smoothProgress, [0, 0.06], [10, 0]);

  // Horizontal pan: map scroll to x translation
  const x = useTransform(smoothProgress, [0.08, 0.92], ["0%", "-80%"]);

  // Progress bar
  const progressBar = useTransform(smoothProgress, [0.08, 0.92], [0, 1]);

  // Exit fade
  const exitOpacity = useTransform(smoothProgress, [0.92, 1], [1, 0]);

  return (
    <div
      ref={containerRef}
      id="chapter-arsenal"
      className="relative"
      style={{ height: "400vh" }}
      data-chapter
      aria-label="Chapter 3: Component Arsenal"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <motion.div
          style={{ opacity: exitOpacity }}
          className="flex-1 flex flex-col"
        >
          {/* Section header */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center pt-8 pb-4 flex-shrink-0"
          >
            <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
              ◆ LIVE PREVIEW
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.05em] uppercase text-foreground mt-2">
              COMPONENT{" "}
              <span className="text-primary text-glow-yellow">ARSENAL</span>
            </h2>
          </motion.div>

          {/* BG Layer */}
          <div className="absolute inset-0 pointer-events-none">
            <TopoBg className="opacity-15" />
          </div>

          {/* Horizontal scroll container */}
          <div className="flex-1 flex items-center overflow-hidden relative">
            <motion.div
              style={{ x }}
              className="flex h-[70vh] items-center gap-8 pl-[10vw] pr-[30vw]"
            >
              {panels.map((panel, i) => (
                <PanelCard
                  key={panel.id}
                  panel={panel}
                  index={i}
                  progress={smoothProgress}
                  enableTilt={enableTiltCard}
                />
              ))}
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 z-20">
            <div className="h-[2px] bg-border overflow-hidden">
              <motion.div
                className="h-full bg-primary origin-left"
                style={{ scaleX: progressBar }}
              />
            </div>
            <p className="font-mono text-[9px] text-muted-foreground/50 text-center mt-2 tracking-[0.1em]">
              SCROLL TO EXPLORE
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PanelCard = ({
  panel,
  index,
  progress,
  enableTilt,
}: {
  panel: (typeof panels)[number];
  index: number;
  progress: MotionValue<number>;
  enableTilt: boolean;
}) => {
  // Each panel occupies ~18% of the scroll range (0.08 to 0.92 = 0.84 total / 5 panels)
  const panelWidth = 0.84 / panels.length;
  const panelCenter = 0.08 + panelWidth * (index + 0.5);
  const scaleStart = panelCenter - panelWidth * 0.8;
  const scaleEnd = panelCenter + panelWidth * 0.8;

  const scale = useTransform(
    progress,
    [scaleStart, panelCenter, scaleEnd],
    [0.92, 1, 0.92],
  );
  const opacity = useTransform(
    progress,
    [
      scaleStart,
      panelCenter - panelWidth * 0.3,
      panelCenter + panelWidth * 0.3,
      scaleEnd,
    ],
    [0.6, 1, 1, 0.6],
  );

  const content = (
    <motion.div
      style={{ scale, opacity }}
      className="flex-shrink-0 w-[75vw] max-w-[900px] h-full flex items-center"
    >
      <div className="border border-border bg-surface-1 p-6 sm:p-8 w-full max-h-[60vh] overflow-y-auto">
        <PanelHeader label={panel.label} tag={panel.tag} />
        <panel.Component />
      </div>
    </motion.div>
  );

  if (enableTilt) {
    return (
      <TiltCard className="flex-shrink-0 w-[75vw] max-w-[900px] h-full flex items-center">
        <div className="w-full">
          <motion.div style={{ scale, opacity }}>
            <div className="border border-border bg-surface-1 p-6 sm:p-8 w-full max-h-[60vh] overflow-y-auto">
              <PanelHeader label={panel.label} tag={panel.tag} />
              <panel.Component />
            </div>
          </motion.div>
        </div>
      </TiltCard>
    );
  }

  return content;
};

const PanelHeader = ({ label, tag }: { label: string; tag: string }) => (
  <div className="flex items-center gap-2 mb-5">
    <div
      className="w-1.5 h-1.5 bg-primary"
      style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
    />
    <span className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-foreground">
      {label}
    </span>
    <span className="ml-auto font-mono text-[9px] text-primary/60">{tag}</span>
  </div>
);

export default ChapterArsenal;
