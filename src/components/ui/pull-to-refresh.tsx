import * as React from "react";
import { cn } from "../../lib/utils";

export interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  /** Pull distance (px) to trigger refresh. Default: 60 */
  threshold?: number;
  /** Text shown while refreshing. Default: "SYNCING..." */
  refreshingLabel?: string;
  /** Text shown on complete. Default: "UPDATED" */
  completeLabel?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

type PTRPhase = "idle" | "pulling" | "threshold" | "refreshing" | "complete";

const MAX_PULL = 120;

const PullToRefresh = React.forwardRef<HTMLDivElement, PullToRefreshProps>(
  (
    {
      onRefresh,
      threshold = 60,
      refreshingLabel = "SYNCING...",
      completeLabel = "UPDATED",
      disabled = false,
      className,
      children,
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const startYRef = React.useRef<number | null>(null);
    const thresholdVibratedRef = React.useRef(false);

    const [phase, setPhase] = React.useState<PTRPhase>("idle");
    const [distance, setDistance] = React.useState(0);

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    const tryVibrate = React.useCallback((duration: number) => {
      try {
        navigator.vibrate?.(duration);
      } catch {
        /* empty */
      }
    }, []);

    const handleTouchStart = React.useCallback(
      (e: React.TouchEvent<HTMLDivElement>) => {
        if (disabled || phase === "refreshing" || phase === "complete") return;

        const container = containerRef.current;
        if (!container || container.scrollTop !== 0) return;

        startYRef.current = e.touches[0].clientY;
        thresholdVibratedRef.current = false;
      },
      [disabled, phase],
    );

    const handleTouchMove = React.useCallback(
      (e: React.TouchEvent<HTMLDivElement>) => {
        if (
          disabled ||
          startYRef.current === null ||
          phase === "refreshing" ||
          phase === "complete"
        )
          return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startYRef.current;

        if (diff <= 0) {
          setDistance(0);
          setPhase("idle");
          return;
        }

        const clamped = Math.min(diff, MAX_PULL);
        setDistance(clamped);

        if (clamped >= threshold) {
          if (!thresholdVibratedRef.current) {
            tryVibrate(10);
            thresholdVibratedRef.current = true;
          }
          setPhase("threshold");
        } else {
          setPhase("pulling");
        }
      },
      [disabled, phase, threshold, tryVibrate],
    );

    const handleTouchEnd = React.useCallback(() => {
      if (disabled || startYRef.current === null) return;

      startYRef.current = null;

      if (phase === "threshold") {
        tryVibrate(20);
        setPhase("refreshing");
        setDistance(threshold);

        onRefresh()
          .then(() => {
            setPhase("complete");
            setTimeout(() => {
              setPhase("idle");
              setDistance(0);
            }, 1000);
          })
          .catch(() => {
            setPhase("idle");
            setDistance(0);
          });
      } else {
        setPhase("idle");
        setDistance(0);
      }
    }, [disabled, phase, threshold, onRefresh, tryVibrate]);

    const indicatorOpacity =
      phase === "refreshing" || phase === "complete"
        ? 1
        : Math.min(distance / threshold, 1);
    const indicatorY =
      phase === "refreshing" || phase === "complete"
        ? 0
        : distance - threshold;

    return (
      <div
        ref={mergedRef}
        className={cn("relative overflow-y-auto", className)}
        style={{ touchAction: "pan-x" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        data-ptr-phase={phase}
      >
        {/* PTR Indicator */}
        <div
          style={{
            transform: `translateY(${indicatorY}px)`,
            opacity: indicatorOpacity,
            transition:
              phase === "idle"
                ? "transform 0.2s ease, opacity 0.2s ease"
                : undefined,
          }}
          className="absolute top-0 left-0 right-0 flex flex-col items-center -translate-y-16 pointer-events-none z-10"
          aria-hidden="true"
          data-testid="ptr-indicator"
        >
          {phase === "refreshing" ? (
            <div
              className="w-6 h-6 [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] border-2 border-primary/30 border-t-primary animate-rotate"
              data-testid="ptr-spinner"
              role="status"
              aria-label="Refreshing"
            />
          ) : phase === "complete" ? (
            <span className="text-primary text-base" data-testid="ptr-check">
              ✓
            </span>
          ) : (
            <div
              className="w-6 h-6 [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] border-2 border-primary/40"
              style={{
                transform: `rotate(${Math.min((distance / threshold) * 45, 45)}deg)`,
              }}
              data-testid="ptr-diamond"
            />
          )}
          {(phase === "refreshing" || phase === "complete") && (
            <span
              className="font-['Orbitron',monospace] text-[10px] uppercase tracking-[0.1em] text-muted-foreground mt-1"
              data-testid="ptr-label"
            >
              {phase === "refreshing" ? refreshingLabel : completeLabel}
            </span>
          )}
        </div>

        {/* Content */}
        {children}
      </div>
    );
  },
);

PullToRefresh.displayName = "PullToRefresh";

export { PullToRefresh };
