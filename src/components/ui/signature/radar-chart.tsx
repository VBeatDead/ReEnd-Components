import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface RadarChartDataPoint {
  label: string;
  value: number;
}

export interface RadarAxisConfig {
  label: string;
  min?: number;
  max?: number;
}

export interface RadarDataset {
  label?: string;
  values: number[];
  color?: string;
  fillOpacity?: number;
}

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface RadarChartProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "color"
> {
  data?: RadarChartDataPoint[];
  color?: "primary" | "cyan";

  axes?: RadarAxisConfig[];
  datasets?: RadarDataset[];
  showLegend?: boolean;

  size?: number;
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function getPoint(
  cx: number,
  cy: number,
  r: number,
  angleStep: number,
  i: number,
) {
  return {
    x: cx + r * Math.sin(i * angleStep),
    y: cy - r * Math.cos(i * angleStep),
  };
}

function toPoints(pts: { x: number; y: number }[]) {
  return pts.map((p) => `${p.x},${p.y}`).join(" ");
}

/* ── Component ───────────────────────────────────────────────────────────── */

const RadarChart = React.forwardRef<HTMLDivElement, RadarChartProps>(
  (
    {
      data,
      color = "primary",
      axes,
      datasets,
      showLegend = false,
      size = 260,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const innerRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(innerRef, { once: true });

    const mergeRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current =
          el;
        if (typeof forwardedRef === "function") {
          forwardedRef(el);
        } else if (forwardedRef) {
          (
            forwardedRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = el;
        }
      },
      [forwardedRef],
    );

    /* ── Normalise input (legacy → new) ── */
    const resolvedAxes: RadarAxisConfig[] =
      axes ?? data?.map((d) => ({ label: d.label, min: 0, max: 100 })) ?? [];

    const resolvedDatasets: RadarDataset[] =
      datasets ??
      (data
        ? [
            {
              label: undefined,
              values: data.map((d) => d.value),
              color:
                color === "cyan"
                  ? "hsl(var(--ef-cyan))"
                  : "hsl(var(--primary))",
            },
          ]
        : []);

    const n = resolvedAxes.length;
    if (n < 3) return null;

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;
    const levels = 4;
    const angleStep = (Math.PI * 2) / n;

    /* Grid ring polygons */
    const gridPolygons = Array.from({ length: levels }, (_, lvl) => {
      const lr = r * ((lvl + 1) / levels);
      return toPoints(
        resolvedAxes.map((_, i) => getPoint(cx, cy, lr, angleStep, i)),
      );
    });

    /* Axis lines */
    const axisLines = resolvedAxes.map((_, i) =>
      getPoint(cx, cy, r, angleStep, i),
    );

    /* Per-dataset polygon paths */
    const datasetPaths = resolvedDatasets.map((ds) => {
      const dataPoints = resolvedAxes.map((axis, i) => {
        const min = axis.min ?? 0;
        const max = axis.max ?? 100;
        const norm = max > min ? (ds.values[i] - min) / (max - min) : 0;
        return getPoint(
          cx,
          cy,
          Math.max(0, Math.min(1, norm)) * r,
          angleStep,
          i,
        );
      });
      return {
        ds,
        path: toPoints(dataPoints),
        center: toPoints(resolvedAxes.map(() => ({ x: cx, y: cy }))),
      };
    });

    /* Default dataset colors */
    const defaultColors = [
      "hsl(var(--primary))",
      "hsl(var(--ef-blue))",
      "hsl(var(--ef-green))",
    ];

    return (
      <div
        ref={mergeRef}
        className={cn("flex flex-col items-center w-full", className)}
        {...props}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full max-w-[260px] h-auto overflow-visible"
        >
          {/* Grid rings */}
          {gridPolygons.map((pts, i) => (
            <polygon
              key={i}
              points={pts}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={1}
              opacity={0.5}
            />
          ))}

          {/* Axis lines */}
          {axisLines.map((p, i) => (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              opacity={0.3}
            />
          ))}

          {/* Data polygons — one per dataset */}
          {datasetPaths.map(({ ds, path, center }, di) => {
            const fillColor =
              ds.color ?? defaultColors[di % defaultColors.length];
            const fillOpacity = ds.fillOpacity ?? 0.15;
            return (
              <motion.polygon
                key={di}
                points={isInView ? path : center}
                fill={fillColor}
                fillOpacity={fillOpacity}
                stroke={fillColor}
                strokeWidth={2}
                initial={false}
                animate={{ points: isInView ? path : center }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.8, 0.25, 1],
                  delay: di * 0.1,
                }}
                style={{
                  filter: `drop-shadow(0 0 8px ${fillColor.replace(")", " / 0.3)")})`,
                }}
              />
            );
          })}

          {/* Data point circles — first dataset only */}
          {datasetPaths[0] &&
            (() => {
              const { ds, path: _ } = datasetPaths[0];
              const fillColor = ds.color ?? defaultColors[0];
              return resolvedAxes.map((axis, i) => {
                const min = axis.min ?? 0;
                const max = axis.max ?? 100;
                const norm = max > min ? (ds.values[i] - min) / (max - min) : 0;
                const p = getPoint(
                  cx,
                  cy,
                  Math.max(0, Math.min(1, norm)) * r,
                  angleStep,
                  i,
                );
                return (
                  <motion.circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={fillColor}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                    initial={false}
                    animate={{
                      cx: isInView ? p.x : cx,
                      cy: isInView ? p.y : cy,
                    }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    style={{
                      filter: `drop-shadow(0 0 4px ${fillColor.replace(")", " / 0.5)")})`,
                    }}
                  />
                );
              });
            })()}

          {/* Axis labels */}
          {resolvedAxes.map((axis, i) => {
            const p = getPoint(cx, cy, r + 20, angleStep, i);
            return (
              <text
                key={i}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-display text-[9px] font-bold tracking-[0.1em] uppercase"
                fill="hsl(var(--muted-foreground))"
              >
                {axis.label}
              </text>
            );
          })}
        </svg>

        {/* Legend row */}
        {showLegend && resolvedDatasets.some((ds) => ds.label) && (
          <div className="flex items-center gap-4 mt-3">
            {resolvedDatasets.map((ds, di) => {
              if (!ds.label) return null;
              const c = ds.color ?? defaultColors[di % defaultColors.length];
              return (
                <div key={di} className="flex items-center gap-1.5">
                  <span
                    className="inline-block w-2.5 h-2.5"
                    style={{ backgroundColor: c }}
                  />
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                    {ds.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);
RadarChart.displayName = "RadarChart";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { RadarChart };
