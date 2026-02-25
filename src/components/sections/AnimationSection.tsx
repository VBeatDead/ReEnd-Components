import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect, useMemo } from "react";
import { ComponentPreview } from "../docs/ComponentPreview";

/* ── Particle field with SVG connection lines (Section 57) ──────────────── */
const PARTICLE_COUNT = 12;
const CONNECTION_THRESHOLD = 100; // px — draw line when distance < this

function ParticleField({ label }: { label: string }) {
  // Fixed positions so they don't re-randomize on every render
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        x: 10 + ((i * 7) % 80), // % of container width
        y: 15 + ((i * 13) % 70), // % of container height
        // Increased opacity range for light mode visibility (spec: 0.1-0.3 is dark-mode default)
        opacity: 0.3 + (i % 3) * 0.15, // → 0.30, 0.45, 0.60
        delay: i * 300,
        duration: 2.5 + (i % 3), // 2.5s, 3.5s, 4.5s drift cycles
      })),
    [],
  );

  // Container is fixed 320×128px for line calculation
  const W = 320;
  const H = 128;

  const lines: { x1: number; y1: number; x2: number; y2: number; key: string }[] = [];
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const ax = (particles[i].x / 100) * W;
      const ay = (particles[i].y / 100) * H;
      const bx = (particles[j].x / 100) * W;
      const by = (particles[j].y / 100) * H;
      const dist = Math.hypot(ax - bx, ay - by);
      if (dist < CONNECTION_THRESHOLD) {
        lines.push({ x1: ax, y1: ay, x2: bx, y2: by, key: `${i}-${j}` });
      }
    }
  }

  return (
    <div className="relative h-32 bg-surface-0 border border-border overflow-hidden flex items-center justify-center">
      {/* SVG connection lines — use foreground color so they're visible in both dark + light mode */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {lines.map((l) => (
          <line
            key={l.key}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="hsl(var(--foreground))"
            strokeOpacity="0.12"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Diamond particles — animate-particle-drift for "slow drift" per Section 57 */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary animate-particle-drift"
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animationDelay: `${p.delay}ms`,
            ["--particle-dur" as string]: `${p.duration}s`,
          }}
        />
      ))}

      <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground relative z-10">
        {label}
      </span>
    </div>
  );
}

/* ── All animation catalog entries per Section 54 ───────────────────────── */
const ANIMATION_CATALOG = [
  { name: "fadeIn",       cls: "animate-fade-in" },
  { name: "fadeInUp",     cls: "animate-fade-in-up" },
  { name: "fadeInDown",   cls: "animate-fade-in-down" },
  { name: "slideInRight", cls: "animate-slide-in-right" },
  { name: "scaleIn",      cls: "animate-scale-in" },
  { name: "glitch",       cls: "animate-glitch" },
  { name: "cursorBlink",  cls: "animate-cursor-blink" },
  { name: "pulseGlow",    cls: "animate-pulse-glow" },
  { name: "rotate",       cls: "animate-rotate" },
  { name: "skeleton",     cls: "animate-skeleton" },
  { name: "diamondSpin",  cls: "animate-diamond-spin" },
  { name: "loadingDot",   cls: "animate-loading-dot" },
  { name: "shrink",       cls: "animate-shrink" },
] as const;

export function AnimationSection() {
  const { t } = useTranslation("animation");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey] = useState(0);
  const [pageDemo, setPageDemo] = useState<"A" | "B">("A");

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimKey((k) => k + 1);
      },
      { threshold: 0.1 },
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
        code={`/* ── Timing Functions ── */
--ease-default: cubic-bezier(0.25, 0.8, 0.25, 1);   /* General */
--ease-bounce:  cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Playful */
--ease-sharp:   cubic-bezier(0.4, 0, 0.2, 1);        /* Quick */
--ease-smooth:  cubic-bezier(0.4, 0, 0, 1);          /* Entrance */

/* ── Duration Scale ── */
--duration-instant: 100ms;  /* Hover, toggle, color */
--duration-fast:    150ms;  /* Dropdown, tooltip */
--duration-normal:  300ms;  /* General transitions */
--duration-slow:    500ms;  /* Page, modal */
--duration-slower:  800ms;  /* Complex multi-step */

/* ── Usage ── */
.element {
  transition: all var(--duration-normal) var(--ease-default);
}

/* ── Scroll-triggered ── */
.animate-fade-in-up   { animation: fadeInUp 0.4s var(--ease-default) forwards; }
.animate-fade-in-down { animation: fadeInDown 0.4s var(--ease-default) forwards; }
.animate-scale-in     { animation: scaleIn 0.3s var(--ease-default) forwards; }
.animate-glitch       { animation: glitch 3s infinite; }
.animate-pulse-glow   { animation: pulseGlow 2s ease-in-out infinite; }`}
        props={[
          {
            name: "name",
            type: '"fadeIn" | "fadeInUp" | "fadeInDown" | "slideInRight" | "scaleIn" | "glitch" | "cursorBlink" | "pulseGlow" | "rotate" | "skeleton" | "diamondSpin" | "loadingDot" | "shrink"',
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
              "(ref: RefObject<Element | null>, options?: { threshold?: number; once?: boolean }) => boolean",
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
          {/* ── Live Animation Catalog ── */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("live_animations")}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {ANIMATION_CATALOG.map((a) => (
                <div
                  key={a.name}
                  className="border border-border bg-surface-1 p-3 flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-8 h-8 bg-primary/30 border border-primary/50 flex items-center justify-center ${a.cls}`}
                  >
                    <span className="text-primary text-xs">◆</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground text-center leading-tight">
                    {a.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Duration Scale ── */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("duration_scale")}
            </h4>
            <div className="space-y-2">
              {[
                { label: "instant", val: "100ms" },
                { label: "fast",    val: "150ms" },
                { label: "normal",  val: "300ms" },
                { label: "slow",    val: "500ms" },
                { label: "slower",  val: "800ms" },
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

          {/* ── Easing Reference ── */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">
              {t("easing_tokens")}
            </h4>
            <div className="border border-border overflow-hidden">
              {[
                { token: "--ease-default", value: "cubic-bezier(0.25, 0.8, 0.25, 1)", use: t("easing_use.default") },
                { token: "--ease-bounce",  value: "cubic-bezier(0.68, -0.55, 0.27, 1.55)", use: t("easing_use.bounce") },
                { token: "--ease-sharp",   value: "cubic-bezier(0.4, 0, 0.2, 1)",     use: t("easing_use.sharp") },
                { token: "--ease-smooth",  value: "cubic-bezier(0.4, 0, 0, 1)",       use: t("easing_use.smooth") },
              ].map((e, i) => (
                <div
                  key={e.token}
                  className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3 ${i !== 0 ? "border-t border-border" : ""}`}
                >
                  <span className="font-mono text-[10px] text-primary w-32 shrink-0">{e.token}</span>
                  <span className="font-mono text-[10px] text-muted-foreground flex-1 truncate">{e.value}</span>
                  <span className="text-xs text-muted-foreground/70">{e.use}</span>
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
        code={`/* View Transitions API — add to your global CSS */
::view-transition-old(root) {
  animation: fadeOut 0.2s ease forwards;
}
::view-transition-new(root) {
  animation: fadeIn 0.3s ease forwards;
}

/* Reduced-motion fallback */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) { animation: none; }
}

/* Trigger from router (React Router / Next.js) */
document.startViewTransition(() => {
  navigate("/new-page");
});`}
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
        {/* Interactive mock page switch */}
        <div className="space-y-4">
          <div className="relative h-28 border border-border overflow-hidden bg-surface-0">
            <div
              key={`page-${pageDemo}`}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 animate-fade-in"
              style={{ animationDuration: "0.3s" }}
            >
              <span className="font-display text-2xl font-bold text-primary">
                {pageDemo === "A" ? "01" : "02"}
              </span>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.12em]">
                {t("page_transitions.page_label")} {pageDemo}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPageDemo((p) => (p === "A" ? "B" : "A"))}
            className="font-display text-[11px] uppercase tracking-wider border border-border px-4 py-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {t("page_transitions.switch_label")}
          </button>
          <p className="text-xs text-muted-foreground">
            {t("page_transitions.cross_fade_text")}
          </p>
        </div>
      </ComponentPreview>

      {/* Scroll Animations */}
      <ComponentPreview
        id="scroll-animations"
        title={t("scroll_triggered.title")}
        description={t("scroll_triggered.description")}
        code={`import { useRef, useEffect, useState } from "react";

function ScrollReveal({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={visible ? "animate-fade-in-up" : "opacity-0"}
      style={{ animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}

/* Or use the exported hook: */
import { useInView } from "reend-components";

function Card({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1, once: true });
  return (
    <div
      ref={ref}
      className={inView ? "animate-fade-in-up" : "opacity-0"}
      style={{ animationDelay: \`\${delay}ms\`, animationFillMode: "both" }}
    />
  );
}`}
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
        code={`/* Particle drift keyframe (Section 57) */
@keyframes particleDrift {
  0%   { transform: translate(0, 0); }
  33%  { transform: translate(2px, -3px); }
  66%  { transform: translate(-2px, 2px); }
  100% { transform: translate(0, 0); }
}

/* Diamond particle */
.particle {
  position: absolute;
  width: 4px; height: 4px;
  background: hsl(var(--primary));
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  opacity: 0.3;
  animation: particleDrift 3s ease-in-out infinite;
}

/* Connection lines — use foreground for dark/light adaptability */
svg line {
  stroke: hsl(var(--foreground));
  stroke-opacity: 0.12;
  stroke-width: 0.5;
}`}
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
            default: "[0.3, 0.6]",
            required: false,
            description: t("_props.particle-effects.opacity"),
          },
        ]}
      >
        <ParticleField label={t("particles.ambient_particles")} />
      </ComponentPreview>
    </>
  );
}
