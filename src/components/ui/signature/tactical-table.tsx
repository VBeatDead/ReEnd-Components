import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface TacticalTableColumn<T> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  cell?: (row: T, rowIndex: number) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface TacticalTableProps<
  T extends Record<string, unknown>,
> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TacticalTableColumn<T>[];
  data: T[];
  sortKey?: keyof T & string;
  sortDirection?: "asc" | "desc";
  onSort?: (key: keyof T & string) => void;
  selectable?: boolean;
  selectedIndices?: number[];
  onRowClick?: (row: T, index: number) => void;
  loading?: boolean;
  skeletonRows?: number;
  emptyState?: React.ReactNode;
  caption?: string;
}

/* ── Sort indicator ───────────────────────────────────────────────────────── */

function SortIndicator({
  active,
  direction,
}: {
  active: boolean;
  direction?: "asc" | "desc";
}) {
  if (!active)
    return <span className="ml-1 text-muted-foreground/20 text-[10px]">↕</span>;
  return (
    <span className="ml-1 text-primary text-[10px]">
      {direction === "asc" ? "▲" : "▼"}
    </span>
  );
}

/* ── Skeleton row ─────────────────────────────────────────────────────────── */

function SkeletonRow({ colCount }: { colCount: number }) {
  return (
    <tr>
      {Array.from({ length: colCount }).map((_, i) => (
        <td key={i} className="px-4 py-3 border-b border-white/[0.04]">
          <div
            className={cn(
              "h-3 bg-surface-2 animate-skeleton",
              i === 0 ? "w-3/4" : i % 3 === 0 ? "w-1/2" : "w-full",
            )}
          />
        </td>
      ))}
    </tr>
  );
}

/* ── Align map ────────────────────────────────────────────────────────────── */

const ALIGN_CLASS = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/* ── Component ───────────────────────────────────────────────────────────── */

function TacticalTableInner<T extends Record<string, unknown>>(
  {
    className,
    columns,
    data,
    sortKey,
    sortDirection,
    onSort,
    selectable = false,
    selectedIndices,
    onRowClick,
    loading = false,
    skeletonRows = 4,
    emptyState,
    caption,
    ...props
  }: TacticalTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const selectedSet = new Set(selectedIndices ?? []);

  return (
    <div
      ref={ref}
      className={cn("w-full overflow-x-auto", className)}
      {...props}
    >
      <table className="w-full border-collapse" role="grid">
        {caption && <caption className="sr-only">{caption}</caption>}

        {/* Head */}
        <thead>
          <tr>
            {columns.map((col) => {
              const isActiveSort = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 border-b border-white/10 bg-surface-0 sticky top-0 z-10",
                    "font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground",
                    col.width ?? "",
                    ALIGN_CLASS[col.align ?? "left"],
                    col.sortable &&
                      "cursor-pointer select-none hover:text-foreground transition-colors",
                  )}
                  aria-sort={
                    col.sortable && isActiveSort
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  onClick={col.sortable ? () => onSort?.(col.key) : undefined}
                >
                  {col.header}
                  {col.sortable && (
                    <SortIndicator
                      active={isActiveSort}
                      direction={sortDirection}
                    />
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {loading ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <SkeletonRow key={i} colCount={columns.length} />
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center">
                {emptyState ?? (
                  <span className="font-mono text-[12px] text-muted-foreground/40 uppercase tracking-wider">
                    NO DATA
                  </span>
                )}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => {
              const isSelected = selectable && selectedSet.has(rowIdx);
              const isEven = rowIdx % 2 === 1;
              return (
                <tr
                  key={rowIdx}
                  aria-selected={selectable ? isSelected : undefined}
                  tabIndex={selectable ? 0 : undefined}
                  onClick={
                    selectable ? () => onRowClick?.(row, rowIdx) : undefined
                  }
                  onKeyDown={
                    selectable
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onRowClick?.(row, rowIdx);
                          }
                        }
                      : undefined
                  }
                  className={cn(
                    "transition-colors",
                    isSelected
                      ? "bg-primary/[0.06]"
                      : isEven
                        ? "bg-white/[0.015] hover:bg-primary/[0.03]"
                        : "hover:bg-primary/[0.03]",
                    selectable && "cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3 text-[14px] text-foreground border-b border-white/[0.04]",
                        ALIGN_CLASS[col.align ?? "left"],
                      )}
                    >
                      {col.cell
                        ? col.cell(row, rowIdx)
                        : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

const TacticalTable = React.forwardRef(TacticalTableInner) as <
  T extends Record<string, unknown>,
>(
  props: TacticalTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;

(TacticalTable as { displayName?: string }).displayName = "TacticalTable";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export { TacticalTable };
