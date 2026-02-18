import { useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { generateTopoContours } from "@/components/home/signature";

const TopoPatternDemo = () => {
  const { t } = useTranslation("signature");
  const w = 600,
    h = 300;
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const contours = useMemo(() => generateTopoContours(w, h, 16), []);

  // Compute bounding center for each contour path (midpoint of all points)
  const contoursWithCenter = useMemo(() => {
    return contours.map((c) => {
      // Parse path to extract rough center
      const nums = c.d.match(/-?\d+\.?\d*/g);
      if (!nums || nums.length < 4) return { ...c, cx: w / 2, cy: h / 2 };
      let sumX = 0,
        sumY = 0,
        count = 0;
      for (let i = 0; i < nums.length - 1; i += 2) {
        sumX += parseFloat(nums[i]);
        sumY += parseFloat(nums[i + 1]);
        count++;
      }
      return { ...c, cx: sumX / count, cy: sumY / count };
    });
  }, [contours]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * w,
        y: ((e.clientY - rect.top) / rect.height) * h,
      });
    },
    [w, h],
  );

  return (
    <div className="flex justify-center overflow-hidden py-4">
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="w-full max-w-[600px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouse(null)}
      >
        {/* Grain texture */}
        <filter id="demoGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={w} height={h} filter="url(#demoGrain)" opacity={0.03} />

        {/* Contour lines */}
        {contoursWithCenter.map((c, i) => {
          const dist = mouse ? Math.hypot(c.cx - mouse.x, c.cy - mouse.y) : 999;
          const radius = 120;
          const isNear = dist < radius;
          const intensity = isNear ? Math.max(0, 1 - dist / radius) : 0;
          return (
            <path
              key={i}
              d={c.d}
              fill="none"
              stroke={
                isNear
                  ? `hsl(var(--primary) / ${(0.12 + intensity * 0.5).toFixed(2)})`
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

        {/* Elevation labels */}
        {[
          { x: 200, y: 120, label: t("demo.topo_el_720") },
          { x: 400, y: 200, label: t("demo.topo_el_580") },
          { x: 520, y: 90, label: t("demo.topo_el_440") },
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

        {/* Diamond markers at peaks */}
        {[
          { x: 200, y: 120 },
          { x: 400, y: 200 },
          { x: 520, y: 90 },
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
