import { useMemo, useState } from "react";

const TopoPatternDemo = () => {
  const w = 600,
    h = 300;
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const contours = useMemo(() => {
    const peaks = [
      { cx: 180, cy: 140, rings: 7, scale: 1.1 },
      { cx: 420, cy: 180, rings: 6, scale: 1.0 },
      { cx: 540, cy: 100, rings: 4, scale: 0.75 },
      { cx: 300, cy: 250, rings: 3, scale: 0.6 },
    ];
    const result: {
      d: string;
      major: boolean;
      cx: number;
      cy: number;
      r: number;
    }[] = [];
    peaks.forEach((peak) => {
      for (let r = 1; r <= peak.rings; r++) {
        const radius = r * 22 * peak.scale;
        const segs = 64;
        const pts: string[] = [];
        for (let s = 0; s <= segs; s++) {
          const a = (s / segs) * Math.PI * 2;
          const noise =
            Math.sin(a * 3 + peak.cx * 0.013) * radius * 0.18 +
            Math.sin(a * 5 + peak.cy * 0.017) * radius * 0.1 +
            Math.cos(a * 2 + r * 0.7) * radius * 0.14;
          const x = peak.cx + (radius + noise) * Math.cos(a);
          const y = peak.cy + (radius + noise) * Math.sin(a) * 0.65;
          pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }
        result.push({
          d: `M ${pts.join(" L ")} Z`,
          major: r % 3 === 0,
          cx: peak.cx,
          cy: peak.cy,
          r: radius,
        });
      }
    });
    return result;
  }, []);

  return (
    <div className="flex justify-center overflow-hidden py-4">
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="w-full max-w-[600px]"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMouse({
            x: ((e.clientX - rect.left) / rect.width) * w,
            y: ((e.clientY - rect.top) / rect.height) * h,
          });
        }}
        onMouseLeave={() => setMouse(null)}
      >
        {contours.map((c, i) => {
          const dist = mouse ? Math.hypot(c.cx - mouse.x, c.cy - mouse.y) : 999;
          const isNear = dist < c.r + 60;
          const intensity = isNear ? Math.max(0, 1 - dist / (c.r + 60)) : 0;
          return (
            <path
              key={i}
              d={c.d}
              fill="none"
              stroke={
                isNear
                  ? `hsl(var(--primary) / ${(0.15 + intensity * 0.55).toFixed(2)})`
                  : `hsl(var(--foreground) / 0.08)`
              }
              strokeWidth={c.major ? 1.2 : 0.5}
              className="transition-all duration-300"
              style={
                isNear && intensity > 0.3
                  ? {
                      filter: `drop-shadow(0 0 ${intensity * 6}px hsl(var(--primary) / 0.2))`,
                    }
                  : undefined
              }
            />
          );
        })}
        {[
          { x: 180, y: 140, label: "EL.720" },
          { x: 420, y: 180, label: "EL.580" },
          { x: 540, y: 100, label: "EL.440" },
        ].map((l, i) => (
          <text
            key={i}
            x={l.x}
            y={l.y}
            textAnchor="middle"
            className="font-mono text-[7px]"
            fill="hsl(var(--muted-foreground))"
            opacity={0.35}
          >
            {l.label}
          </text>
        ))}
        {[
          { x: 180, y: 140 },
          { x: 420, y: 180 },
          { x: 540, y: 100 },
        ].map((p, i) => (
          <rect
            key={i}
            x={p.x - 2}
            y={p.y + 6}
            width={4}
            height={4}
            fill="hsl(var(--primary))"
            opacity={0.25}
            transform={`rotate(45 ${p.x} ${p.y + 8})`}
          />
        ))}
      </svg>
    </div>
  );
};

export default TopoPatternDemo;
