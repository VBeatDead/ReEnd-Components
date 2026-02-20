import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Log level config ─────────────────────────────────────────────────────── */

export type LogLevel = "system" | "info" | "success" | "warning" | "error";

const LOG_CONFIG: Record<
  LogLevel,
  { prefix: string; color: string; ariaLive: string }
> = {
  system: { prefix: "[SYS] ", color: "text-muted-foreground", ariaLive: "off" },
  info: { prefix: "[INFO]", color: "text-ef-blue", ariaLive: "off" },
  success: { prefix: "[OK]  ", color: "text-ef-green", ariaLive: "polite" },
  warning: { prefix: "[WARN]", color: "text-ef-orange", ariaLive: "polite" },
  error: { prefix: "[ERR] ", color: "text-destructive", ariaLive: "assertive" },
};

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface LogEntry {
  id?: string | number;
  level: LogLevel;
  message: string;
  timestamp?: string;
}

export interface CommandOutputProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: LogEntry[];
  showHeader?: boolean;
  headerText?: string;
  showCursor?: boolean;
  autoScroll?: boolean;
  maxHeight?: string;
  showTimestamp?: boolean;
}

/* ── Component ───────────────────────────────────────────────────────────── */

const CommandOutput = React.forwardRef<HTMLDivElement, CommandOutputProps>(
  (
    {
      className,
      entries,
      showHeader = true,
      headerText = "TERMINAL",
      showCursor = true,
      autoScroll = true,
      maxHeight = "320px",
      showTimestamp = false,
      ...props
    },
    ref,
  ) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (autoScroll && scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [entries, autoScroll]);

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#0F0F0F] border border-white/8 font-mono text-[13px]",
          className,
        )}
        {...props}
      >
        {/* Header */}
        {showHeader && (
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/8">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 bg-white/10" />
              <span className="w-2.5 h-2.5 bg-white/10" />
              <span className="w-2.5 h-2.5 bg-white/10" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em] mx-auto">
              {headerText}
            </span>
          </div>
        )}

        {/* Output area */}
        <div
          ref={scrollRef}
          style={{ maxHeight }}
          className="overflow-y-auto py-2 scrollbar-thin"
          role="log"
          aria-live="polite"
          aria-label={headerText}
        >
          {entries.length === 0 && (
            <div className="px-4 py-2 text-muted-foreground/40 text-[12px]">
              No output.
            </div>
          )}
          {entries.map((entry, i) => {
            const cfg = LOG_CONFIG[entry.level];
            const key = entry.id ?? i;
            return (
              <div
                key={key}
                className="flex gap-3 px-4 py-0.5 hover:bg-white/[0.02] transition-colors"
              >
                {/* Prefix */}
                <span
                  className={cn(
                    "text-[11px] font-semibold shrink-0 select-none",
                    "w-[54px]",
                    cfg.color,
                  )}
                >
                  {cfg.prefix}
                </span>

                {/* Timestamp */}
                {showTimestamp && (
                  <span className="text-[11px] text-muted-foreground/40 shrink-0">
                    {entry.timestamp ??
                      new Date().toISOString().slice(0, 19).replace("T", "/")}
                  </span>
                )}

                {/* Message */}
                <span className="text-[#E0E0E0] break-all">
                  {entry.message}
                </span>
              </div>
            );
          })}

          {/* Blinking cursor */}
          {showCursor && (
            <div className="flex items-center gap-3 px-4 py-0.5 mt-0.5">
              <span className="w-[54px] shrink-0" />
              <span
                className="inline-block w-2 h-4 bg-primary animate-pulse"
                aria-hidden
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);
CommandOutput.displayName = "CommandOutput";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { CommandOutput };
