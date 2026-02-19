import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ── Wrapper variants ──────────────────────────────────────────────────────────
const inputWrapperVariants = cva(
  "relative flex items-center border transition-all duration-150 bg-surface-1",
  {
    variants: {
      state: {
        default: [
          "border-white/[0.12]",
          "hover:border-white/20",
          "focus-within:border-primary",
          "focus-within:shadow-[0_0_0_3px_rgba(255,212,41,0.1)]",
        ].join(" "),
        error: [
          "border-ef-red",
          "focus-within:shadow-[0_0_0_3px_rgba(255,71,87,0.1)]",
        ].join(" "),
        success: "border-ef-green",
      },
      size: {
        sm: "h-8",
        md: "h-11",
        lg: "h-[52px]",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  },
);

// ── InputProps ────────────────────────────────────────────────────────────────
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  state?: "default" | "error" | "success";
  size?: "sm" | "md" | "lg";
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

// ── Input ──────────────────────────────────────────────────────────────────────

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      state = "default",
      size = "md",
      leftElement,
      rightElement,
      disabled,
      ...props
    },
    ref,
  ) => {
    const pl = leftElement ? "pl-2" : size === "sm" ? "pl-2" : "pl-3";
    const pr = rightElement ? "pr-2" : size === "sm" ? "pr-2" : "pr-3";

    return (
      <div
        className={cn(
          inputWrapperVariants({ state, size }),
          disabled &&
            "opacity-40 cursor-not-allowed pointer-events-none bg-background",
          className,
        )}
      >
        {leftElement && (
          <span className="pl-3 flex-shrink-0 text-muted-foreground flex items-center">
            {leftElement}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "h-full flex-1 min-w-0 bg-transparent text-foreground text-sm font-mono",
            "placeholder:text-muted-foreground focus:outline-none",
            pl,
            pr,
          )}
          {...props}
        />
        {rightElement && (
          <span className="pr-3 flex-shrink-0 text-muted-foreground flex items-center">
            {rightElement}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

// ── Label ─────────────────────────────────────────────────────────────────────

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "font-display text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";

// ── HelperText ────────────────────────────────────────────────────────────────

export interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  state?: "default" | "error" | "success";
}

const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ className, state = "default", ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-[12px] leading-tight",
        state === "error" && "text-destructive",
        state === "success" && "text-ef-green",
        state === "default" && "text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
HelperText.displayName = "HelperText";

// ── Exports ───────────────────────────────────────────────────────────────────

export { Input, inputWrapperVariants, Label, HelperText };
