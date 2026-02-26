import * as React from "react";
import { cn } from "../../lib/utils";

export type SortDirection = "asc" | "desc" | "none";

export interface SortOption {
  id: string;
  label: string;
}

export interface SortControlProps {
  options: SortOption[];
  activeId?: string;
  direction?: SortDirection;
  onSortChange?: (id: string, direction: SortDirection) => void;
  className?: string;
}

const SortControl = React.forwardRef<HTMLDivElement, SortControlProps>(
  ({ options, activeId, direction = "none", onSortChange, className }, ref) => {
    const handleClick = (id: string) => {
      if (!onSortChange) return;
      if (id === activeId) {
        // cycle: asc -> desc -> none
        if (direction === "asc") onSortChange(id, "desc");
        else if (direction === "desc") onSortChange(id, "none");
        else onSortChange(id, "asc");
      } else {
        onSortChange(id, "asc");
      }
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1 flex-wrap", className)}
      >
        <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground/50 mr-1">
          SORT
        </span>
        {options.map((opt) => {
          const isActive = opt.id === activeId && direction !== "none";
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleClick(opt.id)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center px-3 py-1.5 font-display text-[11px] uppercase tracking-wider transition-all duration-150",
                isActive
                  ? "text-primary border border-primary/40 bg-primary/[0.05]"
                  : "text-muted-foreground hover:text-foreground border border-transparent hover:border-border",
              )}
            >
              {opt.label}
              {isActive && (
                <span
                  className="font-['Orbitron',monospace] text-[9px] ml-1"
                  aria-hidden="true"
                >
                  {direction === "asc" ? "\u25B2" : "\u25BC"}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  },
);
SortControl.displayName = "SortControl";

export { SortControl };
