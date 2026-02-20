import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ─────────────────────────────────────────────────────────────── */

const countdownDigitVariants = cva(
  "font-display font-bold text-primary tabular-nums leading-none",
  {
    variants: {
      size: {
        sm: "text-2xl",
        md: "text-5xl",
        lg: "text-7xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const countdownUnitVariants = cva(
  "font-mono uppercase tracking-widest text-muted-foreground/60",
  {
    variants: {
      size: {
        sm: "text-[9px]",
        md: "text-[10px]",
        lg: "text-[11px]",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/* ── Helpers ─────────────────────────────────────────────────────────────── */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function computeTimeLeft(targetMs: number): TimeLeft {
  const total = Math.max(0, targetMs - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, total };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface CountdownTimerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof countdownDigitVariants> {
  targetDate?: string;
  seconds?: number;
  onComplete?: () => void;
  label?: string;
  autoHideZero?: boolean;
  showDays?: boolean;
}

/* ── Unit cell ───────────────────────────────────────────────────────────── */

function UnitCell({
  value,
  unit,
  size,
}: {
  value: string;
  unit: string;
  size: "sm" | "md" | "lg" | null | undefined;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={countdownDigitVariants({ size })}>{value}</span>
      <span className={countdownUnitVariants({ size })}>{unit}</span>
    </div>
  );
}

/* ── Separator ────────────────────────────────────────────────────────────── */

function Colon({ size }: { size: "sm" | "md" | "lg" | null | undefined }) {
  const cls =
    size === "sm" ? "text-xl" : size === "lg" ? "text-5xl" : "text-3xl";
  return (
    <span
      className={cn(
        "font-mono text-primary/30 font-bold select-none mb-4",
        cls,
      )}
    >
      :
    </span>
  );
}

/* ── Component ───────────────────────────────────────────────────────────── */

const CountdownTimer = React.forwardRef<HTMLDivElement, CountdownTimerProps>(
  (
    {
      className,
      targetDate,
      seconds: durationSeconds,
      onComplete,
      label,
      autoHideZero = false,
      showDays = true,
      size,
      ...props
    },
    ref,
  ) => {
    const targetMs = React.useMemo(() => {
      if (targetDate) return new Date(targetDate).getTime();
      if (durationSeconds !== undefined)
        return Date.now() + durationSeconds * 1000;
      return Date.now();
    }, [targetDate, durationSeconds]);

    const [timeLeft, setTimeLeft] = React.useState<TimeLeft>(() =>
      computeTimeLeft(targetMs),
    );

    const completedRef = React.useRef(false);

    React.useEffect(() => {
      completedRef.current = false;

      const tick = () => {
        const tl = computeTimeLeft(targetMs);
        setTimeLeft(tl);
        if (tl.total === 0 && !completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      };

      tick();
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }, [targetMs, onComplete]);

    const ariaLabel = React.useMemo(
      () =>
        `Countdown: ${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`,
      [timeLeft.days, timeLeft.hours, timeLeft.minutes],
    );

    const displayDays = showDays && !(autoHideZero && timeLeft.days === 0);

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center gap-4", className)}
        role="timer"
        aria-label={ariaLabel}
        aria-live="off"
        {...props}
      >
        {label && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
        )}

        <div className="flex items-end gap-2">
          {displayDays && (
            <>
              <UnitCell value={String(timeLeft.days)} unit="DAYS" size={size} />
              <Colon size={size} />
            </>
          )}
          <UnitCell value={pad2(timeLeft.hours)} unit="HRS" size={size} />
          <Colon size={size} />
          <UnitCell value={pad2(timeLeft.minutes)} unit="MIN" size={size} />
          <Colon size={size} />
          <UnitCell value={pad2(timeLeft.seconds)} unit="SEC" size={size} />
        </div>
      </div>
    );
  },
);
CountdownTimer.displayName = "CountdownTimer";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { CountdownTimer };
