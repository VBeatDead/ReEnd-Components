import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/* ── Track variants (height / size) ─────────────────────────────────────── */

const progressTrackVariants = cva(
  "relative w-full overflow-hidden bg-surface-3",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
        lg: "h-2.5",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/* ── Fill color variants ─────────────────────────────────────────────────── */

const progressFillVariants = cva(
  "h-full w-full flex-1 transition-all duration-500 ease-smooth origin-left",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-ef-green",
        danger: "bg-destructive",
        info: "bg-ef-blue",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface ProgressProps
  extends
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressFillVariants> {
  value?: number;
  showLabel?: boolean;
}

/* ── Component ───────────────────────────────────────────────────────────── */

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, showLabel, size, variant, ...props }, ref) => {
  const isIndeterminate = value === undefined || value === null;
  const clampedValue = isIndeterminate
    ? undefined
    : Math.min(100, Math.max(0, value));

  return (
    <div className="w-full space-y-1">
      {showLabel && !isIndeterminate && (
        <div className="flex justify-end">
          <span className="font-mono text-[11px] text-muted-foreground">
            {clampedValue}%
          </span>
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressTrackVariants({ size }), className)}
        value={clampedValue}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            isIndeterminate
              ? "h-full animate-skeleton"
              : progressFillVariants({ variant }),
          )}
          style={
            isIndeterminate
              ? undefined
              : { transform: `translateX(-${100 - (clampedValue ?? 0)}%)` }
          }
        />
      </ProgressPrimitive.Root>
    </div>
  );
});

Progress.displayName = "Progress";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Progress, progressTrackVariants, progressFillVariants };
