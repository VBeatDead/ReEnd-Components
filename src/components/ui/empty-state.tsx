import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Preset variant copy ─────────────────────────────────────────────────── */

const PRESET_COPY: Record<string, { title: string; description: string }> = {
  search: {
    title: "NO RESULTS FOUND",
    description: "Try adjusting your search query.",
  },
  error: {
    title: "FAILED TO LOAD",
    description: "An error occurred. Please try again.",
  },
  permission: {
    title: "ACCESS RESTRICTED",
    description: "You don't have permission to view this.",
  },
  empty: {
    title: "NO ITEMS YET",
    description: "Add your first item to get started.",
  },
  default: { title: "", description: "" },
};

/* ── Variants ─────────────────────────────────────────────────────────────── */

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center py-16 px-8",
  {
    variants: {
      size: {
        sm: "py-8 px-4",
        md: "py-16 px-8",
        lg: "py-24 px-12",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface EmptyStateProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "search" | "error" | "permission" | "empty";
}

/* ── Component ───────────────────────────────────────────────────────────── */

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
      variant = "default",
      size,
      className,
      ...props
    },
    ref,
  ) => {
    const preset = PRESET_COPY[variant] ?? PRESET_COPY.default;
    const resolvedTitle = title ?? preset.title;
    const resolvedDesc = description ?? preset.description;

    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ size }), className)}
        {...props}
      >
        {icon && (
          <div className="text-white/15 mb-6 [&>svg]:w-12 [&>svg]:h-12">
            {icon}
          </div>
        )}

        {resolvedTitle && (
          <h3 className="font-display text-[18px] font-bold uppercase tracking-wider text-foreground mb-3">
            {resolvedTitle}
          </h3>
        )}

        {resolvedDesc && (
          <p className="text-[14px] text-muted-foreground max-w-[360px] leading-relaxed">
            {resolvedDesc}
          </p>
        )}

        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  },
);
EmptyState.displayName = "EmptyState";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { EmptyState, emptyStateVariants };
