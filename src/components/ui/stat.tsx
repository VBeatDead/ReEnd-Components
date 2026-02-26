import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  description?: string;
}

/* ── Stat ─────────────────────────────────────────────────────────────────── */

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  (
    { value, label, trend, trendValue, description, className, ...props },
    ref,
  ) => {
    const trendColor =
      trend === "up"
        ? "text-ef-green"
        : trend === "down"
          ? "text-destructive"
          : "text-muted-foreground";

    const trendIndicator =
      trend === "up" ? "\u25B2" : trend === "down" ? "\u25BC" : null;

    return (
      <div
        ref={ref}
        className={cn(
          "group corner-brackets bg-surface-1 border border-border p-5 overflow-hidden",
          className,
        )}
        {...props}
      >
        <p className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-2">
          {label}
        </p>

        <p className="font-display text-5xl font-bold text-primary leading-none truncate transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,212,41,0.3)]">
          {value}
        </p>

        {trendValue && (
          <p className={cn("text-xs mt-2", trendColor)}>
            {trendIndicator && (
              <span aria-hidden="true">{trendIndicator} </span>
            )}
            <span>{trendValue}</span>
          </p>
        )}

        {description && (
          <p className="text-[12px] text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
    );
  },
);
Stat.displayName = "Stat";

/* ── StatGrid ────────────────────────────────────────────────────────────── */

export type StatGridProps = React.HTMLAttributes<HTMLDivElement>;

const StatGrid = React.forwardRef<HTMLDivElement, StatGridProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid gap-6",
        "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
        className,
      )}
      {...props}
    />
  ),
);
StatGrid.displayName = "StatGrid";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Stat, StatGrid };
