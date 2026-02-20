import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ─────────────────────────────────────────────────────────────── */

const numberInputVariants = cva(
  "inline-flex items-center border border-white/[0.12] bg-transparent",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-9",
        lg: "h-10",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "value" | "defaultValue" | "size"
  >,
  VariantProps<typeof numberInputVariants> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
}

/* ── Component ───────────────────────────────────────────────────────────── */

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      size = "md",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<number>(
      defaultValue ?? 0,
    );
    const current = isControlled ? value! : internalValue;

    const clamp = (n: number) =>
      Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n));

    const update = (next: number) => {
      const clamped = clamp(next);
      if (!isControlled) setInternalValue(clamped);
      onChange?.(clamped);
    };

    const decrement = () => update(current - step);
    const increment = () => update(current + step);

    const atMin = min !== undefined && current <= min;
    const atMax = max !== undefined && current >= max;

    const buttonBase =
      "px-2 font-mono text-[13px] text-muted-foreground transition-colors select-none";

    return (
      <div className={cn(numberInputVariants({ size }), className)}>
        {/* Decrement */}
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || atMin}
          aria-label="Decrement"
          className={cn(
            buttonBase,
            "h-full border-r border-white/[0.12]",
            (disabled || atMin) && "opacity-40 cursor-not-allowed",
            !(disabled || atMin) && "hover:text-foreground",
          )}
        >
          −
        </button>

        {/* Input */}
        <input
          ref={ref}
          type="number"
          value={current}
          disabled={disabled}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            if (!isNaN(parsed)) update(parsed);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              increment();
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              decrement();
            }
          }}
          className={cn(
            "w-16 h-full text-center font-mono text-[13px] text-foreground bg-transparent",
            "border-x border-white/[0.12] outline-none",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            disabled && "opacity-40 cursor-not-allowed",
          )}
          {...props}
        />

        {/* Increment */}
        <button
          type="button"
          onClick={increment}
          disabled={disabled || atMax}
          aria-label="Increment"
          className={cn(
            buttonBase,
            "h-full border-l border-white/[0.12]",
            (disabled || atMax) && "opacity-40 cursor-not-allowed",
            !(disabled || atMax) && "hover:text-foreground",
          )}
        >
          +
        </button>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { NumberInput, numberInputVariants };
