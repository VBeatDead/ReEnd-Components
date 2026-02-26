import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/utils";

/* ─── Constants ─────────────────────────────────────────────────────────── */
const DAY_HEADERS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function parseISO(str: string): Date | null {
  if (!str || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
  const [y, m, d] = str.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return isNaN(dt.getTime()) ? null : dt;
}

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDisplay(iso: string): string {
  const d = parseISO(iso);
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

/** Build the 6-row × 7-col grid for a given month view */
function buildGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  // Monday-first: 0=Mon … 6=Sun
  const startOffset = (first.getDay() + 6) % 7;
  const cells: Date[] = [];
  for (let i = -startOffset; i < 42 - startOffset; i++) {
    cells.push(new Date(year, month, 1 + i));
  }
  return cells;
}

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  error?: boolean | string;
  label?: string;
  /** Dates before minDate are disabled */
  minDate?: string;
  /** Dates after maxDate are disabled */
  maxDate?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const sizeMap = {
  sm: "h-8 text-xs px-3",
  md: "h-10 text-sm px-3",
  lg: "h-12 text-base px-4",
};

/* ─── Component ──────────────────────────────────────────────────────────── */
const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "YYYY.MM.DD",
      size = "md",
      error,
      label,
      minDate,
      maxDate,
      disabled,
      className,
      id,
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const triggerId = id ?? generatedId;

    const today = new Date();
    const selectedDate = value ? parseISO(value) : null;

    /* Calendar view state */
    const [viewYear, setViewYear] = React.useState(
      selectedDate?.getFullYear() ?? today.getFullYear(),
    );
    const [viewMonth, setViewMonth] = React.useState(
      selectedDate?.getMonth() ?? today.getMonth(),
    );
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const parsed = value ? parseISO(value) : null;
      if (parsed) {
        setViewYear(parsed.getFullYear());
        setViewMonth(parsed.getMonth());
      }
    }, [value]);

    const grid = buildGrid(viewYear, viewMonth);

    const goToPrevMonth = () => {
      if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
      else setViewMonth((m) => m - 1);
    };

    const goToNextMonth = () => {
      if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
      else setViewMonth((m) => m + 1);
    };

    const goToPrevYear = () => setViewYear((y) => y - 1);
    const goToNextYear = () => setViewYear((y) => y + 1);

    const isDisabledDate = (d: Date): boolean => {
      const iso = toISO(d);
      if (minDate && iso < minDate) return true;
      if (maxDate && iso > maxDate) return true;
      return false;
    };

    const handleSelectDay = (d: Date) => {
      if (isDisabledDate(d)) return;
      onChange?.(toISO(d));
      setOpen(false);
    };

    const handleToday = () => {
      if (isDisabledDate(today)) return;
      onChange?.(toISO(today));
      setOpen(false);
    };

    const handleClear = () => {
      onChange?.("");
    };

    const displayValue = value ? formatDisplay(value) : "";

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={triggerId}
            className="font-display text-[11px] uppercase tracking-wider text-muted-foreground"
          >
            {label}
          </label>
        )}

        <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
          <PopoverPrimitive.Trigger asChild>
            <button
              ref={ref}
              id={triggerId}
              type="button"
              disabled={disabled}
              aria-haspopup="dialog"
              aria-expanded={open}
              className={cn(
                "w-full flex items-center justify-between bg-transparent border border-border",
                "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25",
                "transition-colors duration-150 cursor-pointer",
                sizeMap[size],
                error ? "border-destructive focus:border-destructive focus:ring-destructive/25" : "",
                disabled ? "opacity-38 cursor-not-allowed" : "",
              )}
            >
              <span className={cn(
                "font-['Orbitron',monospace] text-sm tracking-wider",
                displayValue ? "text-foreground" : "text-muted-foreground",
              )}>
                {displayValue || placeholder}
              </span>
              {/* Diamond calendar icon */}
              <span className="text-primary/60 text-xs ml-2" aria-hidden="true">◆</span>
            </button>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={6}
              className={cn(
                "z-[var(--z-dropdown,100)] bg-surface-2 border border-border",
                "shadow-[var(--shadow-lg)] w-80 p-4",
                "animate-fade-in-down",
              )}
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              {/* Month/Year nav */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={goToPrevYear}
                    className="w-7 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors text-xs"
                    aria-label="Previous year"
                  >
                    ◂◂
                  </button>
                  <button
                    type="button"
                    onClick={goToPrevMonth}
                    className="w-7 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Previous month"
                  >
                    ◂
                  </button>
                </div>
                <span className="font-display text-sm font-bold tracking-[0.08em] uppercase text-foreground">
                  {MONTHS[viewMonth]} {viewYear}
                </span>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={goToNextMonth}
                    className="w-7 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Next month"
                  >
                    ▸
                  </button>
                  <button
                    type="button"
                    onClick={goToNextYear}
                    className="w-7 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors text-xs"
                    aria-label="Next year"
                  >
                    ▸▸
                  </button>
                </div>
              </div>

              {/* Day-of-week headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAY_HEADERS.map((h) => (
                  <div
                    key={h}
                    className="font-['Orbitron',monospace] text-[10px] tracking-[0.1em] text-muted-foreground text-center py-1"
                  >
                    {h}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7">
                {grid.map((d, i) => {
                  const inMonth = d.getMonth() === viewMonth;
                  const isSelected = selectedDate ? isSameDay(d, selectedDate) : false;
                  const todayFlag = isToday(d);
                  const disabledFlag = isDisabledDate(d);

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={disabledFlag}
                      onClick={() => handleSelectDay(d)}
                      aria-label={d.toDateString()}
                      aria-pressed={isSelected}
                      className={cn(
                        "w-9 h-9 flex items-center justify-center",
                        "font-['Orbitron',monospace] text-xs transition-all duration-150",
                        "focus:outline-none",
                        /* Base states */
                        inMonth ? "text-foreground/80" : "text-muted-foreground/30",
                        /* Hover (non-selected, non-disabled) */
                        !isSelected && !disabledFlag && "hover:bg-primary/[0.08] hover:text-primary",
                        /* Today border */
                        todayFlag && !isSelected && "border border-primary/40",
                        /* Selected — diamond clip-path */
                        isSelected && [
                          "bg-primary text-primary-foreground font-bold",
                          "[clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]",
                        ],
                        /* Disabled */
                        disabledFlag && "text-muted-foreground/30 cursor-not-allowed",
                      )}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Footer: TODAY / CLEAR */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={handleToday}
                  disabled={isDisabledDate(today)}
                  className="font-display text-[11px] uppercase tracking-wider text-primary hover:text-primary/70 disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
                >
                  [TODAY]
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="font-display text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  [CLEAR]
                </button>
              </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {error && typeof error === "string" && (
          <p className="text-[11px] text-destructive font-mono">{error}</p>
        )}
      </div>
    );
  },
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
