import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

export type GlitchIntensity = "low" | "medium" | "high";

/* ── Intensity config ────────────────────────────────────────────────────── */

const INTENSITY_CONFIG: Record<
  GlitchIntensity,
  {
    duration: string;
    clipTop: string;
    clipBot: string;
    offset: number;
    defaultInterval: number;
  }
> = {
  low: {
    duration: "6s",
    clipTop: "15% 0 70% 0",
    clipBot: "65% 0 15% 0",
    offset: 1,
    defaultInterval: 4000,
  },
  medium: {
    duration: "3s",
    clipTop: "20% 0 50% 0",
    clipBot: "50% 0 20% 0",
    offset: 2,
    defaultInterval: 2500,
  },
  high: {
    duration: "1.2s",
    clipTop: "10% 0 60% 0",
    clipBot: "55% 0 10% 0",
    offset: 4,
    defaultInterval: 1200,
  },
};

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface GlitchTextProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  children: string;
  intensity?: GlitchIntensity;
  continuous?: boolean;
  continuousInterval?: number;
}

/* ── Component ───────────────────────────────────────────────────────────── */

const GlitchText = React.forwardRef<HTMLSpanElement, GlitchTextProps>(
  (
    {
      children,
      className,
      intensity = "medium",
      continuous = false,
      continuousInterval,
      ...props
    },
    ref,
  ) => {
    const cfg = INTENSITY_CONFIG[intensity];
    const interval = continuousInterval ?? cfg.defaultInterval;

    const [glitching, setGlitching] = React.useState(false);

    React.useEffect(() => {
      if (!continuous) return;
      const id = setInterval(() => {
        setGlitching(true);
        const off = setTimeout(
          () => setGlitching(false),
          parseFloat(cfg.duration) * 1000,
        );
        return () => clearTimeout(off);
      }, interval);
      return () => clearInterval(id);
    }, [continuous, interval, cfg.duration]);

    const animClass = glitching || !continuous ? "animate-glitch" : "";

    return (
      <span
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        {/* Visible text */}
        <span className="relative z-10">{children}</span>

        {/* Glitch layer 1 — cyan, top slice */}
        <span
          aria-hidden
          className={cn("absolute inset-0 text-ef-cyan opacity-70", animClass)}
          style={{
            clipPath: `inset(${cfg.clipTop})`,
            transform: `translate(-${cfg.offset}px, 0)`,
            animationDuration: cfg.duration,
          }}
        >
          {children}
        </span>

        {/* Glitch layer 2 — red, bottom slice */}
        <span
          aria-hidden
          className={cn("absolute inset-0 text-ef-red opacity-70", animClass)}
          style={{
            clipPath: `inset(${cfg.clipBot})`,
            transform: `translate(${cfg.offset}px, 0)`,
            animationDuration: cfg.duration,
            animationDelay: "0.1s",
          }}
        >
          {children}
        </span>
      </span>
    );
  },
);
GlitchText.displayName = "GlitchText";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { GlitchText };
