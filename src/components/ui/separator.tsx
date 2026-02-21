import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/* ── Variants ────────────────────────────────────────────────────────────── */

const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-border",
      subtle: "bg-border",
      strong: "bg-border-strong",
      glow: "bg-gradient-to-r from-transparent via-primary/40 to-transparent",
      accent: "bg-primary/30",
    },
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
});

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface SeparatorProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
      "orientation"
    >,
    VariantProps<typeof separatorVariants> {}

/* ── Component ───────────────────────────────────────────────────────────── */

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", variant, decorative = true, ...props }, ref) => {
  const resolvedOrientation = orientation ?? "horizontal";
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={resolvedOrientation}
      className={cn(
        separatorVariants({ variant, orientation: resolvedOrientation }),
        className,
      )}
      {...props}
    />
  );
});
Separator.displayName = "Separator";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Separator, separatorVariants };
