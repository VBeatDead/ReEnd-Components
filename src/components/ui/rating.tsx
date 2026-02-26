import * as React from "react";
import { cn } from "../../lib/utils";

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-sm gap-0.5",
  md: "text-base gap-1",
  lg: "text-xl gap-1.5",
};

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      onChange,
      readOnly,
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [hovered, setHovered] = React.useState<number | null>(null);

    const value = controlledValue ?? internalValue;
    const display = hovered ?? value;

    const handleSelect = (v: number) => {
      if (readOnly) return;
      if (!controlledValue) setInternalValue(v);
      onChange?.(v);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly) return;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(value + 1, max);
        if (!controlledValue) setInternalValue(next);
        onChange?.(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.max(value - 1, 0);
        if (!controlledValue) setInternalValue(next);
        onChange?.(next);
      } else if (e.key === "Home") {
        e.preventDefault();
        if (!controlledValue) setInternalValue(0);
        onChange?.(0);
      } else if (e.key === "End") {
        e.preventDefault();
        if (!controlledValue) setInternalValue(max);
        onChange?.(max);
      }
    };

    return (
      <div
        ref={ref}
        role={readOnly ? "img" : "slider"}
        aria-label={`Rating: ${value} out of ${max}`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        tabIndex={readOnly ? undefined : 0}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "inline-flex items-center",
          !readOnly && "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/25",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const filled = starValue <= display;
          return (
            <span
              key={i}
              onClick={() => handleSelect(starValue)}
              onMouseEnter={() => !readOnly && setHovered(starValue)}
              className={cn(
                "w-5 h-5 flex items-center justify-center leading-none transition-colors duration-100 select-none",
                filled ? "text-primary" : "text-muted-foreground/25",
                !readOnly && "cursor-pointer hover:text-primary/70",
              )}
              aria-hidden="true"
            >
              {filled ? "◆" : "◇"}
            </span>
          );
        })}
      </div>
    );
  },
);
Rating.displayName = "Rating";

export { Rating };
