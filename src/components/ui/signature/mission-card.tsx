import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ─────────────────────────────────────────────────────────────── */

const missionCardVariants = cva(
  [
    "relative bg-surface-1 border overflow-hidden transition-all duration-300",
    "before:absolute before:top-0 before:left-0 before:w-5 before:h-5",
    "before:border-t-2 before:border-l-2 before:border-primary/40 before:pointer-events-none",
    "after:absolute after:bottom-0 after:right-0 after:w-5 after:h-5",
    "after:border-b-2 after:border-r-2 after:border-primary/40 after:pointer-events-none",
  ].join(" "),
  {
    variants: {
      priority: {
        low: "border-white/8",
        medium: "border-ef-blue/30",
        high: "border-ef-orange/40",
        critical: "border-ef-red/50 shadow-[0_0_12px_rgba(255,71,87,0.1)]",
      },
      status: {
        active:     "",
        completed:  "opacity-70",
        failed:     "opacity-60",
        pending:    "border-dashed",
        classified: "border-primary/20",
      },
      clickable: {
        true: "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg",
        false: "",
      },
    },
    defaultVariants: { priority: "medium", status: "active", clickable: false },
  },
);

/* ── Config maps ──────────────────────────────────────────────────────────── */

const STATUS_CONFIG = {
  active: {
    label: "ACTIVE",
    cls: "text-ef-green   border-ef-green/40   bg-ef-green/10",
  },
  completed: {
    label: "COMPLETED",
    cls: "text-muted-foreground border-white/20 bg-white/5",
  },
  failed: {
    label: "FAILED",
    cls: "text-destructive border-destructive/40 bg-destructive/10",
  },
  pending: {
    label: "PENDING",
    cls: "text-ef-orange  border-ef-orange/40  bg-ef-orange/10",
  },
  classified: {
    label: "CLASSIFIED",
    cls: "text-primary    border-primary/40    bg-primary/10",
  },
} as const;

const PRIORITY_CONFIG = {
  low: { label: "LOW", cls: "text-muted-foreground" },
  medium: { label: "MEDIUM", cls: "text-ef-blue" },
  high: { label: "HIGH", cls: "text-ef-orange" },
  critical: { label: "CRITICAL", cls: "text-destructive" },
} as const;

/* ── Types ────────────────────────────────────────────────────────────────── */

export type MissionStatus = keyof typeof STATUS_CONFIG;
export type MissionPriority = keyof typeof PRIORITY_CONFIG;

export interface MissionCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof missionCardVariants>, "clickable"> {
  title: string;
  missionId?: string;
  description?: string;
  status?: MissionStatus;
  priority?: MissionPriority;
  date?: string;
  progress?: number;
  tags?: string[];
}

/* ── Component ───────────────────────────────────────────────────────────── */

const MissionCard = React.forwardRef<HTMLDivElement, MissionCardProps>(
  (
    {
      className,
      title,
      missionId,
      description,
      status = "active",
      priority = "medium",
      date,
      progress,
      tags,
      onClick,
      ...props
    },
    ref,
  ) => {
    const statusCfg = STATUS_CONFIG[status];
    const priorityCfg = PRIORITY_CONFIG[priority];
    const isClickable = !!onClick;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isClickable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    const clampedProgress =
      progress !== undefined ? Math.min(100, Math.max(0, progress)) : undefined;

    return (
      <div
        ref={ref}
        role={isClickable ? "button" : "article"}
        aria-label={`Mission: ${title}`}
        tabIndex={isClickable ? 0 : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          missionCardVariants({ priority, status, clickable: isClickable }),
          className,
        )}
        {...props}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-surface-0">
          <span
            className={cn(
              "font-mono text-[10px] font-semibold tracking-[0.1em] uppercase",
              priorityCfg.cls,
            )}
          >
            ◆ PRIORITY: {priorityCfg.label}
          </span>
          <span
            className={cn(
              "font-mono text-[10px] font-semibold tracking-[0.1em] uppercase border px-2 py-0.5",
              statusCfg.cls,
            )}
          >
            {statusCfg.label}
          </span>
        </div>

        {/* ── Body ── */}
        <div className="px-4 pt-3 pb-2">
          <h3 className="font-display text-[15px] font-bold uppercase tracking-wider text-foreground leading-tight">
            {title}
          </h3>
          {missionId && (
            <p className="font-mono text-[11px] text-muted-foreground/60 mt-0.5">
              ID: {missionId}
            </p>
          )}
          {description && (
            <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* ── Footer ── */}
        {(date !== undefined ||
          clampedProgress !== undefined ||
          (tags && tags.length > 0)) && (
          <div className="px-4 pb-3 pt-1 space-y-2">
            {clampedProgress !== undefined && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-white/8 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${clampedProgress}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-8 text-right">
                  {clampedProgress}%
                </span>
              </div>
            )}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {date && (
                <span className="font-mono text-[11px] text-muted-foreground/60">
                  {date}
                </span>
              )}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1 ml-auto">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] uppercase tracking-wider border border-white/10 px-1.5 py-0.5 text-muted-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);
MissionCard.displayName = "MissionCard";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { MissionCard, missionCardVariants };
