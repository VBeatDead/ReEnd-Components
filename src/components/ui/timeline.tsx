import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ─────────────────────────────────────────────────────────────── */

const timelineItemVariants = cva("", {
  variants: {
    status: {
      complete: "text-primary",
      current: "text-primary",
      upcoming: "text-white/20",
    },
  },
  defaultVariants: { status: "upcoming" },
});

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: string;
  title: string;
  description?: string;
  status?: "complete" | "current" | "upcoming";
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: TimelineItemProps[];
}

/* ── TimelineItem ─────────────────────────────────────────────────────────── */

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ date, title, description, status = "upcoming", children, className, ...props }, ref) => {
    const isActive = status === "complete" || status === "current";
    const marker = isActive ? "◆" : "◇";

    return (
      <div
        ref={ref}
        className={cn("relative pb-8 last:pb-0", className)}
        {...props}
      >
        {/* Timeline node */}
        <span
          className={cn(
            "absolute -left-[15px] top-0.5 font-mono text-[11px] leading-none select-none",
            timelineItemVariants({ status }),
            status === "current" && "drop-shadow-[0_0_6px_rgba(255,212,41,0.6)]",
          )}
          aria-hidden="true"
        >
          {marker}
        </span>

        {/* Date */}
        {date && (
          <p className="font-mono text-[11px] text-muted-foreground/60 mb-1">{date}</p>
        )}

        {/* Title */}
        <p className="font-display text-[14px] font-semibold uppercase text-foreground">
          {title}
        </p>

        {/* Description */}
        {description && (
          <p className="text-[13px] text-muted-foreground mt-1">{description}</p>
        )}

        {/* Slot children */}
        {children}
      </div>
    );
  },
);
TimelineItem.displayName = "TimelineItem";

/* ── Timeline ────────────────────────────────────────────────────────────── */

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative pl-6 space-y-0",
          "before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-px before:bg-white/10",
          className,
        )}
        {...props}
      >
        {items
          ? items.map((item, i) => {
              const { date, title, description, status, children: itemChildren, className: itemCn, ...rest } = item;
              return (
                <TimelineItem
                  key={i}
                  date={date}
                  title={title}
                  description={description}
                  status={status}
                  className={itemCn}
                  {...rest}
                >
                  {itemChildren}
                </TimelineItem>
              );
            })
          : children}
      </div>
    );
  },
);
Timeline.displayName = "Timeline";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Timeline, TimelineItem, timelineItemVariants };
