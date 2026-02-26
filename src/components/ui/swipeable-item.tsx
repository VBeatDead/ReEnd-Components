import * as React from "react";
import { cn } from "../../lib/utils";

export interface SwipeAction {
  label: string;
  /** 'delete' | 'archive' | 'custom' -- affects background color */
  variant?: "delete" | "archive" | "custom";
  /** Custom background color class (used when variant='custom') */
  bgClass?: string;
  onTrigger: () => void;
}

export interface SwipeableItemProps {
  /** Action revealed on left-swipe (appears on the right side) */
  leftSwipeAction?: SwipeAction;
  /** Action revealed on right-swipe (appears on the left side) */
  rightSwipeAction?: SwipeAction;
  /** Swipe distance to reveal action (default: 80) */
  revealThreshold?: number;
  /** Swipe distance to auto-trigger (default: 160) */
  triggerThreshold?: number;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function getActionBg(action: SwipeAction): string {
  switch (action.variant) {
    case "archive":
      return "bg-surface-2 border-l border-[#4DA8DA]/30";
    case "custom":
      return action.bgClass ?? "bg-surface-2";
    case "delete":
    default:
      return "bg-destructive";
  }
}

function getActionTextColor(action: SwipeAction): string {
  switch (action.variant) {
    case "archive":
      return "text-[#4DA8DA]";
    case "custom":
      return "text-foreground";
    case "delete":
    default:
      return "text-white";
  }
}

const SwipeableItem = React.forwardRef<HTMLDivElement, SwipeableItemProps>(
  (
    {
      leftSwipeAction,
      rightSwipeAction,
      revealThreshold = 80,
      triggerThreshold = 160,
      disabled = false,
      className,
      children,
    },
    ref,
  ) => {
    const [translateX, setTranslateX] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);

    const startXRef = React.useRef(0);
    const currentDeltaRef = React.useRef(0);
    const isDraggingRef = React.useRef(false);
    const hapticThresholdFiredRef = React.useRef(false);
    const hapticTriggerFiredRef = React.useRef(false);

    const tryVibrate = React.useCallback((duration: number) => {
      try {
        navigator.vibrate?.(duration);
      } catch {
        /* empty */
      }
    }, []);

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;

        e.currentTarget.setPointerCapture(e.pointerId);
        startXRef.current = e.clientX;
        currentDeltaRef.current = 0;
        isDraggingRef.current = true;
        setIsDragging(true);

        hapticThresholdFiredRef.current = false;
        hapticTriggerFiredRef.current = false;
      },
      [disabled],
    );

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current || disabled) return;

        let deltaX = e.clientX - startXRef.current;

        if (deltaX < 0 && !leftSwipeAction) {
          deltaX = 0;
        }
        if (deltaX > 0 && !rightSwipeAction) {
          deltaX = 0;
        }

        const maxSwipe = triggerThreshold + 40;
        deltaX = Math.max(-maxSwipe, Math.min(maxSwipe, deltaX));

        const absDelta = Math.abs(deltaX);

        if (absDelta >= revealThreshold && !hapticThresholdFiredRef.current) {
          hapticThresholdFiredRef.current = true;
          tryVibrate(10);
        }

        if (absDelta >= triggerThreshold && !hapticTriggerFiredRef.current) {
          hapticTriggerFiredRef.current = true;
          tryVibrate(20);
        }

        currentDeltaRef.current = deltaX;
        setTranslateX(deltaX);
      },
      [disabled, leftSwipeAction, rightSwipeAction, revealThreshold, triggerThreshold, tryVibrate],
    );

    const handlePointerUp = React.useCallback(() => {
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      setIsDragging(false);

      const delta = currentDeltaRef.current;
      const absDelta = Math.abs(delta);

      if (absDelta >= triggerThreshold) {
        if (delta < 0 && leftSwipeAction) {
          leftSwipeAction.onTrigger();
        } else if (delta > 0 && rightSwipeAction) {
          rightSwipeAction.onTrigger();
        }
      }

      currentDeltaRef.current = 0;
      setTranslateX(0);
    }, [triggerThreshold, leftSwipeAction, rightSwipeAction]);

    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        {/* Right action (revealed by left swipe) */}
        {leftSwipeAction && (
          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center",
              getActionBg(leftSwipeAction),
            )}
            data-testid="swipe-action-right"
          >
            <span
              className={cn(
                "font-display text-xs uppercase",
                getActionTextColor(leftSwipeAction),
              )}
            >
              {leftSwipeAction.label}
            </span>
          </div>
        )}

        {/* Left action (revealed by right swipe) */}
        {rightSwipeAction && (
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-20 flex items-center justify-center",
              getActionBg(rightSwipeAction),
            )}
            data-testid="swipe-action-left"
          >
            <span
              className={cn(
                "font-display text-xs uppercase",
                getActionTextColor(rightSwipeAction),
              )}
            >
              {rightSwipeAction.label}
            </span>
          </div>
        )}

        {/* Swipeable content */}
        <div
          style={{ transform: `translateX(${translateX}px)` }}
          className={cn(
            "relative z-10 bg-surface-1 touch-pan-y",
            isDragging ? "transition-none" : "transition-transform duration-200",
          )}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          data-testid="swipe-content"
        >
          {children}
        </div>
      </div>
    );
  },
);
SwipeableItem.displayName = "SwipeableItem";

export { SwipeableItem };
