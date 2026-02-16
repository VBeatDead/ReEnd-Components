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

export const TopoBg = ({ className = "" }: { className?: string }) => {
  const paths = useMemo(() => {
    const peaks = [
      { cx: 200, cy: 150, rings: 6, scale: 1.2 },
      { cx: 500, cy: 250, rings: 5, scale: 1.0 },
      { cx: 700, cy: 120, rings: 4, scale: 0.8 },
      { cx: 350, cy: 350, rings: 3, scale: 0.7 },
      { cx: 100, cy: 320, rings: 4, scale: 0.9 },
    ];
    const result: { d: string; major: boolean }[] = [];
    peaks.forEach((peak) => {
      for (let r = 1; r <= peak.rings; r++) {
        const radius = r * 28 * peak.scale;
        const segments = 60;
        const pts: string[] = [];
        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const noise =
            Math.sin(angle * 3 + peak.cx * 0.01) * radius * 0.15 +
            Math.sin(angle * 5 + peak.cy * 0.02) * radius * 0.08 +
            Math.cos(angle * 2 + r) * radius * 0.12;
          const x = peak.cx + (radius + noise) * Math.cos(angle);
          const y = peak.cy + (radius + noise) * Math.sin(angle) * 0.7;
          pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }
        result.push({ d: `M ${pts.join(" L ")} Z`, major: r % 3 === 0 });
      }
    });
    return result;
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        className="opacity-[0.04]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 400"
      >
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth={p.major ? 1 : 0.5}
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
  const path = dp.map((p) => `${p.x},${p.y}`).join(" ");

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
        <motion.polygon
          points={isInView ? path : data.map(() => `${cx},${cy}`).join(" ")}
          fill={`hsl(var(${color}) / 0.15)`}
          stroke={`hsl(var(${color}))`}
          strokeWidth={2}
          animate={isInView ? { points: path } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          style={{ filter: `drop-shadow(0 0 6px hsl(var(${color}) / 0.3))` }}
        />
        {dp.map((p, i) => (
          <motion.circle
            key={i}
            cx={isInView ? p.x : cx}
            cy={isInView ? p.y : cy}
            r={3}
            fill={`hsl(var(${color}))`}
            stroke="hsl(var(--background))"
            strokeWidth={2}
            animate={isInView ? { cx: p.x, cy: p.y } : {}}
            transition={{ duration: 0.8, delay: i * 0.05 }}
            style={{ filter: `drop-shadow(0 0 4px hsl(var(${color}) / 0.5))` }}
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
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none transition-all duration-[2000ms]"
        style={{ top: hovering ? "100%" : "-10%", opacity: hovering ? 1 : 0 }}
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
