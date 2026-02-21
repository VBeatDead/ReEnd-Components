import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";
import { ComponentPreview } from "../docs/ComponentPreview";

export function AnimationSection() {
  const { t } = useTranslation("animation");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimKey((k) => k + 1);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Animation System */}
      <ComponentPreview
        id="animation-system"
        title={t("system.title")}
        description={t("system.description")}
        code={`/* Timing Functions */
--ease-default: cubic-bezier(0.25, 0.8, 0.25, 1)${""};
--ease-bounce:  cubic-bezier(0.68, -0.55, 0.27, 1.55)${""};
--ease-sharp:   cubic-bezier(0.4, 0, 0.2, 1)${""};
--ease-smooth:  cubic-bezier(0.4, 0, 0, 1)${""};

/* Durations */
--duration-instant: 100ms;  --duration-fast: 150ms;
--duration-normal: 300ms;   --duration-slow: 500ms;`}
        props={[
          {
            name: "name",
            type: '"fadeIn" | "fadeInUp" | "glitch" | "pulseGlow" | "diamondSpin" | "skeleton"',
            required: true,
            description: t("_props.animation-system.name"),
          },
          {
            name: "duration",
            type: '"instant" | "fast" | "normal" | "slow" | "slower"',
            default: '"normal"',
            required: false,
            description: t("_props.animation-system.duration"),
          },
          {
            name: "delay",
            type: "number",
            required: false,
            description: t("_props.animation-system.delay"),
          },
          {
            name: "easing",
            type: '"default" | "bounce" | "sharp" | "smooth"',
            default: '"default"',
            required: false,
            description: t("_props.animation-system.easing"),
          },
        ]}
        api={[
          {
            name: "useInView",
            signature:
              "(ref: RefObject, options?: { threshold: number }) => boolean",
            description: t("_props.animation-system.api.useInView"),
          },
          {
            name: "useStagger",
            signature: "(count: number, delay?: number) => string[]",
            description: t("_props.animation-system.api.useStagger"),
          },
        ]}
      >
        <div className="space-y-8">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("live_animations")}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "fadeIn", cls: "animate-fade-in" },
                { name: "fadeInUp", cls: "animate-fade-in-up" },
                { name: "glitch", cls: "animate-glitch" },
                { name: "cursorBlink", cls: "animate-cursor-blink" },
                { name: "pulseGlow", cls: "animate-pulse-glow" },
                { name: "diamondSpin", cls: "animate-diamond-spin" },
                { name: "skeleton", cls: "animate-skeleton" },
              ].map((a) => (
                <div
                  key={a.name}
                  className="border border-border bg-surface-1 p-4 flex flex-col items-center gap-3"
                >
                  <div
                    className={`w-8 h-8 bg-primary/30 border border-primary/50 flex items-center justify-center ${a.cls}`}
                  >
                    <span className="text-primary text-xs">◆</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {a.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("duration_scale")}
            </h4>
            <div className="space-y-2">
              {[
                { label: "instant", val: "100ms" },
                { label: "fast", val: "150ms" },
                { label: "normal", val: "300ms" },
                { label: "slow", val: "500ms" },
                { label: "slower", val: "800ms" },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground w-16">
                    {d.label}
                  </span>
                  <div
                    className="h-2 bg-primary transition-all"
                    style={{ width: `${parseInt(d.val) / 4}px` }}
                  />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {d.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Page Transitions */}
      <ComponentPreview
        id="page-transitions"
        title={t("page_transitions.title")}
        description={t("page_transitions.description")}
        code={`::view-transition-old(root) { animation: fadeOut 0.2s ease forwards; }
::view-transition-new(root) { animation: fadeIn 0.3s ease forwards; }`}
        props={[
          {
            name: "type",
            type: '"fade" | "slide" | "scale"',
            default: '"fade"',
            required: false,
            description: t("_props.page-transitions.type"),
          },
          {
            name: "duration",
            type: "number",
            default: "300",
            required: false,
            description: t("_props.page-transitions.duration"),
          },
        ]}
      >
        <p className="text-sm text-muted-foreground">
          {t("page_transitions.cross_fade_text")}
        </p>
      </ComponentPreview>

      {/* Scroll Animations */}
      <ComponentPreview
        id="scroll-animations"
        title={t("scroll_triggered.title")}
        description={t("scroll_triggered.description")}
        props={[
          {
            name: "animation",
            type: '"fadeInUp" | "fadeIn" | "scaleIn"',
            default: '"fadeInUp"',
            required: false,
            description: t("_props.scroll-animations.animation"),
          },
          {
            name: "threshold",
            type: "number",
            default: "0.1",
            required: false,
            description: t("_props.scroll-animations.threshold"),
          },
          {
            name: "stagger",
            type: "number",
            default: "100",
            required: false,
            description: t("_props.scroll-animations.stagger"),
          },
          {
            name: "once",
            type: "boolean",
            default: "true",
            required: false,
            description: t("_props.scroll-animations.once"),
          },
        ]}
      >
        <div ref={scrollRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={`${i}-${animKey}`}
              className="corner-brackets bg-surface-1 border border-border p-6 text-center animate-fade-in-up"
              style={{
                animationDelay: `${(i - 1) * 150}ms`,
                animationFillMode: "both",
              }}
            >
              <span className="font-display text-2xl font-bold text-primary">
                {String(i).padStart(2, "0")}
              </span>
              <p className="font-display text-xs uppercase text-muted-foreground mt-2">
                {t("scroll_triggered.stagger_label", { ms: (i - 1) * 150 })}
              </p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* Particle Effects */}
      <ComponentPreview
        id="particle-effects"
        title={t("particles.title")}
        description={t("particles.description")}
        props={[
          {
            name: "count",
            type: "number",
            default: "12",
            required: false,
            description: t("_props.particle-effects.count"),
          },
          {
            name: "color",
            type: "string",
            default: '"primary"',
            required: false,
            description: t("_props.particle-effects.color"),
          },
          {
            name: "speed",
            type: '"slow" | "medium" | "fast"',
            default: '"slow"',
            required: false,
            description: t("_props.particle-effects.speed"),
          },
          {
            name: "opacity",
            type: "[number, number]",
            default: "[0.1, 0.3]",
            required: false,
            description: t("_props.particle-effects.opacity"),
          },
        ]}
      >
        <div className="relative h-32 bg-surface-0 border border-border overflow-hidden flex items-center justify-center">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary animate-pulse"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                left: `${10 + ((i * 7) % 80)}%`,
                top: `${15 + ((i * 13) % 70)}%`,
                opacity: 0.1 + (i % 3) * 0.1,
                animationDelay: `${i * 300}ms`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
          <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground relative z-10">
            {t("particles.ambient_particles")}
          </span>
        </div>
      </ComponentPreview>
    </>
  );
}
