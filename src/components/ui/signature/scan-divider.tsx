import * as React from "react";

export interface ScanDividerProps {
  label?: string;
  className?: string;
}

export const ScanDivider = React.forwardRef<HTMLDivElement, ScanDividerProps>(
  ({ label, className }, ref) => (
    <div
      ref={ref}
      className={`relative flex items-center gap-4 py-2${className ? ` ${className}` : ""}`}
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      {label && (
        <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase text-primary/60 flex items-center gap-2">
          <span style={{ fontSize: "6px" }}>◆</span> {label}{" "}
          <span style={{ fontSize: "6px" }}>◆</span>
        </span>
      )}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  ),
);
ScanDivider.displayName = "ScanDivider";
