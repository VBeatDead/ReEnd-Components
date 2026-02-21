import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ─────────────────────────────────────────────────────────────── */

const alertVariants = cva(
  "relative flex items-start gap-3 p-4 border-l-[3px] transition-all",
  {
    variants: {
      variant: {
        info: "bg-ef-blue/[0.08]    border-l-ef-blue    border    border-ef-blue/20",
        success:
          "bg-ef-green/[0.08]   border-l-ef-green   border    border-ef-green/20",
        warning:
          "bg-ef-orange/[0.08]  border-l-ef-orange  border    border-ef-orange/20",
        error:
          "bg-destructive/[0.08] border-l-destructive border   border-destructive/20",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

/* ── Default icon + icon colors per variant ───────────────────────────────── */

const VARIANT_CONFIG = {
  info: { icon: "◆", color: "text-ef-blue" },
  success: { icon: "✓", color: "text-ef-green" },
  warning: { icon: "⚠", color: "text-ef-orange" },
  error: { icon: "✕", color: "text-destructive" },
} as const;

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

/* ── Component ───────────────────────────────────────────────────────────── */

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      title,
      dismissible = false,
      onDismiss,
      icon,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const cfg = VARIANT_CONFIG[variant];
    const showIcon = icon !== null;
    const iconNode =
      icon !== null && icon !== undefined ? (
        icon
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "font-mono text-[14px] font-bold leading-none",
            cfg.color,
          )}
        >
          {cfg.icon}
        </span>
      );

    return (
      <div
        ref={ref}
        role="alert"
        aria-live={variant === "error" ? "assertive" : "polite"}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {/* Icon */}
        {showIcon && <div className="shrink-0 mt-0.5">{iconNode}</div>}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-display text-[13px] font-bold uppercase tracking-wider text-foreground mb-1">
              {title}
            </p>
          )}
          {children && (
            <div className="text-[13px] text-muted-foreground leading-relaxed">
              {children}
            </div>
          )}
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors font-mono text-[12px] leading-none"
          >
            ✕
          </button>
        )}
      </div>
    );
  },
);
Alert.displayName = "Alert";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Alert, alertVariants };
