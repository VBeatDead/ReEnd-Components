import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const tacticalBadgeVariants = cva(
  "inline-flex items-center gap-1.5 clip-corner-sm border px-3 py-1 font-display text-[10px] font-bold tracking-[0.15em] uppercase",
  {
    variants: {
      variant: {
        default: "border-primary/40 text-primary bg-primary/10",
        success: "border-ef-green/40 text-ef-green bg-ef-green/10",
        warning: "border-ef-yellow/40 text-ef-yellow bg-ef-yellow/10",
        danger: "border-ef-red/40 text-ef-red bg-ef-red/10",
        info: "border-ef-cyan/40 text-ef-cyan bg-ef-cyan/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface TacticalBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tacticalBadgeVariants> {}

export const TacticalBadge = React.forwardRef<
  HTMLSpanElement,
  TacticalBadgeProps
>(({ variant, className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(tacticalBadgeVariants({ variant }), className)}
    {...props}
  >
    <span style={{ fontSize: "6px" }}>◆</span>
    {children}
  </span>
));
TacticalBadge.displayName = "TacticalBadge";
