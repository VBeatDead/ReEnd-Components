import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ── Textarea variants ─────────────────────────────────────────────────────────

const textareaVariants = cva(
  [
    "w-full resize-y border bg-surface-1 text-foreground",
    "placeholder:text-muted-foreground font-mono text-sm",
    "transition-all duration-150 focus:outline-none",
    "min-h-[120px] px-3 py-2.5",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-background disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      state: {
        default: [
          "border-input",
          "hover:border-border-strong",
          "focus:border-primary",
          "focus:shadow-[0_0_0_3px_rgba(255,212,41,0.1)]",
        ].join(" "),
        error: [
          "border-ef-red",
          "focus:shadow-[0_0_0_3px_rgba(255,71,87,0.1)]",
        ].join(" "),
        success: "border-ef-green",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

// ── TextareaProps ─────────────────────────────────────────────────────────────

export interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  state?: "default" | "error" | "success";
  showCount?: boolean;
}

// ── Textarea ──────────────────────────────────────────────────────────────────

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, state = "default", showCount, maxLength, onChange, ...rest },
    ref,
  ) => {
    const [count, setCount] = React.useState(() => {
      const initial = rest.value ?? rest.defaultValue ?? "";
      return String(initial).length;
    });

    React.useEffect(() => {
      if (rest.value !== undefined) {
        setCount(String(rest.value).length);
      }
    }, [rest.value]);

    const counterColorClass = (): string => {
      if (maxLength !== undefined && count > maxLength)
        return "text-destructive";
      if (maxLength !== undefined && count / maxLength >= 0.8)
        return "text-ef-orange";
      return "text-muted-foreground";
    };

    return (
      <div className="relative">
        <textarea
          ref={ref}
          maxLength={maxLength}
          onChange={(e) => {
            setCount(e.target.value.length);
            onChange?.(e);
          }}
          className={cn(
            textareaVariants({ state }),
            showCount && "pb-7",
            className,
          )}
          {...rest}
        />
        {showCount && (
          <span
            className={cn(
              "absolute bottom-2 right-3 font-mono text-[11px] pointer-events-none select-none",
              counterColorClass(),
            )}
          >
            {maxLength !== undefined ? `${count}/${maxLength}` : count}
          </span>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

// ── Exports ───────────────────────────────────────────────────────────────────
export { Textarea, textareaVariants };
