import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ─────────────────────────────────────────────────────────────── */

const frequencyBarsVariants = cva("flex items-end gap-px", {
  variants: {
    color: {
      primary: "[&>span]:bg-primary",
      success: "[&>span]:bg-ef-green",
      danger: "[&>span]:bg-destructive",
      info: "[&>span]:bg-ef-blue",
      muted: "[&>span]:bg-white/20",
    },
  },
  defaultVariants: { color: "primary" },
});

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface FrequencyBarsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof frequencyBarsVariants> {
  barCount?: number;
  barWidth?: number;
  height?: number;
  speed?: "slow" | "medium" | "fast";
  paused?: boolean;
}

/* ── Component ───────────────────────────────────────────────────────────── */

const SPEED_DURATION: Record<string, string> = {
  slow: "1.4s",
  medium: "0.8s",
  fast: "0.4s",
};

const FrequencyBars = React.forwardRef<HTMLDivElement, FrequencyBarsProps>(
  (
    {
      className,
      barCount = 12,
      barWidth = 3,
      height = 32,
      speed = "medium",
      paused = false,
      color,
      style,
      ...props
    },
    ref,
  ) => {
    const duration = SPEED_DURATION[speed] ?? SPEED_DURATION.medium;

    const bars = React.useMemo(
      () =>
        Array.from({ length: barCount }, (_, i) => ({
          delay: `${((i * 0.13) % 0.9).toFixed(2)}s`,
        })),
      [barCount],
    );

    return (
      <div
        ref={ref}
        className={cn(frequencyBarsVariants({ color }), className)}
        style={{ height, ...style }}
        aria-hidden="true"
        {...props}
      >
        {bars.map((bar, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: barWidth,
              height: "100%",
              transformOrigin: "center bottom",
              animation: `frequency-bar ${duration} ease-in-out infinite alternate`,
              animationDelay: bar.delay,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        ))}
      </div>
    );
  },
);
FrequencyBars.displayName = "FrequencyBars";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { FrequencyBars, frequencyBarsVariants };
