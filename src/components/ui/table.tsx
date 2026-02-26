import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Table (responsive wrapper) ─────────────────────────────────────────── */

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/* ── TableHeader ─────────────────────────────────────────────────────────── */

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

/* ── TableBody ───────────────────────────────────────────────────────────── */

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/* ── TableFooter ─────────────────────────────────────────────────────────── */

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-border bg-surface-0 font-display text-[11px] uppercase tracking-[0.08em] text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/* ── TableRow ────────────────────────────────────────────────────────────── */

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => (
    <tr
      ref={ref}
      aria-selected={selected || undefined}
      className={cn(
        "border-b border-border/50 transition-colors",
        "hover:bg-primary/[0.03]",
        "even:bg-foreground/[0.015]",
        selected && "bg-primary/[0.06]",
        "data-[state=selected]:bg-primary/[0.06]",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

/* ── TableHead (th) ──────────────────────────────────────────────────────── */

export type SortDirection = "asc" | "desc" | null;

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, onSort, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "font-display text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground",
        "py-3 px-4 text-left border-b border-border bg-surface-0 sticky top-0 z-10",
        sortable &&
          "cursor-pointer select-none hover:text-foreground transition-colors",
        className,
      )}
      onClick={sortable ? onSort : undefined}
      aria-sort={
        sortDirection === "asc"
          ? "ascending"
          : sortDirection === "desc"
            ? "descending"
            : undefined
      }
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortable && (
          <span className="text-[9px] leading-none" aria-hidden="true">
            {sortDirection === "asc" ? (
              <span className="text-primary">&#9650;</span>
            ) : sortDirection === "desc" ? (
              <span className="text-primary">&#9660;</span>
            ) : (
              <span className="text-muted-foreground/50">&#9650;&#9660;</span>
            )}
          </span>
        )}
      </span>
    </th>
  ),
);
TableHead.displayName = "TableHead";

/* ── TableCell (td) ──────────────────────────────────────────────────────── */

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "py-3 px-4 text-foreground border-b border-border/50 align-middle",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/* ── TableCaption ────────────────────────────────────────────────────────── */

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 font-display text-[11px] tracking-[0.08em] uppercase text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

/* ── TableEmpty (empty state slot) ───────────────────────────────────────── */

export interface TableEmptyProps extends React.HTMLAttributes<HTMLTableRowElement> {
  colSpan: number;
}

const TableEmpty = React.forwardRef<HTMLTableRowElement, TableEmptyProps>(
  ({ colSpan, className, children, ...props }, ref) => (
    <tr ref={ref} {...props}>
      <td
        colSpan={colSpan}
        className={cn(
          "py-12 text-center text-muted-foreground font-display text-[11px] uppercase tracking-wider",
          className,
        )}
      >
        {children ?? (
          <span className="flex flex-col items-center gap-2">
            <span className="text-2xl text-muted-foreground/30">&#9671;</span>
            <span>NO DATA AVAILABLE</span>
          </span>
        )}
      </td>
    </tr>
  ),
);
TableEmpty.displayName = "TableEmpty";

/* ── Exports ─────────────────────────────────────────────────────────────── */

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmpty,
};
