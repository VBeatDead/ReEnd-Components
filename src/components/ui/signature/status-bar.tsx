import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ─────────────────────────────────────────────────────────────── */

const statusBarContainerVariants = cva("flex items-center gap-1.5", {
  variants: {
    size: {
      sm: "[&>span.seg]:w-3 [&>span.seg]:h-2",
      md: "[&>span.seg]:w-4 [&>span.seg]:h-3",
      lg: "[&>span.seg]:w-6 [&>span.seg]:h-4",
    },
  },
  defaultVariants: { size: "md" },
});

const statusBarSegmentVariants = cva("seg transition-all duration-200", {
  variants: {
    variant: {
      health: "",
      energy: "",
      shield: "",
      experience: "",
    },
  },
  defaultVariants: { variant: "health" },
});

/* ── Fill color per variant ───────────────────────────────────────────────── */

const FILL_COLORS: Record<string, string> = {
  health: "bg-ef-green",
  energy: "bg-primary",
  shield: "bg-ef-blue",
  experience: "bg-ef-purple",
};

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface StatusBarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBarContainerVariants>,
    VariantProps<typeof statusBarSegmentVariants> {
  value: number;
  max?: number;
  segments?: number;
  label?: string;
  showValue?: boolean;
}

/* ── Component ───────────────────────────────────────────────────────────── */

const StatusBar = React.forwardRef<HTMLDivElement, StatusBarProps>(
  (
    {
      className,
      value,
      max = 100,
      segments = 10,
      label,
      showValue = false,
      size,
      variant = "health",
      ...props
    },
    ref,
  ) => {
    const clampedValue = Math.min(max, Math.max(0, value));
    const ratio = max > 0 ? clampedValue / max : 0;
    const filledCount = Math.round(ratio * segments);

    /* Auto-danger color for health bar at low values */
    const resolveFill = (segIdx: number): string => {
      if (segIdx >= filledCount) return "bg-white/8";
      if (variant === "health") {
        if (ratio <= 0.15) return "bg-destructive";
        if (ratio <= 0.3) return "bg-ef-orange";
      }
      return FILL_COLORS[variant ?? "health"] ?? FILL_COLORS.health;
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        role="meter"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? `${variant} bar`}
        {...props}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
            {label}
          </span>
        )}

        <div className={cn(statusBarContainerVariants({ size }))}>
          {Array.from({ length: segments }).map((_, i) => (
            <span
              key={i}
              className={cn(
                statusBarSegmentVariants({ variant }),
                resolveFill(i),
              )}
            />
          ))}
        </div>

        {showValue && (
          <span className="font-mono text-[10px] text-muted-foreground shrink-0 ml-1">
            {clampedValue}/{max}
          </span>
        )}
      </div>
    );
  },
);
StatusBar.displayName = "StatusBar";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { StatusBar, statusBarContainerVariants, statusBarSegmentVariants };
