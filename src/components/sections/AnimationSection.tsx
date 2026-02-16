import { ComponentPreview } from "../docs/ComponentPreview";

export const AnimationSection = () => {
  return (
    <>
      {/* 54. Animation System */}
      <ComponentPreview
        id="animation-system"
        title="54. Animation System"
        description="Timing functions, durations, and key animation catalog."
        code={`/* Timing Functions */
--ease-default: cubic-bezier(0.25, 0.8, 0.25, 1);
--ease-bounce:  cubic-bezier(0.68, -0.55, 0.27, 1.55);
--ease-sharp:   cubic-bezier(0.4, 0, 0.2, 1);
--ease-smooth:  cubic-bezier(0.4, 0, 0, 1);

/* Durations */
--duration-instant: 100ms;  --duration-fast: 150ms;
--duration-normal: 300ms;   --duration-slow: 500ms;`}
        props={[
          { name: "name", type: '"fadeIn" | "fadeInUp" | "glitch" | "pulseGlow" | "diamondSpin" | "skeleton"', required: true, description: "Animation name from the catalog" },
          { name: "duration", type: '"instant" | "fast" | "normal" | "slow" | "slower"', default: '"normal"', required: false, description: "Duration scale token" },
          { name: "delay", type: "number", required: false, description: "Animation delay in ms" },
          { name: "easing", type: '"default" | "bounce" | "sharp" | "smooth"', default: '"default"', required: false, description: "Timing function" },
        ]}
        api={[
          { name: "useInView", signature: "(ref: RefObject, options?: { threshold: number }) => boolean", description: "Returns true when element enters viewport. Use to trigger scroll animations." },
          { name: "useStagger", signature: "(count: number, delay?: number) => string[]", description: "Returns array of CSS delay strings for staggered child animations." },
        ]}
      >
        <div className="space-y-8">
          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">LIVE ANIMATIONS</h4>
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
                <div key={a.name} className="border border-border bg-surface-1 p-4 flex flex-col items-center gap-3">
                  <div className={`w-8 h-8 bg-primary/30 border border-primary/50 flex items-center justify-center ${a.cls}`}>
                    <span className="text-primary text-xs">◆</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{a.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground mb-4">DURATION SCALE</h4>
            <div className="space-y-2">
              {[
                { label: "instant", val: "100ms" },
                { label: "fast", val: "150ms" },
                { label: "normal", val: "300ms" },
                { label: "slow", val: "500ms" },
                { label: "slower", val: "800ms" },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground w-16">{d.label}</span>
                  <div className="h-2 bg-primary transition-all" style={{ width: `${parseInt(d.val) / 4}px` }} />
                  <span className="font-mono text-[10px] text-muted-foreground">{d.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* 55. Page Transitions */}
      <ComponentPreview
        id="page-transitions"
        title="55. Page Transitions"
        description="Cross-fade 300ms. View Transitions API."
        code={`::view-transition-old(root) { animation: fadeOut 0.2s ease forwards; }
::view-transition-new(root) { animation: fadeIn 0.3s ease forwards; }`}
        props={[
          { name: "type", type: '"fade" | "slide" | "scale"', default: '"fade"', required: false, description: "Transition animation type" },
          { name: "duration", type: "number", default: "300", required: false, description: "Transition duration in ms" },
        ]}
      >
        <p className="text-sm text-muted-foreground">Cross-fade transisi antar halaman menggunakan View Transitions API (300ms duration).</p>
      </ComponentPreview>

      {/* 56. Scroll Animations */}
      <ComponentPreview
        id="scroll-animations"
        title="56. Scroll-Triggered Animations"
        description="Default: fadeInUp at 10% visibility. Stagger: 100ms delay per sibling."
        props={[
          { name: "animation", type: '"fadeInUp" | "fadeIn" | "scaleIn"', default: '"fadeInUp"', required: false, description: "Animation to play on scroll" },
          { name: "threshold", type: "number", default: "0.1", required: false, description: "Intersection Observer threshold (0-1)" },
          { name: "stagger", type: "number", default: "100", required: false, description: "Delay in ms between sibling animations" },
          { name: "once", type: "boolean", default: "true", required: false, description: "Only animate once when entering viewport" },
        ]}
      >
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="corner-brackets bg-surface-1 border border-border p-6 text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <span className="font-display text-2xl font-bold text-primary">{String(i).padStart(2, "0")}</span>
              <p className="font-display text-xs uppercase text-muted-foreground mt-2">STAGGER {i * 100}ms</p>
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* 57. Particle Effects */}
      <ComponentPreview
        id="particle-effects"
        title="57. Particle & Ambient Effects"
        description="Floating dots opacity 0.1-0.3, slow drift. Hero-section only. Canvas-based."
        props={[
          { name: "count", type: "number", default: "12", required: false, description: "Number of particles" },
          { name: "color", type: "string", default: '"primary"', required: false, description: "Particle color token" },
          { name: "speed", type: '"slow" | "medium" | "fast"', default: '"slow"', required: false, description: "Drift animation speed" },
          { name: "opacity", type: "[number, number]", default: "[0.1, 0.3]", required: false, description: "Min/max opacity range" },
        ]}
      >
        <div className="relative h-32 bg-surface-0 border border-border overflow-hidden flex items-center justify-center">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${15 + (i * 13) % 70}%`,
                opacity: 0.1 + (i % 3) * 0.1,
                animationDelay: `${i * 300}ms`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
          <span className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground relative z-10">AMBIENT PARTICLES</span>
        </div>
      </ComponentPreview>
    </>
  );
};
