import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "border-border text-muted-foreground bg-surface-2",
        primary: "border-primary/40 text-primary bg-primary/10",
        info: "border-ef-blue/40 text-ef-blue bg-ef-blue/10",
        success: "border-ef-green/40 text-ef-green bg-ef-green/10",
        warning: "border-ef-orange/40 text-ef-orange bg-ef-orange/10",
        danger: "border-destructive/40 text-destructive bg-destructive/10",
        purple: "border-ef-purple/40 text-ef-purple bg-ef-purple/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Displays a × remove button at the end of the badge.
   * Use together with `onRemove` to handle removal.
   */
  removable?: boolean;
  /**
   * Called when the × remove button is clicked.
   * Only fires when `removable` is true.
   */
  onRemove?: () => void;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, removable, onRemove, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), removable && "pr-1", className)}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 inline-flex items-center justify-center leading-none opacity-50 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
          aria-label="Remove"
          tabIndex={0}
        >
          ×
        </button>
      )}
    </span>
  ),
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
