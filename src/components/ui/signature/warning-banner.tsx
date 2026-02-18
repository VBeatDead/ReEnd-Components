import * as React from "react";
import { AlertTriangle } from "lucide-react";

export interface WarningBannerProps {
  level?: "caution" | "alert" | "critical";
  children: React.ReactNode;
  className?: string;
}

const WARNING_STYLES = {
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
} as const;

export const WarningBanner = React.forwardRef<
  HTMLDivElement,
  WarningBannerProps
>(({ level = "caution", children, className }, ref) => {
  const s = WARNING_STYLES[level];
  return (
    <div
      ref={ref}
      className={`clip-corner border ${s.border} ${s.bg} p-4 flex items-start gap-3${className ? ` ${className}` : ""}`}
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
});
WarningBanner.displayName = "WarningBanner";
