import * as React from "react";
import { cn } from "../../lib/utils";

export interface ViewToggleProps {
  value?: "grid" | "list";
  defaultValue?: "grid" | "list";
  onChange?: (value: "grid" | "list") => void;
  storageKey?: string;
  className?: string;
}

const ViewToggle = React.forwardRef<HTMLDivElement, ViewToggleProps>(
  (
    {
      value: controlledValue,
      defaultValue = "grid",
      onChange,
      storageKey,
      className,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<"grid" | "list">(
      () => {
        if (storageKey && typeof window !== "undefined") {
          const stored = localStorage.getItem(storageKey);
          if (stored === "grid" || stored === "list") return stored;
        }
        return defaultValue;
      },
    );

    const value = controlledValue ?? internalValue;

    const handleChange = (next: "grid" | "list") => {
      if (!controlledValue) setInternalValue(next);
      if (storageKey && typeof window !== "undefined") localStorage.setItem(storageKey, next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        className={cn("inline-flex border border-border", className)}
        role="group"
        aria-label="View toggle"
      >
        <button
          type="button"
          onClick={() => handleChange("grid")}
          aria-pressed={value === "grid"}
          aria-label="Grid view"
          className={cn(
            "w-9 h-9 flex items-center justify-center transition-colors duration-150",
            value === "grid"
              ? "bg-primary/[0.08] text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-surface-2",
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <rect x="0" y="0" width="6" height="6" fill="currentColor"/>
            <rect x="8" y="0" width="6" height="6" fill="currentColor"/>
            <rect x="0" y="8" width="6" height="6" fill="currentColor"/>
            <rect x="8" y="8" width="6" height="6" fill="currentColor"/>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleChange("list")}
          aria-pressed={value === "list"}
          aria-label="List view"
          className={cn(
            "w-9 h-9 flex items-center justify-center transition-colors duration-150",
            "border-l border-border",
            value === "list"
              ? "bg-primary/[0.08] text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-surface-2",
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <rect x="0" y="2" width="14" height="2" fill="currentColor"/>
            <rect x="0" y="6" width="14" height="2" fill="currentColor"/>
            <rect x="0" y="10" width="14" height="2" fill="currentColor"/>
          </svg>
        </button>
      </div>
    );
  },
);

ViewToggle.displayName = "ViewToggle";

export { ViewToggle };
