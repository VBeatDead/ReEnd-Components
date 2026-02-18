import * as React from "react";
import { motion, useInView } from "framer-motion";

export interface RadarChartDataPoint {
  label: string;
  value: number;
}

export interface RadarChartProps {
  data: RadarChartDataPoint[];
  size?: number;
  color?: "primary" | "cyan";
  className?: string;
}

export const RadarChart = React.forwardRef<HTMLDivElement, RadarChartProps>(
  ({ data, size = 260, color = "primary", className }, forwardedRef) => {
    // useInView requires a RefObject — maintain an internal ref and merge with
    // the forwarded ref via a callback so both are kept in sync.
    const innerRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(innerRef, { once: true });

    const mergeRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
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

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;
    const levels = 4;
    const n = data.length;
    const angleStep = (Math.PI * 2) / n;

    const colorVar = color === "cyan" ? "--ef-cyan" : "--primary";

    const getPoint = (i: number, radius: number) => ({
      x: cx + radius * Math.sin(i * angleStep),
      y: cy - radius * Math.cos(i * angleStep),
    });

    const gridPolygons = Array.from({ length: levels }, (_, level) => {
      const lr = r * ((level + 1) / levels);
      return data
        .map((_, i) => getPoint(i, lr))
        .map((p) => `${p.x},${p.y}`)
        .join(" ");
    });

    const dataPoints = data.map((d, i) => getPoint(i, (d.value / 100) * r));
    const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
    const centerPath = data.map(() => `${cx},${cy}`).join(" ");

    return (
      <div
        ref={mergeRef}
        className={`flex flex-col items-center w-full${className ? ` ${className}` : ""}`}
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
          {/* Axes */}
          {data.map((_, i) => {
            const p = getPoint(i, r);
            return (
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
            );
          })}
          {/* Data area */}
          <motion.polygon
            points={isInView ? dataPath : centerPath}
            fill={`hsl(var(${colorVar}) / 0.15)`}
            stroke={`hsl(var(${colorVar}))`}
            strokeWidth={2}
            initial={false}
            animate={{ points: isInView ? dataPath : centerPath }}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
            style={{
              filter: `drop-shadow(0 0 8px hsl(var(${colorVar}) / 0.3))`,
            }}
          />
          {/* Data points */}
          {dataPoints.map((p, i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={4}
              fill={`hsl(var(${colorVar}))`}
              stroke="hsl(var(--background))"
              strokeWidth={2}
              initial={false}
              animate={{ cx: isInView ? p.x : cx, cy: isInView ? p.y : cy }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              style={{
                filter: `drop-shadow(0 0 4px hsl(var(${colorVar}) / 0.5))`,
              }}
            />
          ))}
          {/* Labels */}
          {data.map((d, i) => {
            const p = getPoint(i, r + 20);
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
                {d.label}
              </text>
            );
          })}
        </svg>
      </div>
    );
  },
);
RadarChart.displayName = "RadarChart";
