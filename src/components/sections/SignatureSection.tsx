import { ComponentPreview } from "../docs/ComponentPreview";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Zap,
  Radio,
  Crosshair,
  Activity,
  Terminal,
  Wifi,
} from "lucide-react";

// ─── GLITCH TEXT ─────────────────────────────────
const GlitchText = ({
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
const DiamondLoader = ({
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
const TacticalPanel = ({
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
const HoloCard = ({
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
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none transition-all duration-[2000ms]"
        style={{ top: hovering ? "100%" : "-10%", opacity: hovering ? 1 : 0 }}
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
const DataStream = () => {
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
const TacticalBadge = ({
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
const WarningBanner = ({
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
const ScanDivider = ({ label }: { label?: string }) => (
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
const CoordinateTag = ({
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

// ═══ CORE COMPONENTS GROUP: Tactical Panel, Holo Card ═══
export const SignatureCoreSection = () => (
  <>
    {/* TACTICAL PANEL */}
    <ComponentPreview
      id="tactical-panel"
      title="Tactical Panel"
      description="Panel HUD dengan scanline overlay, corner accent 4-sisi, dan status indicator. Cocok untuk dashboard atau monitoring UI."
      code={`<TacticalPanel title="UNIT STATUS" status="online">
  <div>Panel content with scanline overlay
  and 4-corner accent brackets.</div>
</TacticalPanel>`}
      props={[
        {
          name: "title",
          type: "string",
          required: true,
          description: "Judul panel di header bar",
        },
        {
          name: "status",
          type: '"online" | "warning" | "offline" | "scanning"',
          default: '"online"',
          required: false,
          description: "Status indicator dengan warna dan label",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          description: "Konten panel",
        },
      ]}
      playground={{
        componentName: "TacticalPanel",
        controls: [
          {
            name: "title",
            label: "Title",
            type: "text",
            default: "UNIT STATUS",
          },
          {
            name: "status",
            type: "select",
            options: ["online", "warning", "offline", "scanning"],
            default: "online",
          },
        ],
        render: (v) => (
          <TacticalPanel title={v.title} status={v.status}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase">
                  UPTIME
                </p>
                <p className="font-display text-lg font-bold text-primary">
                  99.97%
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase">
                  LATENCY
                </p>
                <p className="font-display text-lg font-bold text-foreground">
                  12ms
                </p>
              </div>
            </div>
          </TacticalPanel>
        ),
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TacticalPanel title="SECTOR ALPHA" status="online">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-muted-foreground">
                UNITS DEPLOYED
              </span>
              <span className="font-display text-sm font-bold text-primary">
                24 / 24
              </span>
            </div>
            <div className="h-1.5 bg-surface-2 overflow-hidden">
              <div className="h-full bg-ef-green w-full" />
            </div>
            <p className="font-mono text-[10px] text-ef-green">
              ALL SYSTEMS NOMINAL ◆
            </p>
          </div>
        </TacticalPanel>
        <TacticalPanel title="SECTOR BETA" status="warning">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-muted-foreground">
                UNITS DEPLOYED
              </span>
              <span className="font-display text-sm font-bold text-ef-yellow">
                18 / 24
              </span>
            </div>
            <div className="h-1.5 bg-surface-2 overflow-hidden">
              <div className="h-full bg-ef-yellow w-3/4" />
            </div>
            <p className="font-mono text-[10px] text-ef-yellow">
              PARTIAL COVERAGE ◆
            </p>
          </div>
        </TacticalPanel>
      </div>
    </ComponentPreview>

    {/* HOLO CARD */}
    <ComponentPreview
      id="holo-card"
      title="Holo Card"
      description="Card dengan efek holographic scan line — garis cahaya bergerak vertikal saat hover. Clip-corner + shimmer gradient."
      code={`<HoloCard title="DEFENSE GRID" subtitle="Automated perimeter scan" icon={Shield} value="A+" />`}
      props={[
        {
          name: "title",
          type: "string",
          required: true,
          description: "Judul card",
        },
        {
          name: "subtitle",
          type: "string",
          required: true,
          description: "Deskripsi singkat",
        },
        {
          name: "icon",
          type: "LucideIcon",
          required: true,
          description: "Icon dari Lucide",
        },
        {
          name: "value",
          type: "string",
          required: false,
          description: "Nilai/metrik besar opsional",
        },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <HoloCard
          icon={Shield}
          title="DEFENSE GRID"
          subtitle="Perimeter fully secured"
          value="A+"
        />
        <HoloCard
          icon={Zap}
          title="POWER OUTPUT"
          subtitle="Reactor at optimal level"
          value="847MW"
        />
        <HoloCard
          icon={Radio}
          title="COMMS ARRAY"
          subtitle="12 channels active"
          value="12ch"
        />
        <HoloCard
          icon={Activity}
          title="VITAL SIGNS"
          subtitle="All operators nominal"
        />
        <HoloCard
          icon={Wifi}
          title="NETWORK"
          subtitle="Mesh topology online"
          value="99.9%"
        />
        <HoloCard
          icon={Crosshair}
          title="TARGETING"
          subtitle="Lock-on calibrated"
        />
      </div>
    </ComponentPreview>
  </>
);

// ═══ DATA DISPLAY GROUP: Tactical Badge, Coordinate Tag, Radar Chart ═══
export const SignatureDataSection = () => (
  <>
    {/* TACTICAL BADGE */}
    <ComponentPreview
      id="tactical-badge"
      title="Tactical Badge"
      description="Badge dengan clip-corner-sm dan diamond marker ◆. Pengganti rounded-pill badge standar — sesuai identitas angular Endfield."
      code={`<TacticalBadge variant="success">VERIFIED</TacticalBadge>`}
      props={[
        {
          name: "variant",
          type: '"default" | "success" | "warning" | "danger" | "info"',
          default: '"default"',
          required: false,
          description: "Warna dan tone badge",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          description: "Label badge",
        },
      ]}
      playground={{
        componentName: "TacticalBadge",
        controls: [
          {
            name: "variant",
            type: "select",
            options: ["default", "success", "warning", "danger", "info"],
            default: "default",
          },
          { name: "label", label: "Label", type: "text", default: "ACTIVE" },
        ],
        render: (v) => (
          <div className="flex items-center justify-center py-4">
            <TacticalBadge variant={v.variant}>{v.label}</TacticalBadge>
          </div>
        ),
      }}
    >
      <div className="flex flex-wrap gap-3 items-center">
        <TacticalBadge variant="default">ACTIVE</TacticalBadge>
        <TacticalBadge variant="success">VERIFIED</TacticalBadge>
        <TacticalBadge variant="warning">UNSTABLE</TacticalBadge>
        <TacticalBadge variant="danger">CRITICAL</TacticalBadge>
        <TacticalBadge variant="info">SCANNING</TacticalBadge>
      </div>
    </ComponentPreview>

    {/* COORDINATE TAG */}
    <ComponentPreview
      id="coordinate-tag"
      title="Coordinate Tag"
      description="Label data key-value ringkas bergaya terminal. Cocok untuk metadata, spesifikasi, atau status singkat."
      code={`<CoordinateTag label="LAT" value="37.7749" unit="°N" />`}
      props={[
        {
          name: "label",
          type: "string",
          required: true,
          description: "Key/label data",
        },
        {
          name: "value",
          type: "string",
          required: true,
          description: "Nilai data",
        },
        {
          name: "unit",
          type: "string",
          required: false,
          description: "Satuan opsional",
        },
      ]}
    >
      <div className="flex flex-wrap gap-3">
        <CoordinateTag label="LAT" value="37.7749" unit="°N" />
        <CoordinateTag label="LON" value="122.4194" unit="°W" />
        <CoordinateTag label="ALT" value="2,400" unit="M" />
        <CoordinateTag label="VER" value="2.0.0" />
        <CoordinateTag label="STATUS" value="ACTIVE" />
        <CoordinateTag label="FPS" value="60" />
      </div>
    </ComponentPreview>

    {/* RADAR CHART */}
    <ComponentPreview
      id="radar-chart"
      title="Radar Chart"
      description="Chart radar khas HUD dengan grid poligonal, titik data bercahaya, dan animasi reveal. Pure SVG tanpa library eksternal."
      code={`<RadarChart data={[
  { label: "ATK", value: 85 },
  { label: "DEF", value: 70 },
  { label: "SPD", value: 92 },
]} />`}
      props={[
        {
          name: "data",
          type: "{ label: string; value: number }[]",
          required: true,
          description: "Array data (value 0-100)",
        },
        {
          name: "size",
          type: "number",
          default: "280",
          required: false,
          description: "Ukuran chart (px)",
        },
        {
          name: "color",
          type: "string",
          default: "primary",
          required: false,
          description: "Warna fill area",
        },
      ]}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
        <RadarChart
          data={[
            { label: "ATK", value: 85 },
            { label: "DEF", value: 70 },
            { label: "SPD", value: 92 },
            { label: "RNG", value: 60 },
            { label: "HP", value: 78 },
            { label: "CRIT", value: 88 },
          ]}
        />
        <RadarChart
          data={[
            { label: "POWER", value: 95 },
            { label: "SPEED", value: 40 },
            { label: "ARMOR", value: 90 },
            { label: "RANGE", value: 30 },
            { label: "HEAL", value: 55 },
            { label: "UTIL", value: 65 },
          ]}
          color="cyan"
        />
      </div>
    </ComponentPreview>
  </>
);

// ═══ FEEDBACK GROUP: Diamond Loader, Warning Banner ═══
export const SignatureFeedbackSection = () => (
  <>
    {/* DIAMOND LOADER */}
    <ComponentPreview
      id="diamond-loader"
      title="Diamond Loader"
      description="Loading spinner berbentuk berlian bertumpuk — rotasi berlawanan arah. Signature Endfield yang menggantikan spinner biasa."
      code={`<DiamondLoader size="md" label="LOADING" />`}
      props={[
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          required: false,
          description: "Ukuran loader",
        },
        {
          name: "label",
          type: "string",
          required: false,
          description: "Teks status di bawah loader",
        },
      ]}
      playground={{
        componentName: "DiamondLoader",
        controls: [
          {
            name: "size",
            type: "select",
            options: ["sm", "md", "lg"],
            default: "md",
          },
          { name: "label", label: "Label", type: "text", default: "LOADING" },
        ],
        render: (v) => (
          <div className="flex items-center justify-center py-8">
            <DiamondLoader size={v.size} label={v.label} />
          </div>
        ),
      }}
    >
      <div className="flex items-center justify-around py-8">
        <DiamondLoader size="sm" label="BUFFERING" />
        <DiamondLoader size="md" label="LOADING" />
        <DiamondLoader size="lg" label="INITIALIZING" />
      </div>
    </ComponentPreview>

    {/* WARNING BANNER */}
    <ComponentPreview
      id="warning-banner"
      title="Warning Banner"
      description="Banner peringatan bergaya militer dengan tiga level: caution (kuning), alert (oranye), critical (merah). Clip-corner dengan icon AlertTriangle."
      code={`<WarningBanner level="caution">Area ini dalam pengawasan ketat.</WarningBanner>`}
      props={[
        {
          name: "level",
          type: '"caution" | "alert" | "critical"',
          default: '"caution"',
          required: false,
          description: "Tingkat keparahan peringatan",
        },
        {
          name: "children",
          type: "ReactNode",
          required: true,
          description: "Pesan peringatan",
        },
      ]}
      playground={{
        componentName: "WarningBanner",
        controls: [
          {
            name: "level",
            type: "select",
            options: ["caution", "alert", "critical"],
            default: "caution",
          },
          {
            name: "message",
            label: "Message",
            type: "text",
            default: "System integrity compromised.",
          },
        ],
        render: (v) => (
          <WarningBanner level={v.level}>{v.message}</WarningBanner>
        ),
      }}
    >
      <div className="space-y-4">
        <WarningBanner level="caution">
          Routine maintenance scheduled at 0300. Expect intermittent
          connectivity.
        </WarningBanner>
        <WarningBanner level="alert">
          Anomaly detected in sector 7-G. Dispatching reconnaissance unit.
        </WarningBanner>
        <WarningBanner level="critical">
          Perimeter breach detected. All units standby for immediate response.
        </WarningBanner>
      </div>
    </ComponentPreview>
  </>
);

// ═══ CONTENT & MEDIA GROUP: Glitch Text, Data Stream, Scan Divider, Hex Grid, HUD Overlay ═══
export const SignatureContentSection = () => (
  <>
    {/* GLITCH TEXT */}
    <ComponentPreview
      id="glitch-text"
      title="Glitch Text"
      description="Efek distorsi teks khas HUD militer. Cyan + Red chromatic aberration overlay dengan animasi stutter."
      code={`.glitch-text { position: relative; }
.glitch-text::before { color: hsl(var(--ef-cyan)); clip-path: inset(20% 0 50% 0); }
.glitch-text::after { color: hsl(var(--ef-red)); clip-path: inset(50% 0 20% 0); }`}
      props={[
        {
          name: "children",
          type: "string",
          required: true,
          description: "Teks yang ditampilkan dengan efek glitch",
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Class tambahan",
        },
      ]}
    >
      <div className="flex flex-col items-center gap-8 py-8">
        <GlitchText className="font-display text-4xl font-bold tracking-[0.08em] uppercase text-foreground">
          ENDFIELD
        </GlitchText>
        <GlitchText className="font-display text-lg font-bold tracking-[0.12em] uppercase text-primary">
          SYSTEM ONLINE
        </GlitchText>
        <GlitchText className="font-mono text-sm text-muted-foreground">
          ERROR::CONNECTION_UNSTABLE
        </GlitchText>
      </div>
    </ComponentPreview>

    {/* DATA STREAM */}
    <ComponentPreview
      id="data-stream"
      title="Data Stream"
      description="Terminal feed real-time dengan auto-scroll. Pesan berwarna berdasarkan kategori [SYS], [NET], [SEC], [DAT]. Cursor blink khas."
      code={`<DataStream /> // Auto-scrolling terminal with categorized color-coded messages`}
      props={[]}
    >
      <DataStream />
    </ComponentPreview>

    {/* SCAN DIVIDER */}
    <ComponentPreview
      id="scan-divider"
      title="Scan Divider"
      description="Pembatas konten dengan gradient garis cahaya dan label diamond. Alternatif elegan dari <hr> biasa."
      code={`<ScanDivider label="SECTION BREAK" />`}
      props={[
        {
          name: "label",
          type: "string",
          required: false,
          description: "Label opsional di tengah divider",
        },
      ]}
    >
      <div className="space-y-8 py-4">
        <ScanDivider />
        <ScanDivider label="CLASSIFIED" />
        <ScanDivider label="END OF TRANSMISSION" />
      </div>
    </ComponentPreview>

    {/* TOPOGRAPHIC PATTERN */}
    <ComponentPreview
      id="topo-pattern"
      title="Topographic Pattern"
      description="Pola garis kontur topografi khas terrain map Endfield. SVG generatif dengan efek hover glow — cocok untuk background dekoratif atau section divider."
      code={`<TopoPattern width={600} height={300} layers={8} />`}
      props={[
        {
          name: "width",
          type: "number",
          default: "600",
          required: false,
          description: "Lebar pattern (px)",
        },
        {
          name: "height",
          type: "number",
          default: "300",
          required: false,
          description: "Tinggi pattern (px)",
        },
        {
          name: "layers",
          type: "number",
          default: "8",
          required: false,
          description: "Jumlah garis kontur",
        },
      ]}
    >
      <TopoPatternDemo />
    </ComponentPreview>

    {/* HUD OVERLAY */}
    <ComponentPreview
      id="hud-overlay"
      title="HUD Overlay"
      description="Heads-Up Display overlay dengan corner brackets, crosshair, status bar, dan koordinat real-time."
      code={`<HUDOverlay><YourContent /></HUDOverlay>`}
      props={[
        {
          name: "children",
          type: "ReactNode",
          required: false,
          description: "Konten utama di dalam HUD frame",
        },
        {
          name: "showCoords",
          type: "boolean",
          default: "true",
          required: false,
          description: "Tampilkan label koordinat",
        },
        {
          name: "showCrosshair",
          type: "boolean",
          default: "true",
          required: false,
          description: "Tampilkan crosshair tengah",
        },
      ]}
    >
      <HUDOverlay>
        <div className="text-center">
          <p className="font-display text-2xl sm:text-3xl font-bold tracking-[0.08em] uppercase text-foreground">
            FIELD <span className="text-primary">OPERATIVE</span>
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-2">
            CLEARANCE LEVEL: ALPHA ◆ STATUS: ACTIVE
          </p>
        </div>
      </HUDOverlay>
    </ComponentPreview>
  </>
);

// Legacy default export (unused now)
const SignatureSection = () => (
  <>
    <SignatureCoreSection />
    <SignatureDataSection />
    <SignatureFeedbackSection />
    <SignatureContentSection />
  </>
);

// ═══ TOPOGRAPHIC PATTERN COMPONENT (Endfield Contour Style) ═══
const TopoPatternDemo = () => {
  const w = 600,
    h = 300;
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  // Generate closed organic contour loops around terrain peaks
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
        {/* Contour lines */}
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
        {/* Elevation labels on peaks */}
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
        {/* Small diamond markers at peaks */}
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

// ═══ RADAR CHART COMPONENT ═══════════════════════
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

// ═══ HUD OVERLAY COMPONENT ═══════════════════════
const HUDOverlay = ({ children }: { children?: React.ReactNode }) => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative border border-border bg-surface-0 aspect-video flex items-center justify-center overflow-hidden">
      {/* Scanline */}
      <div className="absolute inset-0 scanline-overlay" />
      {/* Corner brackets large */}
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
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="w-6 h-px bg-primary/20"
          style={{ position: "absolute", top: "50%", left: "-12px" }}
        />
        <div
          className="h-6 w-px bg-primary/20"
          style={{ position: "absolute", left: "50%", top: "-12px" }}
        />
      </div>
      {/* Top-left info */}
      <div className="absolute top-4 left-12 font-mono text-[9px] text-muted-foreground/60 space-y-0.5">
        <div>SYS::ENDFIELD v2.0</div>
        <div className="text-primary/60">{time}</div>
      </div>
      {/* Top-right info */}
      <div className="absolute top-4 right-12 font-mono text-[9px] text-muted-foreground/60 text-right space-y-0.5">
        <div>LAT 37.7749°N</div>
        <div>LON 122.4194°W</div>
      </div>
      {/* Bottom status bar */}
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
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SignatureSection;
