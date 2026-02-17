import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Crosshair, Terminal } from "lucide-react";

// ─── GLITCH TEXT ─────────────────────────────────
export const GlitchText = ({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{children}</span>
    <span
      aria-hidden
      className="absolute inset-0 text-ef-cyan opacity-70 animate-glitch"
      style={{
        clipPath: "inset(20% 0 50% 0)",
        transform: "translate(-2px, 0)",
      }}
    >
      {children}
    </span>
    <span
      aria-hidden
      className="absolute inset-0 text-ef-red opacity-70 animate-glitch"
      style={{
        clipPath: "inset(50% 0 20% 0)",
        transform: "translate(2px, 0)",
        animationDelay: "0.1s",
      }}
    >
      {children}
    </span>
  </span>
);

// ─── DIAMOND LOADER ──────────────────────────────
export const DiamondLoader = ({
  size = "md",
  label,
}: {
  size?: "sm" | "md" | "lg";
  label?: string;
}) => {
  const sizeMap = { sm: 16, md: 28, lg: 44 };
  const s = sizeMap[size];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: s * 2, height: s * 2 }}>
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
        <span className="font-mono text-xs text-muted-foreground tracking-[0.15em] uppercase">
          {label}
        </span>
      )}
    </div>
  );
};

// ─── TACTICAL PANEL (HUD) ────────────────────────
export const TacticalPanel = ({
  title,
  status = "online",
  children,
}: {
  title: string;
  status?: "online" | "warning" | "offline" | "scanning";
  children: React.ReactNode;
}) => {
  const statusColors: Record<string, string> = {
    online: "bg-ef-green",
    warning: "bg-ef-yellow",
    offline: "bg-ef-red",
    scanning: "bg-ef-cyan animate-pulse",
  };
  const statusLabels: Record<string, string> = {
    online: "ONLINE",
    warning: "CAUTION",
    offline: "OFFLINE",
    scanning: "SCANNING",
  };

  return (
    <div className="relative border border-border bg-surface-1 scanline-overlay">
      {/* HUD Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-0">
        <div className="flex items-center gap-3">
          <Crosshair className="w-3.5 h-3.5 text-primary" />
          <span className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-foreground">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 ${statusColors[status]}`}
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
            {statusLabels[status]}
          </span>
        </div>
      </div>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/40 pointer-events-none" />
      {/* Content */}
      <div className="p-5">{children}</div>
    </div>
  );
};

// ─── HOLO CARD ───────────────────────────────────
export const HoloCard = ({
  title,
  subtitle,
  icon: Icon,
  value,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  value?: string;
}) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      className="relative clip-corner border border-border bg-surface-1 p-6 overflow-hidden group cursor-pointer transition-all duration-500 hover:border-primary/30"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none transition-all"
        style={{
          top: hovering ? "100%" : "-10%",
          opacity: hovering ? 1 : 0,
          transitionDuration: "2000ms",
        }}
      />
      {/* Holographic shimmer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, hsl(var(--primary) / 0.03) 40%, transparent 60%)",
          opacity: hovering ? 1 : 0,
        }}
      />
      <div className="relative z-10">
        <Icon className="w-5 h-5 text-primary mb-4 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all" />
        {value && (
          <p className="font-display text-3xl font-bold text-primary mb-1">
            {value}
          </p>
        )}
        <h4 className="font-display text-sm font-bold tracking-[0.05em] uppercase text-foreground mb-1">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {/* Bottom diamond */}
      <div className="absolute bottom-3 right-3 text-primary/20 group-hover:text-primary/60 transition-colors text-xs">
        ◆
      </div>
    </div>
  );
};

// ─── DATA STREAM ─────────────────────────────────
export const DataStream = () => {
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const msgs = [
      "[SYS] Initializing ENDFIELD protocol...",
      "[NET] Connection established — latency: 12ms",
      "[SEC] Authentication verified ◆ Level: ALPHA",
      "[DAT] Loading design tokens: 94 variables mapped",
      "[GPU] Render pipeline: Optimized (60fps locked)",
      "[SYS] Component registry: 70 modules online",
      "[NET] Sync complete — all nodes operational",
      "[DAT] Color system: HSL-based, 9 neutrals, 9 accents",
      "[SEC] Encryption: AES-256 ◆ Status: ACTIVE",
      "[SYS] ENDFIELD DESIGN SYSTEM v2.0 ◆ READY",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, msgs[i % msgs.length]];
        return next.length > 8 ? next.slice(-8) : next;
      });
      i++;
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="border border-border bg-background clip-corner overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-surface-0">
        <Terminal className="w-3.5 h-3.5 text-primary" />
        <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
          LIVE FEED
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 bg-ef-green animate-pulse"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
          <span className="font-mono text-[10px] text-ef-green">ACTIVE</span>
        </div>
      </div>
      <div
        ref={containerRef}
        className="p-4 h-48 overflow-y-auto font-mono text-xs space-y-1"
      >
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={`${line}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${
                line.includes("[SEC]")
                  ? "text-ef-green"
                  : line.includes("[NET]")
                    ? "text-ef-blue"
                    : line.includes("[DAT]")
                      ? "text-ef-cyan"
                      : line.includes("[GPU]")
                        ? "text-ef-purple"
                        : "text-muted-foreground"
              }`}
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        <span className="inline-block w-2 h-4 bg-primary animate-cursor-blink" />
      </div>
    </div>
  );
};

// ─── TACTICAL BADGE ──────────────────────────────
export const TacticalBadge = ({
  variant = "default",
  children,
}: {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  children: React.ReactNode;
}) => {
  const colors: Record<string, string> = {
    default: "border-primary/40 text-primary bg-primary/10",
    success: "border-ef-green/40 text-ef-green bg-ef-green/10",
    warning: "border-ef-yellow/40 text-ef-yellow bg-ef-yellow/10",
    danger: "border-ef-red/40 text-ef-red bg-ef-red/10",
    info: "border-ef-cyan/40 text-ef-cyan bg-ef-cyan/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 clip-corner-sm border px-3 py-1 font-display text-[10px] font-bold tracking-[0.15em] uppercase ${colors[variant]}`}
    >
      <span style={{ fontSize: "6px" }}>◆</span>
      {children}
    </span>
  );
};

// ─── WARNING BANNER ──────────────────────────────
export const WarningBanner = ({
  level = "caution",
  children,
}: {
  level?: "caution" | "alert" | "critical";
  children: React.ReactNode;
}) => {
  const styles: Record<
    string,
    { border: string; bg: string; icon: string; label: string }
  > = {
    caution: {
      border: "border-ef-yellow/30",
      bg: "bg-ef-yellow/5",
      icon: "text-ef-yellow",
      label: "CAUTION",
    },
    alert: {
      border: "border-ef-orange/30",
      bg: "bg-ef-orange/5",
      icon: "text-ef-orange",
      label: "ALERT",
    },
    critical: {
      border: "border-ef-red/30",
      bg: "bg-ef-red/5",
      icon: "text-ef-red",
      label: "CRITICAL",
    },
  };
  const s = styles[level];
  return (
    <div
      className={`clip-corner border ${s.border} ${s.bg} p-4 flex items-start gap-3`}
    >
      <AlertTriangle className={`w-5 h-5 ${s.icon} shrink-0 mt-0.5`} />
      <div>
        <span
          className={`font-display text-[11px] font-bold tracking-[0.15em] ${s.icon}`}
        >
          {s.label}
        </span>
        <p className="text-sm text-muted-foreground mt-1">{children}</p>
      </div>
    </div>
  );
};

// ─── SCAN LINE DIVIDER ───────────────────────────
export const ScanDivider = ({ label }: { label?: string }) => (
  <div className="relative flex items-center gap-4 py-2">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    {label && (
      <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-primary/60 flex items-center gap-2">
        <span style={{ fontSize: "6px" }}>◆</span> {label}{" "}
        <span style={{ fontSize: "6px" }}>◆</span>
      </span>
    )}
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  </div>
);

// ─── COORDINATE TAG ──────────────────────────────
export const CoordinateTag = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) => (
  <div className="inline-flex items-center border border-border bg-surface-0 overflow-hidden">
    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted-foreground bg-surface-2 px-2.5 py-1.5 border-r border-border">
      {label}
    </span>
    <span className="font-mono text-xs text-primary px-2.5 py-1.5 font-bold">
      {value}
    </span>
    {unit && (
      <span className="font-mono text-[10px] text-muted-foreground pr-2.5">
        {unit}
      </span>
    )}
  </div>
);
