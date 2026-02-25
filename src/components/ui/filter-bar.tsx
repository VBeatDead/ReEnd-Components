import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "../../lib/utils";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

const FilterChip = ({ label, onRemove, className }: FilterChipProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 px-[10px] py-1 text-[12px] font-display text-primary bg-primary/[0.08] border border-primary/20",
      className,
    )}
  >
    {label}
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="opacity-50 hover:opacity-100 transition-opacity leading-none"
      >
        ✕
      </button>
    )}
  </span>
);

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: {
    id: string;
    label: string;
    options: FilterOption[];
  }[];
  activeFilters?: Record<string, string[]>;
  onFilterChange?: (id: string, values: string[]) => void;
  onClearAll?: () => void;
  chips?: { label: string; value: string; filterId: string }[];
  /** Placeholder text for the built-in search input (renders when onSearchChange or searchValue is provided) */
  searchPlaceholder?: string;
  /** Controlled value for the built-in search input */
  searchValue?: string;
  /** Called when the built-in search input value changes */
  onSearchChange?: (value: string) => void;
}

const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      filters,
      activeFilters = {},
      onFilterChange,
      onClearAll,
      chips,
      searchPlaceholder,
      searchValue,
      onSearchChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [openFilter, setOpenFilter] = React.useState<string | null>(null);
    const [dropdownPos, setDropdownPos] = React.useState<{
      x: number;
      y: number;
      width: number;
    } | null>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const hasActive =
      chips && chips.length > 0
        ? true
        : Object.values(activeFilters).some((v) => v.length > 0);

    React.useEffect(() => {
      if (!openFilter) return;
      const handleClose = (e: MouseEvent | Event) => {
        if (
          e instanceof MouseEvent &&
          dropdownRef.current?.contains(e.target as Node)
        )
          return;
        setOpenFilter(null);
        setDropdownPos(null);
      };
      const handleScroll = () => {
        setOpenFilter(null);
        setDropdownPos(null);
      };
      document.addEventListener("mousedown", handleClose);
      document.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);
      return () => {
        document.removeEventListener("mousedown", handleClose);
        document.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleScroll);
      };
    }, [openFilter]);

    const handleFilterToggle = (
      filterId: string,
      e: React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (openFilter === filterId) {
        setOpenFilter(null);
        setDropdownPos(null);
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      const menuHeight = Math.min(
        filters.find((f) => f.id === filterId)!.options.length * 36 + 8,
        240,
      );
      const spaceBelow = window.innerHeight - rect.bottom - 4;
      const y =
        spaceBelow < menuHeight && rect.top > menuHeight
          ? rect.top - menuHeight - 4
          : rect.bottom + 4;
      setDropdownPos({ x: rect.left, y, width: Math.max(rect.width, 160) });
      setOpenFilter(filterId);
    };

    const activeFilterForOpen = openFilter
      ? filters.find((f) => f.id === openFilter)
      : null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-2 p-3 bg-surface-0 border border-border",
          className,
        )}
        {...props}
      >
        {(onSearchChange !== undefined || searchValue !== undefined) && (
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 text-sm select-none"
              aria-hidden="true"
            >
              ◆
            </span>
            <input
              type="search"
              value={searchValue ?? ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder ?? "SEARCH..."}
              className="h-9 pl-8 pr-3 bg-surface-1 border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary font-display tracking-wide uppercase"
            />
          </div>
        )}

        {filters.map((filter) => {
          const isActive =
            activeFilters[filter.id] && activeFilters[filter.id].length > 0;
          return (
            <div key={filter.id} className="relative">
              <button
                type="button"
                onClick={(e) => handleFilterToggle(filter.id, e)}
                aria-haspopup="listbox"
                aria-expanded={openFilter === filter.id}
                className={cn(
                  "px-3 py-1.5 font-display text-[12px] uppercase border border-border transition-colors duration-150",
                  isActive
                    ? "border-primary text-primary bg-primary/[0.06]"
                    : "text-muted-foreground hover:text-foreground hover:border-border-strong",
                  openFilter === filter.id && "border-primary/60",
                )}
              >
                {filter.label}
                {isActive && ` (${activeFilters[filter.id].length})`}
              </button>
            </div>
          );
        })}

        {chips && chips.length > 0 && (
          <>
            <div className="h-4 w-px bg-border" />
            {chips.map((chip) => (
              <FilterChip
                key={`${chip.filterId}-${chip.value}`}
                label={chip.label}
                onRemove={() => {
                  const current = activeFilters[chip.filterId] ?? [];
                  onFilterChange?.(
                    chip.filterId,
                    current.filter((v) => v !== chip.value),
                  );
                }}
              />
            ))}
          </>
        )}

        {hasActive && onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="ml-auto text-[11px] font-mono text-muted-foreground hover:text-destructive transition-colors"
          >
            CLEAR ALL
          </button>
        )}

        {/* Portal dropdown — renders outside any overflow:hidden ancestor */}
        {openFilter && dropdownPos && activeFilterForOpen &&
          ReactDOM.createPortal(
            <div
              ref={dropdownRef}
              role="listbox"
              className="fixed bg-surface-2 border border-border shadow-[0_8px_32px_rgba(0,0,0,0.45)] min-w-[160px] max-h-60 overflow-y-auto animate-fade-in-up"
              style={{
                left: dropdownPos.x,
                top: dropdownPos.y,
                zIndex: 9999,
                minWidth: dropdownPos.width,
              }}
            >
              {activeFilterForOpen.options.map((opt) => {
                const selected = activeFilters[openFilter]?.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      const current = activeFilters[openFilter] ?? [];
                      const next = selected
                        ? current.filter((v) => v !== opt.value)
                        : [...current, opt.value];
                      onFilterChange?.(openFilter, next);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-[12px] font-display hover:bg-surface-3 transition-colors",
                      selected ? "text-primary" : "text-foreground",
                    )}
                  >
                    {selected ? "◆" : "◇"} {opt.label}
                  </button>
                );
              })}
            </div>,
            document.body,
          )}
      </div>
    );
  },
);
FilterBar.displayName = "FilterBar";

export { FilterBar, FilterChip };
