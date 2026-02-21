import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ─────────────────────────────────────────────────────────────── */

const paginationItemVariants = cva(
  "font-mono text-[12px] w-9 h-9 flex items-center justify-center transition-all border",
  {
    variants: {
      active: {
        true: "bg-primary text-primary-foreground border-primary font-bold",
        false:
          "text-muted-foreground border-border hover:border-primary/40 hover:text-foreground",
      },
      disabled: {
        true: "opacity-40 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    defaultVariants: { active: false, disabled: false },
  },
);

/* ── Page range helper ───────────────────────────────────────────────────── */

function getPageRange(
  current: number,
  total: number,
  siblings: number,
): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);
  const pages: (number | "...")[] = [1];
  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

/* ── Component ───────────────────────────────────────────────────────────── */

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      totalPages,
      currentPage,
      onPageChange,
      siblingCount = 1,
      className,
      ...props
    },
    ref,
  ) => {
    const pages = getPageRange(currentPage, totalPages, siblingCount);
    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn(className)}
        {...props}
      >
        <div className="flex items-center gap-1">
          {/* PREV */}
          <button
            type="button"
            onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
            disabled={isPrevDisabled}
            aria-label="Previous page"
            className={cn(
              paginationItemVariants({
                active: false,
                disabled: isPrevDisabled,
              }),
              "font-display uppercase text-[11px] tracking-wider px-2 w-auto",
            )}
          >
            ◆ PREV
          </button>

          {/* Page numbers */}
          {pages.map((page, i) =>
            page === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="w-9 h-9 flex items-center justify-center font-mono text-[12px] text-muted-foreground/40 select-none"
                aria-hidden="true"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={cn(
                  paginationItemVariants({ active: page === currentPage }),
                )}
              >
                {page}
              </button>
            ),
          )}

          {/* NEXT */}
          <button
            type="button"
            onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
            disabled={isNextDisabled}
            aria-label="Next page"
            className={cn(
              paginationItemVariants({
                active: false,
                disabled: isNextDisabled,
              }),
              "font-display uppercase text-[11px] tracking-wider px-2 w-auto",
            )}
          >
            NEXT ◆
          </button>
        </div>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { Pagination, paginationItemVariants };
