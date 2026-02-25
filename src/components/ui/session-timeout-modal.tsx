import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";
import { cn } from "../../lib/utils";

export interface SessionTimeoutModalProps {
  open: boolean;
  secondsRemaining: number;
  onExtend: () => void;
  onLogout: () => void;
  onAutoLogout?: () => void;
  warningAt?: number;
}

function formatCountdown(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60);
  const s = Math.max(0, seconds) % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const SessionTimeoutModal = ({
  open,
  secondsRemaining,
  onExtend,
  onLogout,
  onAutoLogout,
  warningAt = 60,
}: SessionTimeoutModalProps) => {
  const isCritical = secondsRemaining <= warningAt;
  const isUrgent = secondsRemaining <= 30;

  React.useEffect(() => {
    if (open && secondsRemaining <= 0 && onAutoLogout) {
      onAutoLogout();
    }
  }, [open, secondsRemaining, onAutoLogout]);

  const countdownClass = isUrgent
    ? "animate-[pulse_0.5s_ease-in-out_infinite]"
    : isCritical
      ? "animate-pulse"
      : "";

  const progress = Math.min(100, (secondsRemaining / (warningAt * 2)) * 100);

  return (
    <Dialog open={open}>
      <DialogContent size="sm" className="flex flex-col gap-0 p-0">
        {/* ── Header: centered title only ── */}
        <div className="shrink-0 border-b border-border px-6 py-4 flex items-center justify-center">
          <DialogTitle className="text-center">
            <span aria-hidden="true">⏱ </span>SESSION EXPIRING
          </DialogTitle>
        </div>

        {/* ── Description ── */}
        <DialogDescription className="text-center px-8 pt-5 pb-0 text-sm text-muted-foreground overflow-visible shrink-0">
          Your session will expire due to inactivity. Stay connected to
          continue.
        </DialogDescription>

        {/* ── Countdown ── */}
        <div className="flex flex-col items-center px-8 py-8 gap-3">
          {/* Corner-bracketed countdown display */}
          <div className="relative inline-block">
            <span
              className="absolute -top-1 -left-2 font-mono text-[10px] select-none leading-none"
              style={{ color: isCritical ? "hsl(var(--ef-red))" : "hsl(var(--ef-orange))", opacity: 0.35 }}
              aria-hidden="true"
            >
              ◤
            </span>
            <span
              className="absolute -top-1 -right-2 font-mono text-[10px] select-none leading-none"
              style={{ color: isCritical ? "hsl(var(--ef-red))" : "hsl(var(--ef-orange))", opacity: 0.35 }}
              aria-hidden="true"
            >
              ◥
            </span>
            <span
              className={cn(
                "font-display text-5xl font-bold tracking-[0.12em] tabular-nums block px-2",
                isCritical ? "text-ef-red" : "text-ef-orange",
                countdownClass,
              )}
              aria-live="polite"
              aria-atomic="true"
              data-state={isCritical ? "critical" : "warning"}
            >
              {formatCountdown(secondsRemaining)}
            </span>
            <span
              className="absolute -bottom-1 -left-2 font-mono text-[10px] select-none leading-none"
              style={{ color: isCritical ? "hsl(var(--ef-red))" : "hsl(var(--ef-orange))", opacity: 0.35 }}
              aria-hidden="true"
            >
              ◣
            </span>
            <span
              className="absolute -bottom-1 -right-2 font-mono text-[10px] select-none leading-none"
              style={{ color: isCritical ? "hsl(var(--ef-red))" : "hsl(var(--ef-orange))", opacity: 0.35 }}
              aria-hidden="true"
            >
              ◢
            </span>
          </div>

          {/* "REMAINING" label */}
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.15em]">
            remaining
          </p>

          {/* Countdown progress bar */}
          <div className="w-32 h-[2px] bg-surface-0">
            <div
              className={cn(
                "h-full transition-all duration-1000",
                isCritical ? "bg-ef-red" : "bg-ef-orange",
              )}
              style={{ width: `${Math.max(0, progress)}%` }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <DialogFooter className="border-t border-border px-6 py-4">
          <Button variant="ghost" onClick={onLogout}>
            LOG OUT
          </Button>
          <Button variant="primary" onClick={onExtend}>
            STAY CONNECTED
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

SessionTimeoutModal.displayName = "SessionTimeoutModal";

export { SessionTimeoutModal };
