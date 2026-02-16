import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const RadarChart = ({
  data,
  size = 260,
  color = "primary",
}: {
  data: { label: string; value: number }[];
  size?: number;
  color?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
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

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid */}
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
          points={isInView ? dataPath : data.map(() => `${cx},${cy}`).join(" ")}
          fill={`hsl(var(${colorVar}) / 0.15)`}
          stroke={`hsl(var(${colorVar}))`}
          strokeWidth={2}
          initial={false}
          animate={{ points: isInView ? dataPath : undefined }}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          style={{ filter: `drop-shadow(0 0 8px hsl(var(${colorVar}) / 0.3))` }}
        />
        {/* Data points */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={isInView ? p.x : cx}
            cy={isInView ? p.y : cy}
            r={4}
            fill={`hsl(var(${colorVar}))`}
            stroke="hsl(var(--background))"
            strokeWidth={2}
            initial={false}
            animate={isInView ? { cx: p.x, cy: p.y } : {}}
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
};

export default RadarChart;
