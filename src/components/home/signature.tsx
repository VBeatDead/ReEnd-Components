import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export const GlitchText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{text}</span>
    <span
      className="absolute inset-0 text-ef-cyan/40 animate-glitch"
      style={{ clipPath: "inset(20% 0 40% 0)" }}
      aria-hidden
    >
      {text}
    </span>
    <span
      className="absolute inset-0 text-ef-red/30 animate-glitch"
      style={{ clipPath: "inset(60% 0 10% 0)", animationDelay: "0.1s" }}
      aria-hidden
    >
      {text}
    </span>
  </span>
);

export const DiamondLoader = ({
  size = 28,
  label,
}: {
  size?: number;
  label?: string;
}) => (
  <div className="flex flex-col items-center gap-3">
    <div className="relative" style={{ width: size * 2, height: size * 2 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-0 border-2 border-primary"
          style={{
            transform: `rotate(45deg) scale(${1 - i * 0.25})`,
            animation: `diamondSpin ${1.2 + i * 0.4}s linear infinite ${i === 1 ? "reverse" : ""}`,
            opacity: 1 - i * 0.25,
          }}
        />
      ))}
    </div>
    {label && (
      <span className="font-mono text-[10px] text-muted-foreground tracking-[0.15em] uppercase">
        {label}
      </span>
    )}
  </div>
);

export const Counter = ({ value, label }: { value: number; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    let raf: number;
    const start = performance.now();
    const duration = 1200; // ms

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * value);
      setCount(current);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-3xl sm:text-4xl font-bold text-primary">
        {count}+
      </span>
      <p className="font-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-2">
        {label}
      </p>
    </div>
  );
};

export const generateTopoContours = (
  vw: number,
  vh: number,
  levels: number = 18,
): { d: string; major: boolean }[] => {
  // Multi-octave sinusoidal noise → terrain-like height field
  const noise = (x: number, y: number): number =>
    Math.sin(x * 0.008 + y * 0.006) * 0.4 +
    Math.cos(x * 0.005 - y * 0.012 + 2.1) * 0.35 +
    Math.sin(x * 0.018 + y * 0.015 + 1.3) * 0.2 +
    Math.cos(x * 0.012 - y * 0.022 + 3.7) * 0.15 +
    Math.sin(x * 0.035 + y * 0.028 - 0.5) * 0.08 +
    Math.cos(x * 0.025 - y * 0.038 + 1.9) * 0.06 +
    Math.sin(x * 0.055 + y * 0.045 + 2.7) * 0.03;

  const step = 6;
  const cols = Math.ceil(vw / step) + 1;
  const rows = Math.ceil(vh / step) + 1;

  const field: number[][] = [];
  let fmin = Infinity,
    fmax = -Infinity;
  for (let j = 0; j < rows; j++) {
    field[j] = [];
    for (let i = 0; i < cols; i++) {
      const v = noise(i * step, j * step);
      field[j][i] = v;
      if (v < fmin) fmin = v;
      if (v > fmax) fmax = v;
    }
  }

  // Marching squares edge table (16 cases)
  // Edges: 0=top, 1=right, 2=bottom, 3=left
  const edgeTable: number[][] = [
    [],
    [3, 2],
    [2, 1],
    [3, 1],
    [1, 0],
    [3, 0, 1, 2],
    [2, 0],
    [3, 0],
    [0, 3],
    [0, 2],
    [0, 1, 2, 3],
    [0, 1],
    [1, 3],
    [1, 2],
    [2, 3],
    [],
  ];

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Catmull-Rom → cubic bézier for smooth organic curves
  const smoothPath = (pts: [number, number][]): string => {
    if (pts.length < 2) return "";
    if (pts.length === 2)
      return `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)} L ${pts[1][0].toFixed(1)},${pts[1][1].toFixed(1)}`;
    let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      const t = 6;
      d += ` C ${(p1[0] + (p2[0] - p0[0]) / t).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / t).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / t).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / t).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  };

  const result: { d: string; major: boolean }[] = [];

  for (let l = 0; l < levels; l++) {
    const threshold = fmin + ((l + 1) * (fmax - fmin)) / (levels + 1);
    const isMajor = l % 4 === 0;

    // Collect line segments via marching squares
    const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let j = 0; j < rows - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        const tl = field[j][i],
          tr = field[j][i + 1];
        const br = field[j + 1][i + 1],
          bl = field[j + 1][i];
        let idx = 0;
        if (tl >= threshold) idx |= 8;
        if (tr >= threshold) idx |= 4;
        if (br >= threshold) idx |= 2;
        if (bl >= threshold) idx |= 1;
        const edges = edgeTable[idx];
        if (edges.length === 0) continue;

        const getEdgePt = (edge: number): [number, number] => {
          const x0 = i * step,
            y0 = j * step;
          switch (edge) {
            case 0: {
              const t = (threshold - tl) / (tr - tl || 1e-10);
              return [lerp(x0, x0 + step, t), y0];
            }
            case 1: {
              const t = (threshold - tr) / (br - tr || 1e-10);
              return [x0 + step, lerp(y0, y0 + step, t)];
            }
            case 2: {
              const t = (threshold - bl) / (br - bl || 1e-10);
              return [lerp(x0, x0 + step, t), y0 + step];
            }
            case 3: {
              const t = (threshold - tl) / (bl - tl || 1e-10);
              return [x0, lerp(y0, y0 + step, t)];
            }
            default:
              return [0, 0];
          }
        };

        for (let e = 0; e < edges.length; e += 2) {
          const [x1, y1] = getEdgePt(edges[e]);
          const [x2, y2] = getEdgePt(edges[e + 1]);
          segments.push({ x1, y1, x2, y2 });
        }
      }
    }

    // Chain segments into continuous contour paths
    const key = (x: number, y: number) =>
      `${Math.round(x * 10)},${Math.round(y * 10)}`;
    const endMap = new Map<string, number[]>();
    segments.forEach((seg, si) => {
      for (const k of [key(seg.x1, seg.y1), key(seg.x2, seg.y2)]) {
        if (!endMap.has(k)) endMap.set(k, []);
        endMap.get(k)!.push(si);
      }
    });

    const used = new Set<number>();
    for (let si = 0; si < segments.length; si++) {
      if (used.has(si)) continue;
      used.add(si);
      const chain: [number, number][] = [
        [segments[si].x1, segments[si].y1],
        [segments[si].x2, segments[si].y2],
      ];

      // Extend forward
      let extending = true;
      while (extending) {
        extending = false;
        const k = key(chain[chain.length - 1][0], chain[chain.length - 1][1]);
        for (const ni of endMap.get(k) || []) {
          if (used.has(ni)) continue;
          used.add(ni);
          const ns = segments[ni];
          chain.push(key(ns.x1, ns.y1) === k ? [ns.x2, ns.y2] : [ns.x1, ns.y1]);
          extending = true;
          break;
        }
      }

      // Extend backward
      extending = true;
      while (extending) {
        extending = false;
        const k = key(chain[0][0], chain[0][1]);
        for (const ni of endMap.get(k) || []) {
          if (used.has(ni)) continue;
          used.add(ni);
          const ns = segments[ni];
          chain.unshift(
            key(ns.x1, ns.y1) === k ? [ns.x2, ns.y2] : [ns.x1, ns.y1],
          );
          extending = true;
          break;
        }
      }

      if (chain.length < 4) continue;
      result.push({ d: smoothPath(chain), major: isMajor });
    }
  }

  return result;
};

export const TopoBg = ({ className = "" }: { className?: string }) => {
  const contours = useMemo(() => generateTopoContours(1200, 600, 20), []);
  const filterId = useMemo(
    () => `topoGrain_${Math.random().toString(36).slice(2, 8)}`,
    [],
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Grain texture overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035]"
        aria-hidden
      >
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
      {/* Contour lines */}
      <svg
        width="100%"
        height="100%"
        className="opacity-[0.07]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 600"
      >
        {contours.map((c, i) => (
          <path
            key={i}
            d={c.d}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth={c.major ? 1.2 : 0.5}
          />
        ))}
      </svg>
    </div>
  );
};

export const MiniRadar = ({
  data,
  size = 200,
  color = "--primary",
}: {
  data: { label: string; value: number }[];
  size?: number;
  color?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const cx = size / 2,
    cy = size / 2,
    r = size * 0.36;
  const n = data.length;
  const step = (Math.PI * 2) / n;
  const pt = (i: number, rad: number) => ({
    x: cx + rad * Math.sin(i * step),
    y: cy - rad * Math.cos(i * step),
  });
  const grid = Array.from({ length: 4 }, (_, l) => {
    const lr = r * ((l + 1) / 4);
    return data
      .map((_, i) => pt(i, lr))
      .map((p) => `${p.x},${p.y}`)
      .join(" ");
  });
  const dp = data.map((d, i) => pt(i, (d.value / 100) * r));
  // Use path d attribute (CSS-animatable) instead of polygon points
  const centerD = `M ${data.map(() => `${cx},${cy}`).join(" L ")} Z`;
  const dataD = `M ${dp.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;
  const ease = "cubic-bezier(0.25, 0.8, 0.25, 1)";

  return (
    <div ref={ref}>
      <svg width={size} height={size} className="overflow-visible">
        {grid.map((pts, i) => (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={1}
            opacity={0.4}
          />
        ))}
        {data.map((_, i) => {
          const p = pt(i, r);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              opacity={0.2}
            />
          );
        })}
        {/* Data shape — uses <path> with CSS d transition instead of motion.polygon */}
        <path
          d={isInView ? dataD : centerD}
          fill={`hsl(var(${color}) / 0.15)`}
          stroke={`hsl(var(${color}))`}
          strokeWidth={2}
          style={{
            transition: `d 0.8s ${ease}`,
            filter: `drop-shadow(0 0 6px hsl(var(${color}) / 0.3))`,
          }}
        />
        {/* Data points — uses CSS cx/cy transitions instead of motion.circle */}
        {dp.map((p, i) => (
          <circle
            key={i}
            cx={isInView ? p.x : cx}
            cy={isInView ? p.y : cy}
            r={3}
            fill={`hsl(var(${color}))`}
            stroke="hsl(var(--background))"
            strokeWidth={2}
            style={{
              transition: `cx 0.8s ${ease} ${i * 0.05}s, cy 0.8s ${ease} ${i * 0.05}s`,
              filter: `drop-shadow(0 0 4px hsl(var(${color}) / 0.5))`,
            }}
          />
        ))}
        {data.map((d, i) => {
          const p = pt(i, r + 18);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-display text-[8px] font-bold tracking-[0.1em] uppercase"
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

export const DataStreamMini = () => {
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const msgs = [
      "[SYS] ENDFIELD protocol initialized",
      "[NET] Latency: 12ms ◆ STABLE",
      "[SEC] Auth verified — Level: ALPHA",
      "[DAT] 94 design tokens loaded",
      "[GPU] Render: 60fps locked",
      "[SYS] 70+ modules online",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, msgs[i % msgs.length]];
        return next.length > 5 ? next.slice(-5) : next;
      });
      i++;
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);
  return (
    <div className="border border-border bg-background clip-corner overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-surface-0">
        <Terminal className="w-3 h-3 text-primary" />
        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
          LIVE FEED
        </span>
        <div className="ml-auto flex items-center gap-1">
          <div
            className="w-1.5 h-1.5 bg-ef-green animate-pulse"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
          <span className="font-mono text-[9px] text-ef-green">ACTIVE</span>
        </div>
      </div>
      <div
        ref={ref}
        className="p-3 h-32 overflow-hidden font-mono text-[11px] space-y-0.5"
      >
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={`${line}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={
                line.includes("[SEC]")
                  ? "text-ef-green"
                  : line.includes("[NET]")
                    ? "text-ef-blue"
                    : line.includes("[DAT]")
                      ? "text-ef-cyan"
                      : "text-muted-foreground"
              }
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        <span className="inline-block w-1.5 h-3 bg-primary animate-cursor-blink" />
      </div>
    </div>
  );
};

export const HoloCard = ({
  icon: Icon,
  title,
  subtitle,
  value,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  value?: string;
}) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      className="relative clip-corner border border-border bg-surface-1 p-5 overflow-hidden group cursor-pointer transition-all duration-500 hover:border-primary/30"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none transition-all"
        style={{
          top: hovering ? "100%" : "-10%",
          opacity: hovering ? 1 : 0,
          transitionDuration: "2000ms",
        }}
      />
      <div className="relative z-10">
        <Icon className="w-4 h-4 text-primary mb-3 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all" />
        {value && (
          <p className="font-display text-2xl font-bold text-primary mb-0.5">
            {value}
          </p>
        )}
        <h4 className="font-display text-xs font-bold tracking-[0.08em] uppercase text-foreground mb-1">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="absolute bottom-2 right-3 text-primary/20 group-hover:text-primary/60 transition-colors text-[8px]">
        ◆
      </div>
    </div>
  );
};

export const TacticalBadge = ({
  variant = "default",
  children,
}: {
  variant?: string;
  children: React.ReactNode;
}) => {
  const colors: Record<string, string> = {
    default: "border-primary/40 text-primary bg-primary/10",
    success: "border-ef-green/40 text-ef-green bg-ef-green/10",
    info: "border-ef-cyan/40 text-ef-cyan bg-ef-cyan/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 clip-corner-sm border px-2.5 py-1 font-display text-[9px] font-bold tracking-[0.15em] uppercase ${colors[variant] || colors.default}`}
    >
      <span style={{ fontSize: "5px" }}>◆</span>
      {children}
    </span>
  );
};

export const HUDFrame = ({ children }: { children: React.ReactNode }) => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative border border-border bg-surface-0 aspect-video flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 scanline-overlay" />
      {[
        "top-3 left-3 border-t-2 border-l-2",
        "top-3 right-3 border-t-2 border-r-2",
        "bottom-3 left-3 border-b-2 border-l-2",
        "bottom-3 right-3 border-b-2 border-r-2",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute w-8 h-8 ${pos} border-primary/40 pointer-events-none`}
        />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-6 h-px bg-primary/20 absolute top-1/2 -left-3" />
        <div className="h-6 w-px bg-primary/20 absolute left-1/2 -top-3" />
      </div>
      <div className="absolute top-4 left-12 font-mono text-[9px] text-muted-foreground/60 space-y-0.5">
        <div>SYS::ENDFIELD v2.0</div>
        <div className="text-primary/60">{time}</div>
      </div>
      <div className="absolute top-4 right-12 font-mono text-[9px] text-muted-foreground/60 text-right space-y-0.5">
        <div>LAT 37.7749°N</div>
        <div>LON 122.4194°W</div>
      </div>
      <div className="absolute bottom-4 left-12 right-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 bg-ef-green"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
          <span className="font-mono text-[9px] text-ef-green/80">
            LINK ACTIVE
          </span>
        </div>
        <div className="flex gap-4">
          {["FPS:60", "MEM:47%", "NET:12ms"].map((s) => (
            <span
              key={s}
              className="font-mono text-[9px] text-muted-foreground/50"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
