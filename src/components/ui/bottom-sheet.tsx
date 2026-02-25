import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "../../lib/utils";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string;
  /** Snap points as fraction of viewport height (0-1). Default: [0.5] */
  snapPoints?: number[];
  /** Initial snap point index (into the snapPoints array). Default: 0 */
  initialSnap?: number;
  className?: string;
}

/** Pixel threshold: if dragged down further than this, dismiss instead of snapping */
const DISMISS_THRESHOLD = 120;

/**
 * Find the snap point closest to the current sheet height (in px).
 * Returns the snap height in pixels.
 */
function closestSnapHeight(
  currentHeightPx: number,
  snapHeightsPx: number[],
): number {
  let closest = snapHeightsPx[0];
  let minDist = Math.abs(currentHeightPx - closest);
  for (let i = 1; i < snapHeightsPx.length; i++) {
    const dist = Math.abs(currentHeightPx - snapHeightsPx[i]);
    if (dist < minDist) {
      minDist = dist;
      closest = snapHeightsPx[i];
    }
  }
  return closest;
}

const BottomSheet = ({
  open,
  onClose,
  title,
  children,
  maxHeight = "85vh",
  snapPoints = [0.5],
  initialSnap = 0,
  className,
}: BottomSheetProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const startYRef = React.useRef(0);
  const sheetRef = React.useRef<HTMLDivElement>(null);

  const hasMultipleSnaps = snapPoints.length > 1;
  const clampedInitial = Math.min(initialSnap, snapPoints.length - 1);
  const [activeSnapIndex, setActiveSnapIndex] = React.useState(clampedInitial);

  React.useEffect(() => {
    if (open) {
      setActiveSnapIndex(Math.min(initialSnap, snapPoints.length - 1));
      setDragOffset(0);
    }
  }, [open, initialSnap, snapPoints.length]);

  React.useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // ── Pointer handlers for drag handle ──────────────────────────────────
  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      startYRef.current = e.clientY;
      setIsDragging(true);
    },
    [],
  );

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const delta = Math.max(0, e.clientY - startYRef.current);
      setDragOffset(delta);
    },
    [isDragging],
  );

  const handlePointerUp = React.useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset > DISMISS_THRESHOLD) {
      setDragOffset(0);
      onClose();
    } else if (hasMultipleSnaps && dragOffset > 0) {
      const vh = window.innerHeight;
      const snapHeightsPx = snapPoints.map((sp) => sp * vh);
      const currentSnapHeight = snapHeightsPx[activeSnapIndex];
      const effectiveHeight = currentSnapHeight - dragOffset;
      const newHeight = closestSnapHeight(effectiveHeight, snapHeightsPx);
      const newIndex = snapHeightsPx.indexOf(newHeight);
      if (newIndex !== -1) {
        setActiveSnapIndex(newIndex);
      }
      setDragOffset(0);
    } else {
      setDragOffset(0);
    }
  }, [isDragging, dragOffset, onClose, hasMultipleSnaps, snapPoints, activeSnapIndex]);

  const handlePointerCancel = React.useCallback(() => {
    setIsDragging(false);
    setDragOffset(0);
  }, []);

  if (!mounted) return null;

  const sheetStyle: React.CSSProperties = hasMultipleSnaps
    ? { height: `${snapPoints[activeSnapIndex] * 100}vh`, maxHeight }
    : { maxHeight };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-overlay flex flex-col justify-end">
      {/* Backdrop — always dark for proper contrast in both light and dark modes */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Bottom sheet"}
        style={{
          ...sheetStyle,
          transform: visible
            ? `translateY(${dragOffset}px)`
            : "translateY(100%)",
        }}
        className={cn(
          "relative bg-surface-1 border-t border-border w-full flex flex-col rounded-none",
          isDragging
            ? "transition-none"
            : "transition-[transform,height] duration-300 ease-out",
          className,
        )}
      >
        {/* Drag handle — interactive for swipe gestures */}
        <div
          className="w-full py-3 flex justify-center cursor-grab active:cursor-grabbing touch-none shrink-0"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          aria-label="Drag to resize or dismiss"
          role="separator"
        >
          <div className="w-12 h-1 bg-border/50 rounded-full" />
        </div>

        {title && (
          <div className="px-4 pb-3 border-b border-border shrink-0">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              {title}
            </h2>
          </div>
        )}

        <div className="overflow-y-auto flex-1 p-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

BottomSheet.displayName = "BottomSheet";

export { BottomSheet };
