import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface MatrixGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number;
  rows?: number;
  dotSize?: number;
  gap?: number;
  activeColor?: string;
  activeProbability?: number;
  intervalMs?: number;
  static?: boolean;
}

/* ── Component ───────────────────────────────────────────────────────────── */

const MatrixGrid = React.forwardRef<HTMLDivElement, MatrixGridProps>(
  (
    {
      className,
      cols = 20,
      rows = 10,
      dotSize = 4,
      gap = 8,
      activeColor = "bg-primary",
      activeProbability = 0.05,
      intervalMs = 300,
      static: isStatic = false,
      ...props
    },
    ref,
  ) => {
    const total = cols * rows;
    const [activeDots, setActiveDots] = React.useState<Set<number>>(
      () => new Set<number>(),
    );

    /* Detect reduced-motion preference */
    const prefersReduced = React.useMemo(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    /* Random activation loop */
    React.useEffect(() => {
      if (isStatic || prefersReduced) return;

      const id = setInterval(() => {
        setActiveDots((prev) => {
          const next = new Set(prev);
          /* Activate random dots */
          for (let i = 0; i < total; i++) {
            if (Math.random() < activeProbability) {
              next.add(i);
            }
          }
          for (const dot of next) {
            if (Math.random() < 0.3) next.delete(dot);
          }
          return next;
        });
      }, intervalMs);

      return () => clearInterval(id);
    }, [isStatic, prefersReduced, total, activeProbability, intervalMs]);

    return (
      <div
        ref={ref}
        className={cn("overflow-hidden", className)}
        aria-hidden="true"
        {...props}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
            gap: `${gap}px`,
          }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{ width: dotSize, height: dotSize }}
              className={cn(
                "transition-opacity",
                isStatic || prefersReduced ? "duration-0" : "duration-500",
                activeDots.has(i)
                  ? cn("opacity-100", activeColor)
                  : "opacity-10 bg-white",
              )}
            />
          ))}
        </div>
      </div>
    );
  },
);
MatrixGrid.displayName = "MatrixGrid";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { MatrixGrid };
