import * as React from "react";
import { Crosshair } from "lucide-react";

export interface TacticalPanelProps {
  title: string;
  status?: "online" | "warning" | "offline" | "scanning";
  children: React.ReactNode;
  className?: string;
}

const STATUS_LABELS: Record<string, string> = {
  online: "ONLINE",
  warning: "CAUTION",
  offline: "OFFLINE",
  scanning: "SCANNING",
};

const STATUS_COLORS: Record<string, string> = {
  online: "bg-ef-green",
  warning: "bg-ef-yellow",
  offline: "bg-ef-red",
  scanning: "bg-ef-cyan animate-pulse",
};

export const TacticalPanel = React.forwardRef<
  HTMLDivElement,
  TacticalPanelProps
>(({ title, status = "online", children, className }, ref) => (
  <div
    ref={ref}
    className={`relative border border-border bg-surface-1 scanline-overlay${className ? ` ${className}` : ""}`}
  >
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
          className={`w-2 h-2 ${STATUS_COLORS[status]}`}
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
        <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
          {STATUS_LABELS[status]}
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
));
TacticalPanel.displayName = "TacticalPanel";
