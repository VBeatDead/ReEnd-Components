import * as React from "react";
import { Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Status config ───────────────────────────────────────────────────────── */

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

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface TacticalPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  status?: "online" | "warning" | "offline" | "scanning";
  headerAction?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

/* ── Component ───────────────────────────────────────────────────────────── */

const TacticalPanel = React.forwardRef<HTMLDivElement, TacticalPanelProps>(
  (
    {
      title,
      status = "online",
      children,
      className,
      headerAction,
      collapsible = false,
      defaultCollapsed = false,
      collapsed: controlledCollapsed,
      onCollapseChange,
      ...props
    },
    ref,
  ) => {
    const [internalCollapsed, setInternalCollapsed] =
      React.useState(defaultCollapsed);

    const isControlled = controlledCollapsed !== undefined;
    const isCollapsed = isControlled ? controlledCollapsed : internalCollapsed;

    const handleHeaderClick = () => {
      if (!collapsible) return;
      const next = !isCollapsed;
      if (!isControlled) setInternalCollapsed(next);
      onCollapseChange?.(next);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative border border-border bg-surface-1 scanline-overlay",
          className,
        )}
        {...props}
      >
        {/* ── HUD Header ── */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-0",
            collapsible && "cursor-pointer select-none",
          )}
          onClick={handleHeaderClick}
        >
          <div className="flex items-center gap-3">
            <Crosshair className="w-3.5 h-3.5 text-primary" />
            <span className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-foreground">
              {title}
            </span>
            {collapsible && (
              <span className="font-mono text-[14px] text-primary/60 ml-1 leading-none">
                {isCollapsed ? "+" : "−"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={cn("w-2 h-2", STATUS_COLORS[status])}
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />
              <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
                {STATUS_LABELS[status]}
              </span>
            </div>
            {headerAction && (
              <div
                className="flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {headerAction}
              </div>
            )}
          </div>
        </div>

        {/* ── Corner accents ── */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/40 pointer-events-none" />

        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            isCollapsed ? "max-h-0" : "max-h-[9999px]",
          )}
        >
          <div className="p-5">{children}</div>
        </div>
      </div>
    );
  },
);
TacticalPanel.displayName = "TacticalPanel";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { TacticalPanel };
